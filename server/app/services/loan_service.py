import datetime
from typing import Optional
from app.models.loan import Loan, LoanPayment
from app.data.fixtures import get_initial_loans, get_initial_payments


class LoanService:
    def __init__(self):
        self._loans = get_initial_loans()
        self._loan_payments = get_initial_payments()
    
    def get_all_loans(self, page: int = 1, page_size: int = 10):
        all_loans = self._loans.copy()
        total = len(all_loans)
        total_pages = (total + page_size - 1) // page_size if total > 0 else 0
        
        if page < 1:
            page = 1
        if page > total_pages and total_pages > 0:
            page = total_pages
        
        start_idx = (page - 1) * page_size
        end_idx = start_idx + page_size
        paginated_loans = all_loans[start_idx:end_idx]
        
        pagination_meta = {
            "page": page,
            "page_size": page_size,
            "total": total,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_prev": page > 1
        }
        
        return paginated_loans, pagination_meta
    
    def get_loan_by_id(self, loan_id: int) -> Optional[Loan]:
        return next((loan for loan in self._loans if loan.id == loan_id), None)
    
    def get_payments_by_loan_id(self, loan_id: int, page: int = 1, page_size: int = 10):
        all_payments = [payment for payment in self._loan_payments if payment.loan_id == loan_id]
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
    
    def add_payment(self, loan_id: int, payment_date: Optional[datetime.date] = None) -> LoanPayment:
        if not self.get_loan_by_id(loan_id):
            raise ValueError(f"Loan with id {loan_id} does not exist")
        
        new_id = max([p.id for p in self._loan_payments], default=0) + 1
        payment = LoanPayment(
            id=new_id,
            loan_id=loan_id,
            payment_date=payment_date
        )
        
        self._loan_payments.append(payment)
        return payment

