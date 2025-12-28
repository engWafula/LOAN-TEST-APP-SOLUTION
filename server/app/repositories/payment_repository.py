"""Repository for payment data access operations."""
import datetime
from typing import List, Optional
from app.models.loan import LoanPayment
from app.data.fixtures import get_initial_payments


class PaymentRepository:
    """Repository for payment data access."""
    
    def __init__(self, initial_payments: Optional[List[LoanPayment]] = None):
        self._payments = (initial_payments or get_initial_payments()).copy()
    
    def get_by_loan_id(self, loan_id: int) -> List[LoanPayment]:
        return [p for p in self._payments if p.loan_id == loan_id]
    
    def create(self, loan_id: int, payment_date: Optional[datetime.date]) -> LoanPayment:
        new_id = max([p.id for p in self._payments], default=0) + 1
        
        payment = LoanPayment(
            id=new_id,
            loan_id=loan_id,
            payment_date=payment_date
        )
        
        self._payments.append(payment)
        return payment

