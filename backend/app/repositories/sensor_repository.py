"""Optimized transactional data queries mapping physical telemetry records."""
from typing import List
from app.repositories.base_repository import BaseRepository
from app.database.models import SensorData
from app.database.session import db_session

class SensorRepository(BaseRepository[SensorData]):
    """Aggregates high performance query metrics over indexed time-series logs."""
    def __init__(self):
        super().__init__(SensorData)

    def get_latest_frame(self) -> SensorData | None:
        """Returns the most recent single telemetry entry safely."""
        return db_session.query(SensorData).order_by(SensorData.timestamp.desc()).first()

    def get_historical_window(self, limit: int = 100) -> List[SensorData]:
        """Extracts bounded time segments sequentially ordered to draw UI charts."""
        return db_session.query(SensorData).order_by(SensorData.timestamp.desc()).limit(limit).all()
