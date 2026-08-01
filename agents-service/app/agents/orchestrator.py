from typing import Dict, Any, Type
from app.agents.base import BaseAgent
from app.agents.churn.agent import ChurnPredictionAgent
from app.agents.pricing.agent import DynamicPricingAgent
from app.agents.forecasting.agent import OccupancyForecasterAgent
from app.agents.risk.agent import PaymentRiskAgent
from app.agents.performance.agent import PerformanceAnalyzerAgent


class AgentOrchestrator:
    """Shared Orchestrator/Router that routes requests to specific agents."""

    def __init__(self):
        self._agents: Dict[str, BaseAgent] = {
            "churn": ChurnPredictionAgent(),
            "pricing": DynamicPricingAgent(),
            "forecasting": OccupancyForecasterAgent(),
            "risk": PaymentRiskAgent(),
            "performance": PerformanceAnalyzerAgent(),
        }

    def dispatch(self, agent_name: str, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Routes execution to agent instance via common run(input) interface."""
        agent = self._agents.get(agent_name)
        if not agent:
            raise ValueError(f"Agent '{agent_name}' not registered. Available agents: {list(self._agents.keys())}")
        
        return agent.run(input_data)
