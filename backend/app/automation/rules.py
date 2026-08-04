"""Composite Rule Design Pattern framework engine mapping business constraints."""
from typing import Dict, Any

class SystemEvaluationContext:
    """Caches in-memory telemetry variables to avoid downstream database thrashing."""
    def __init__(self, state: Dict[str, Any]):
        self._state = state

    def extract_metric(self, target: str) -> float:
        if target not in self._state:
            raise KeyError(f"Target variable tracking descriptor '{target}' absent from core memory context matrix.")
        return float(self._state[target])

class AutomatedRuleEvaluator:
    """Executes atomic verification logic against loaded telemetry maps."""
    def __init__(self, target_metric: str, operator: str, threshold: float):
        self.target_metric = target_metric
        self.operator = operator
        self.threshold = threshold

    def is_triggered(self, ctx: SystemEvaluationContext) -> bool:
        """Computes true boolean vectors when active constraints are explicitly breached."""
        try:
            current_value = ctx.extract_metric(self.target_metric)
        except KeyError:
            return False

        if self.operator == "LT": return current_value < self.threshold
        if self.operator == "GT": return current_value > self.threshold
        if self.operator == "EQ": return current_value == self.threshold
        return False
