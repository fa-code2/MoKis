"""Core Automation State Machine orchestrating operational loops and actuators."""
import logging
from app.automation.rules import SystemEvaluationContext, AutomatedRuleEvaluator
from app.database.models import AutomationRule, AutomationLog
from app.database.session import db_session

class AutomationEngine:
    """Analyzes telemetry streams, queries rule tables, and triggers actuators."""
    def __init__(self, serial_service):
        self.serial_service = serial_service

    def evaluate_telemetry_state(self, telemetry_data: dict) -> None:
        """Processes changing metric profiles to enforce autonomous stability controls."""
        ctx = SystemEvaluationContext(telemetry_data)
        
        # Load configurable thresholds from local DB instance mapping target parameters
        active_rules = db_session.query(AutomationRule).filter(AutomationRule.is_active == True).all()
        
        for rule in active_rules:
            evaluator = AutomatedRuleEvaluator(rule.sensor_target, rule.operator, rule.threshold_value)
            if evaluator.is_triggered(ctx):
                self._execute_remediation_workflow(rule)

    def _execute_remediation_workflow(self, rule: AutomationRule) -> None:
        """Translates logic failures into active downstream serial operations and writes audit rails."""
        action_map = {
            "soil_moisture": ("PUMP", "ON"),
            "temperature": ("LED", "OFF")
        }
        
        action = action_map.get(rule.sensor_target, ("ALERT", "LOG"))
        device, state = action[0], action[1]
        
        logging.warning(f"Automation Threshold breached: Triggering policy '{rule.name}' targeting device '{device}'.")
        
        # Dispatch command payload onto active virtual loops
        success = self.serial_service.write_command(device, state)
        status_label = "SUCCESS" if success else "FAILED"
        
        log_entry = AutomationLog(
            rule_id=rule.id,
            action_triggered=f"{device}_{state}",
            execution_status=status_label,
            details=f"Autonomous adjustment executed following tracking rule match trigger constraints via value threshold {rule.threshold_value}."
        )
        db_session.add(log_entry)
        db_session.commit()
