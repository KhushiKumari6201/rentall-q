import pytest
from app.agents.orchestrator import AgentOrchestrator


@pytest.fixture
def orchestrator():
    return AgentOrchestrator()
