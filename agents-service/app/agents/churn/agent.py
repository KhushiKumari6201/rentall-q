from typing import Dict, Any
from app.agents.base import BaseAgent
from app.agents.churn.schema import ChurnInput, ChurnOutput


class ChurnPredictionAgent(BaseAgent):
    """Predicts customer churn risk using ML scoring algorithms / LLM reasoning."""

    def __init__(self):
        super().__init__(
            name="churn",
            description="Predicts customer churn probability and recommends retention actions"
        )

    def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        parsed = ChurnInput(**input_data)

        # Mock ML Model inference calculation based on inactivity & cancellation history
        days = parsed.days_since_last_booking
        cancellations = parsed.cancellations_count

        churn_score = min(1.0, (days * 0.01) + (cancellations * 0.25))
        
        if churn_score >= 0.7:
            risk = "HIGH"
            action = "Dispatch 20% discount email campaign & high-priority support outreach"
        elif churn_score >= 0.35:
            risk = "MEDIUM"
            action = "Send personalized recommendations and loyalty bonus"
        else:
            risk = "LOW"
            action = "Maintain standard retention nurture sequence"

        output = ChurnOutput(
            agent_name=self.name,
            customer_id=parsed.customer_id,
            churn_probability=round(churn_score, 2),
            risk_level=risk,
            recommended_action=action
        )
        return output.model_dump()
