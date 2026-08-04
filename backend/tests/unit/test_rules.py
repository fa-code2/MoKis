"""Unit validation targeting boundary execution states within rule arrays."""
from app.automation.rules import SystemEvaluationContext, AutomatedRuleEvaluator

def test_evaluator_triggers_correctly_on_boundary_breach():
    """Verifies that the logic triggers actions only when thresholds are explicitly broken."""
    ctx = SystemEvaluationContext({"soil_moisture": 34.2})
    evaluator = AutomatedRuleEvaluator("soil_moisture", "LT", 40.0)
    assert evaluator.is_triggered(ctx) is True

def test_evaluator_drops_on_safe_conditions():
    ctx = SystemEvaluationContext({"soil_moisture": 55.0})
    evaluator = AutomatedRuleEvaluator("soil_moisture", "LT", 40.0)
    assert evaluator.is_triggered(ctx) is False
