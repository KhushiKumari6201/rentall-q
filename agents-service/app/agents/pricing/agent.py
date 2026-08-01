from typing import Dict, Any
from app.agents.base import BaseAgent


class DynamicPricingAgent(BaseAgent):
    """Recommends daily rates based on seasonal demand & market trends."""

    def __init__(self):
        super().__init__(
            name="pricing",
            description="Dynamic pricing optimization model"
        )

    def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        base_rate = input_data.get("base_rate", 100.0)
        demand = input_data.get("demand_level", "HIGH")

        multiplier = 1.20 if demand == "HIGH" else 0.90
        recommended = round(base_rate * multiplier, 2)

        return {
            "agent_name": self.name,
            "base_rate": base_rate,
            "recommended_daily_rate": recommended,
            "strategy": "Surge (+20%)" if demand == "HIGH" else "Discount (-10%)"
        }
