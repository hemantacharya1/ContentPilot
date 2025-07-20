from fastapi import APIRouter, HTTPException, status, Depends
from supabase import Client
from src.utils.config import settings
from . import schemas

router = APIRouter(prefix="/auth", tags=["Authentication"])


def get_supabase_client() -> Client:
    return Client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(
    user_credentials: schemas.UserCreate,
    supabase: Client = Depends(get_supabase_client),
):
    try:
        res = supabase.auth.sign_up(
            {"email": user_credentials.email, "password": user_credentials.password}
        )
        return {
            "message": "Signup successful. Please check your email for verification"
        }
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.post("/login", response_model=schemas.Token)
async def login(
    user_credentials: schemas.UserLogin,
    supabase: Client = Depends(get_supabase_client),
):
    try:
        res = supabase.auth.sign_in_with_password(
            {"email": user_credentials.email, "password": user_credentials.password}
        )
        return schemas.Token(access_token=res.session.access_token)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(
    request_data: schemas.PasswordResetRequest,
    supabase: Client = Depends(get_supabase_client),
):
    try:
        supabase.auth.reset_password_for_email(email=request_data.email)
    except Exception as e:
        print(f"Password reset failed: {e}")
    return {
        "message": "If an account with this email exists, a password reset link has been sent."
    }
