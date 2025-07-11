from fastapi import FastAPI
from supabase import create_client
from fastapi.middleware.cors import CORSMiddleware
from .utils.config import settings
from .middleware.auth_middleware import AuthMiddleware
from .user.router import router as user_router
from .auth.router import router as auth_router

app = FastAPI(title=settings.APP_NAME)
supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# Add CORS middleware with settings from config
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=settings.cors_methods,
    allow_headers=settings.cors_headers,
    expose_headers=["*"],  # Allows frontend to read custom headers
    max_age=3600,  # Cache preflight requests for 1 hour
)

app.add_middleware(AuthMiddleware, supabase_client=supabase_client)

app.include_router(user_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")


@app.get("/")
def health_check():
    return {"status": "ok", "app_name": settings.APP_NAME}
