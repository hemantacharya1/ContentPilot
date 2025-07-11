from fastapi import FastAPI
from supabase import create_client
from .utils.config import settings
from .middleware.auth_middleware import AuthMiddleware
from .user.router import router as user_router
from .auth.router import router as auth_router

app = FastAPI(title=settings.APP_NAME)
supabase_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

app.add_middleware(AuthMiddleware, supabase_client=supabase_client)


app.include_router(user_router, prefix="/api/v1")
app.include_router(auth_router, prefix="/api/v1")


@app.get("/")
def health_check():
    return {"status": "ok", "app_name": settings.APP_NAME}
