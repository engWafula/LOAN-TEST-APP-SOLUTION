"""Repository for loan data access operations."""
from typing import List, Optional
from app.models.loan import Loan
from app.data.fixtures import get_initial_loans


class LoanRepository:
    """Repository for loan data access."""
    
    def __init__(self, initial_loans: Optional[List[Loan]] = None):
        self._loans = (initial_loans or get_initial_loans()).copy()
    
    def get_all(self) -> List[Loan]:
        return self._loans.copy()
    
    def get_by_id(self, loan_id: int) -> Optional[Loan]:
        return next((loan for loan in self._loans if loan.id == loan_id), None)
    
    def exists(self, loan_id: int) -> bool:
        return self.get_by_id(loan_id) is not None

