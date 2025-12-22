"""Repository for loan data access operations."""
from typing import List, Optional, Tuple
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
    
    def get_paginated(
        self, 
        page: int = 1, 
        page_size: int = 10
    ) -> Tuple[List[Loan], dict]:
        all_loans = self.get_all()
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

