"""
Unit tests for services.
"""
import datetime
import pytest
from app.services.loan_service import LoanService


class TestLoanService:
    """Tests for LoanService."""
    
    def test_get_all_loans(self):
        """Test getting all loans."""
        service = LoanService()
        loans, _ = service.get_all_loans(page=1, page_size=1000)
        
        assert len(loans) == 4
        assert all(hasattr(loan, "id") for loan in loans)
        assert all(hasattr(loan, "name") for loan in loans)
    
    def test_get_loan_by_id_exists(self):
        """Test getting a loan that exists."""
        service = LoanService()
        loan = service.get_loan_by_id(1)
        
        assert loan is not None
        assert loan.id == 1
        assert loan.name == "Tom's Loan"
    
    def test_get_loan_by_id_not_exists(self):
        """Test getting a loan that doesn't exist."""
        service = LoanService()
        loan = service.get_loan_by_id(999)
        
        assert loan is None
    
    def test_get_payments_by_loan_id(self):
        """Test getting payments for a specific loan."""
        service = LoanService()
        payments, _ = service.get_payments_by_loan_id(1, page=1, page_size=1000)
        
        assert len(payments) == 1
        assert payments[0].loan_id == 1
    
    def test_get_payments_by_loan_id_no_payments(self):
        """Test getting payments for a loan with no payments."""
        service = LoanService()
        payments, _ = service.get_payments_by_loan_id(4, page=1, page_size=1000)
        
        assert len(payments) == 0
    
    def test_add_payment_success(self):
        """Test adding a payment successfully."""
        service = LoanService()
        payments_before, _ = service.get_payments_by_loan_id(1, page=1, page_size=1000)
        initial_count = len(payments_before)
        
        payment = service.add_payment(
            loan_id=1,
            payment_date=datetime.date(2025, 3, 10)
        )
        
        assert payment.id > 0
        assert payment.loan_id == 1
        assert payment.payment_date == datetime.date(2025, 3, 10)
        
        # Verify payment was added
        payments_after, _ = service.get_payments_by_loan_id(1, page=1, page_size=1000)
        assert len(payments_after) == initial_count + 1
    
    def test_add_payment_without_date(self):
        """Test adding a payment without date."""
        service = LoanService()
        
        payment = service.add_payment(loan_id=1, payment_date=None)
        
        assert payment.loan_id == 1
        assert payment.payment_date is None
    
    def test_add_payment_invalid_loan_id(self):
        """Test adding a payment for non-existent loan."""
        service = LoanService()
        
        with pytest.raises(ValueError, match="Loan with id 999 does not exist"):
            service.add_payment(loan_id=999, payment_date=datetime.date(2025, 3, 10))

