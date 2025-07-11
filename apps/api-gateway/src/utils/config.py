from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Optional


class Setting(BaseSettings):
    APP_NAME: str = "ContentPilot API"
    SUPABASE_URL: Optional[str] = None
    SUPABASE_KEY: Optional[str] = None
    
    # CORS Settings
    CORS_ORIGINS: str = "http://localhost:8081,http://localhost:8082"  # Default development origins
    CORS_HEADERS: str = "Authorization,Content-Type,Accept"
    CORS_METHODS: str = "GET,POST,PUT,DELETE,OPTIONS"
    
    @property
    def cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    @property
    def cors_headers(self) -> List[str]:
        return [header.strip() for header in self.CORS_HEADERS.split(",")]
    
    @property
    def cors_methods(self) -> List[str]:
        return [method.strip() for method in self.CORS_METHODS.split(",")]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


settings = Setting()
