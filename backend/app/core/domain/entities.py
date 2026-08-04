"""Pure Domain Entities decoupled completely from database structures and ORMs."""
from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass(frozen=True)
class TelemetryFrame:
    """Immutable business domain representation of real-time farm sensor metrics."""
    soil_moisture: float
    temperature: float
    timestamp: datetime

@dataclass
class ActiveAutomationRule:
    """Domain model tracking active automation triggers inside evaluation queues."""
    rule_id: str
    name: str
    sensor_target: str
    operator: str
    threshold_value: float
    is_active: bool
