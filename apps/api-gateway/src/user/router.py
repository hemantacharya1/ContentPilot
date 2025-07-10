from fastapi import APIRouter, Request
from src.utils.decorators import public_route, protected_route
from . import schemas

router = APIRouter(prefix="/user", tags=["user"])


@router.get("/me", response_model=schemas.UserProfile)
@protected_route
async def get_my_profile(request: Request):
    user = request.state.user.user
    return schemas.UserProfile(id=user.id, email=user.email)


@router.get("/public")
@public_route
async def get_public_info():
    return {"message": "This information is available to everyone."}
