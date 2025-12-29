
import datetime
import pytest
from app.services.loan_service import LoanService


class TestLoanService:
    
    def test_get_all_loans(self):
        """Test getting all loans."""
        service = LoanService()
        loans = service.get_all_loans()
        
        assert len(loans) == 4
        assert all(hasattr(loan, "id") for loan in loans)
        assert all(hasattr(loan, "name") for loan in loans)

    
    def test_add_payment_success(self):
        """Test adding a payment successfully."""
        service = LoanService()
        payments_before = service.get_all_payments_by_loan_id(1)
        initial_count = len(payments_before)
        
        payment = service.add_payment(
            loan_id=1,
            payment_date=datetime.date(2025, 3, 10)
        )
        
        assert payment.id > 0
        assert payment.loan_id == 1
        assert payment.payment_date == datetime.date(2025, 3, 10)
        
        payments_after = service.get_all_payments_by_loan_id(1)
        assert len(payments_after) == initial_count + 1
    
    
    def test_add_payment_invalid_loan_id(self):
        """Test adding a payment for non-existent loan."""
        service = LoanService()
        
        with pytest.raises(ValueError, match="Loan with id 999 does not exist"):
            service.add_payment(loan_id=999, payment_date=datetime.date(2025, 3, 10))

