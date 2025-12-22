"""Repository for payment data access operations."""
import datetime
from typing import List, Optional, Tuple
from app.models.loan import LoanPayment
from app.data.fixtures import get_initial_payments


class PaymentRepository:
    """Repository for payment data access."""
    
    def __init__(self, initial_payments: Optional[List[LoanPayment]] = None):
        self._payments = (initial_payments or get_initial_payments()).copy()
    
    def get_all(self) -> List[LoanPayment]:
        return self._payments.copy()
    
    def get_by_id(self, payment_id: int) -> Optional[LoanPayment]:
        return next((p for p in self._payments if p.id == payment_id), None)
    
    def get_by_loan_id(self, loan_id: int) -> List[LoanPayment]:
        return [p for p in self._payments if p.loan_id == loan_id]
    
    def get_paginated_by_loan_id(
        self, 
        loan_id: int,
        page: int = 1, 
        page_size: int = 10
    ) -> Tuple[List[LoanPayment], dict]:
        all_payments = self.get_by_loan_id(loan_id)
        total = len(all_payments)
        total_pages = (total + page_size - 1) // page_size if total > 0 else 0
        
        if page < 1:
            page = 1
        if page > total_pages and total_pages > 0:
            page = total_pages
        
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size
        paginated_payments = all_payments[start_idx:end_idx]
        
        pagination_meta = {
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1
        }
        
        return paginated_payments, pagination_meta
    
    def create(self, loan_id: int, payment_date: Optional[datetime.date]) -> LoanPayment:
        new_id = max([p.id for p in self._payments], default=0) + 1
        
        payment = LoanPayment(
            id=new_id,
            loan_id=loan_id,
            payment_date=payment_date
        )
        
        self._payments.append(payment)
        return payment
    
    def count(self) -> int:
        return len(self._payments)

