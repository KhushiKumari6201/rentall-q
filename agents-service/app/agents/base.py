from abc import ABC, abstractmethod
from typing import Dict, Any


class BaseAgent(ABC):
    """Common Base Agent interface for all AI microservice agents."""

    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description

    @abstractmethod
    def run(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        """Core inference interface method: run(input) -> output."""
        pass
