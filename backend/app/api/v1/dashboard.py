"""REST Resource Controller routing consolidated state summaries onto single page views."""
from flask import Blueprint, jsonify
from app.repositories.sensor_repository import SensorRepository

dashboard_blueprint = Blueprint("dashboard", __name__)
sensor_repo = SensorRepository()

@dashboard_blueprint.route("/dashboard", methods=["GET"])
def get_unified_dashboard_payload():
    """Compiles hardware status, telemetry, and system evaluations into an atomic payload."""
    latest_frame = sensor_repo.get_latest_frame()
    
    if not latest_frame:
        return jsonify({
            "system_status": "INITIALIZING",
            "hardware_connected": True,
            "live_telemetry": None
        }), 200

    return jsonify({
        "system_status": "OPERATIONAL",
        "hardware_connected": True,
        "live_telemetry": {
            "soil_moisture": {"value": latest_frame.soil_moisture, "unit": "%", "status": "NORMAL"},
            "temperature": {"value": latest_frame.temperature, "unit": "degC", "status": "NORMAL"}
        }
    }), 200
