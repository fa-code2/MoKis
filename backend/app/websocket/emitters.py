"""Component layer tracking localized socket data pushes across UI components."""
from flask_socketio import emit # type: ignore

def broadcast_live_telemetry(telemetry_map: dict) -> None:
    """Emits high-frequency JSON structures out over live interface pipes."""
    emit("sensor_update", {
        "soil_moisture": telemetry_map["soil_moisture"],
        "temperature": telemetry_map["temperature"],
        "timestamp": telemetry_map["timestamp"].isoformat() if hasattr(telemetry_map["timestamp"], "isoformat") else str(telemetry_map["timestamp"])
    }, namespace="/", broadcast=True)

def broadcast_critical_alert(alert_code: str, summary: str) -> None:
    """Pushes priority alerts directly into UI toast containers, bypassing storage lag."""
    emit("alert", {
        "code": alert_code,
        "message": summary,
        "severity": "CRITICAL"
    }, namespace="/", broadcast=True)
