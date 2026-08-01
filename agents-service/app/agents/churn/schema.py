from pydantic import BaseModel
from typing import Optional


class ChurnInput(BaseModel):
    customer_id: str
    days_since_last_booking: Optional[int] = 30
    total_bookings: Optional[int] = 5
    cancellations_count: Optional[int] = 0


class ChurnOutput(BaseModel):
    agent_name: str
    customer_id: str
    churn_probability: float
    risk_level: str
    recommended_action: str
