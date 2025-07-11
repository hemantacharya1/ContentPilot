from fastapi import Request
from fastapi.security.utils import get_authorization_scheme_param
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.types import ASGIApp
from supabase import Client


class AuthMiddleware(BaseHTTPMiddleware):
    def __init__(self, app: ASGIApp, supabase_client: Client):
        super().__init__(app)
        self.supabase = supabase_client

    async def dispatch(self, request: Request, call_next):
        authorization = request.headers.get("Authorization")
        scheme, token = get_authorization_scheme_param(authorization)

        if not authorization or scheme.lower() != "bearer":
            request.state.user = None
        else:
            try:
                user = self.supabase.auth.get_user(token)
                request.state.user = user
            except Exception:
                request.state.user = None

        response = await call_next(request)
        return response
