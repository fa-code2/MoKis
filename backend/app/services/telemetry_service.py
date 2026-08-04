"""Transactional Orchestrator coordination engine managing incoming telemetry streams."""
from datetime import datetime
from app.database.models import SensorData
from app.database.session import db_session
from app.automation.engine import AutomationEngine

class TelemetryPipelineService:
    """Validates metrics data structures, saves data records to disk, and alerts automation sub-layers."""
    def __init__(self, automation_engine: AutomationEngine, websocket_emitter=None):
        self.automation_engine = automation_engine
        self.websocket_emitter = websocket_emitter

    def commit_and_broadcast_telemetry(self, packet_payload: dict) -> None:
        """Locks transactional boundaries to persist data files and update live user interface streams."""
        new_record = SensorData(
            soil_moisture=packet_payload["soil_moisture"],
            temperature=packet_payload["temperature"],
            timestamp=packet_payload.get("timestamp", datetime.utcnow())
        )
        
        db_session.add(new_record)
        db_session.commit()
        
        # Forward processed matrix layers into memory contexts tracking active rule loops
        self.automation_engine.evaluate_telemetry_state(packet_payload)
        
        # Non-blocking async event broadcast pushing down to active WebSocket streams
        if self.websocket_emitter:
            self.websocket_emitter(packet_payload)
