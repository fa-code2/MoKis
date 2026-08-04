"""REST resource handler managing manual control overrides for farm hardware."""
from flask import Blueprint, jsonify, request
from app.core.config import settings

actuators_blueprint = Blueprint("actuators", __name__)

@actuators_blueprint.route("/pump/on", methods=["POST"])
def activate_pump_relay():
    """Forces the water pump circuit closed to trigger manual irrigation."""
    # Production injection would link back directly to application execution instances
    return jsonify({
        "status": "COMMAND_DISPATCHED",
        "actuator": "water_pump",
        "target_state": "ON"
    }), 202

@actuators_blueprint.route("/led/off", methods=["POST"])
def deactivate_grow_lights():
    """Forces open the LED grow light relay to manually cut power."""
    return jsonify({
        "status": "COMMAND_DISPATCHED",
        "actuator": "led_lights",
        "target_state": "OFF"
    }), 202
