import datetime
from dataclasses import dataclass
from typing import Optional


@dataclass
class Loan:
    id: int
    name: str
    interest_rate: float
    principal: int
    due_date: datetime.date
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "interest_rate": self.interest_rate,
            "principal": self.principal,
            "due_date": self.due_date.isoformat() if isinstance(self.due_date, datetime.date) else self.due_date
        }


@dataclass
class LoanPayment:
    id: int
    loan_id: int
    payment_date: Optional[datetime.date] = None
    
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "loan_id": self.loan_id,
            "payment_date": self.payment_date.isoformat() if self.payment_date and isinstance(self.payment_date, datetime.date) else None
        }

