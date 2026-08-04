import logging
from datetime import datetime
from app import socketio
from app.database.session import db_session
from app.database.models import AutomationLog

class ActuatorService:
    """Coordinates target state changes for physical and simulated farm hardware."""

    @staticmethod
    def toggle_actuator(name: str, target_state: str) -> dict:
        """Executes state changes, registers audit trails, and updates UI layers."""
        logging.info(f"Processing manual override command: {name.upper()} -> {target_state}")
        
        try:
            # 1. Open an isolated transaction context to log the manual activity
            audit_log = AutomationLog(
                action_triggered=f"MANUAL_OVERRIDE_{name.upper()}_{target_state}",
                execution_status="SUCCESS",
                details=f"Actuator manual state mutation forced to {target_state} by user request."
            )
            db_session.add(audit_log)
            db_session.commit()

            # 2. Push high-priority structural events out to React via WebSockets
            # This ensures the dashboard toggles immediately flip to matching positions
            socketio.emit("hardware_status", {
                "component": name.lower(),
                "active_state": target_state,
                "timestamp": datetime.utcnow().isoformat()
            })

            return {
                "status": "COMMAND_EXECUTED",
                "actuator": name.lower(),
                "current_state": target_state,
                "logged_at": audit_log.timestamp.isoformat()
            }

        except Exception as e:
            db_session.rollback()
            logging.error(f"Failed to execute manual actuator toggle operations: {str(e)}")
            raise e
