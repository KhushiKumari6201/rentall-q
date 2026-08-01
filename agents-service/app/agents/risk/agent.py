from typing import Dict, Any
from app.agents.base import BaseAgent


class PaymentRiskAgent(BaseAgent):
    """Detects payment fraud and credit risk."""

    def __init__(self):
        super().__init__(
            name="risk",
            description="Payment fraud and credit risk detector"
        )

    def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        amount = input_data.get("amount", 500.0)
        is_risk = amount > 3000.0

        return {
            "agent_name": self.name,
            "risk_score": 0.85 if is_risk else 0.05,
            "risk_level": "HIGH" if is_risk else "SAFE",
            "action": "Require ID verification" if is_risk else "Approve payment"
        }
