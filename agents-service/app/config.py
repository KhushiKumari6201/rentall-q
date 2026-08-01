import os
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "RentAll-Q AI Agents Microservice"
    VERSION: str = "1.0.0"
    PORT: int = int(os.getenv("PORT", 8000))
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")


settings = Settings()
