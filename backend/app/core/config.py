"""Central Environment Variable and Settings Framework Engine."""
import os
from typing import Literal

class Settings:
    """Type-safe production configuration properties parsing local environmental variables."""
    SECRET_KEY: str = os.getenv("SECRET_KEY", "prod_fallback_secret_key_hash_vector_9982")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///instance/mokis_local.db")
    SERIAL_PORT: str = os.getenv("SERIAL_PORT", "/dev/ttyUSB0")
    SERIAL_BAUD: int = int(os.getenv("SERIAL_BAUD", "115200"))
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    CAMERA_INDEX: int = int(os.getenv("CAMERA_INDEX", "0"))
    MODEL_VISION_PATH: str = os.getenv("MODEL_VISION_PATH", "app/ai/models/yolov8_vertical.onnx")
    MODEL_FORECAST_PATH: str = os.getenv("MODEL_FORECAST_PATH", "app/ai/models/timeseries_lstm.onnx")

settings = Settings()
