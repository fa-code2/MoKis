"""SQLAlchemy Declarative Model schemas utilizing strict Type Annotations."""
import uuid
from datetime import datetime
from typing import Optional, List
from sqlalchemy import String, Float, Boolean, DateTime, ForeignKey, Text, Index
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class SensorData(Base):
    """Tracks raw aggregated high frequency telemetry layers on the edge node."""
    __tablename__ = "sensor_data"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    soil_moisture: Mapped[float] = mapped_column(Float, nullable=False)
    temperature: Mapped[float] = mapped_column(Float, nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    __table_args__ = (Index("ix_sensor_data_timestamp", "timestamp"),)

class AutomationRule(Base):
    """Tracks dynamic automation policies manageable via client interfaces."""
    __tablename__ = "automation_rules"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    sensor_target: Mapped[str] = mapped_column(String(50), nullable=False)
    operator: Mapped[str] = mapped_column(String(10), nullable=False)
    threshold_value: Mapped[float] = mapped_column(Float, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)
    
    logs: Mapped[List["AutomationLog"]] = relationship(back_populates="rule", cascade="all, delete-orphan")

class AutomationLog(Base):
    """Tracks structural audit execution histories driven by automation tasks."""
    __tablename__ = "automation_logs"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    rule_id: Mapped[Optional[str]] = mapped_column(ForeignKey("automation_rules.id", ondelete="SET NULL"))
    action_triggered: Mapped[str] = mapped_column(String(100), nullable=False)
    execution_status: Mapped[str] = mapped_column(String(20), nullable=False)
    details: Mapped[Optional[str]] = mapped_column(Text)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    rule: Mapped[Optional["AutomationRule"]] = relationship(back_populates="logs")
    __table_args__ = (Index("ix_automation_log_timestamp", "timestamp"),)

class CameraDetection(Base):
    """Tracks offline localized computer vision outputs and anomaly frames."""
    __tablename__ = "camera_detections"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    frame_path: Mapped[str] = mapped_column(String(500), nullable=False)
    disease_detected: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    detection_label: Mapped[Optional[str]] = mapped_column(String(100))
    confidence_score: Mapped[float] = mapped_column(Float, default=0.0, nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    __table_args__ = (Index("ix_camera_detections_timestamp", "timestamp"),)

class AIRecommendation(Base):
    """Stores analytical output models calculated locally by forecasting threads."""
    __tablename__ = "ai_recommendations"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    insight_type: Mapped[str] = mapped_column(String(50), nullable=False)
    recommendation_text: Mapped[str] = mapped_column(Text, nullable=False)
    predicted_metrics: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False)

    __table_args__ = (Index("ix_ai_recommendations_created_at", "created_at"),)
