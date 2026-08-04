"""Unified Root Application Gateway bootstrapping MoKis Operating System edge services."""
import os
import sys
from app.core.config import settings
from app import create_app
from app.hardware.serial_manager import ResilientSerialManager
from app.hardware.camera_manager import LocalCameraManager
from app.automation.engine import AutomationEngine
from app.services.telemetry_service import TelemetryPipelineService
from app.websocket.emitters import broadcast_live_telemetry
from app.core.config import Settings

# Instantiating the clean multi-layered framework pipeline context configurations
app, socket_io_server = create_app(settings)

# Instantiate Domain Automation Controllers and low level Drivers
serial_driver = Settings()
automation_orchestrator = AutomationEngine(serial_driver)

# Bind downstream callback pipelines routing metrics straight to target data paths
telemetry_service = TelemetryPipelineService(
    automation_engine=automation_orchestrator,
    websocket_emitter=broadcast_live_telemetry
)

serial_driver.telemetry_callback = telemetry_service.commit_and_broadcast_telemetry
camera_driver = LocalCameraManager(settings.CAMERA_INDEX)

if __name__ == "__main__":
    # Ensure instances framework base paths exist on physical disk targets safely
    os.makedirs("instance", exist_ok=True)
    
    # Initialize background system hardware processing loops
    serial_driver.start_monitoring_loop()
    camera_driver.start_capture_thread()
    
    try:
        # Boot up localized production ready network interface pipelines
        socket_io_server.run(app, host="127.0.0.1", port=5000, debug=False, use_reloader=False)
    finally:
        # Guarantee system resource safety locks are unlinked on platform crash conditions
        serial_driver.terminate()
        camera_driver.terminate()
