from functools import wraps
from fastapi import Request, HTTPException, status


def protected_route(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        request: Request = kwargs.get("request")
        if (
            not request
            or not hasattr(request.state, "user")
            or request.state.user is None
        ):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
            )
        return await func(*args, **kwargs)

    return wrapper


def public_route(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        return await func(*args, **kwargs)

    return wrapper
