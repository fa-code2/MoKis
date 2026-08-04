"""Central Blueprints processing directory mounting routing nodes securely."""
from flask import Flask
from app.api.v1.dashboard import dashboard_blueprint
from app.api.v1.actuators import actuators_blueprint

def register_blueprints(app: Flask) -> None:
    """Registers architectural modules cleanly using isolated URL paths."""
    app.register_blueprint(dashboard_blueprint, url_prefix="/api/v1")
    app.register_blueprint(actuators_blueprint, url_prefix="/api/v1")
