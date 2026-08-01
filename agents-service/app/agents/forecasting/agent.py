from typing import Dict, Any
from app.agents.base import BaseAgent


class OccupancyForecasterAgent(BaseAgent):
    """Predicts future unit occupancy rates."""

    def __init__(self):
        super().__init__(
            name="forecasting",
            description="Occupancy demand forecaster"
        )

    def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        unit_type = input_data.get("unit_type", "apartment")
        month = input_data.get("month", "August")

        return {
            "agent_name": self.name,
            "unit_type": unit_type,
            "projected_occupancy_percentage": 88.5,
            "demand_tier": "PEAK"
        }
