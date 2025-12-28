from typing import Optional
from app.services.loan_service import LoanService
from app.repositories.loan_repository import LoanRepository
from app.repositories.payment_repository import PaymentRepository


_loan_repository: Optional[LoanRepository] = None
_payment_repository: Optional[PaymentRepository] = None


def get_loan_repository() -> LoanRepository:
    global _loan_repository
    if _loan_repository is None:
        _loan_repository = LoanRepository()
    return _loan_repository


def get_payment_repository() -> PaymentRepository:
    global _payment_repository
    if _payment_repository is None:
        _payment_repository = PaymentRepository()
    return _payment_repository


def get_loan_service(
    loan_repository: Optional[LoanRepository] = None,
    payment_repository: Optional[PaymentRepository] = None
) -> LoanService:
    return LoanService(
        loan_repository=loan_repository or get_loan_repository(),
        payment_repository=payment_repository or get_payment_repository()
    )


def reset_repositories():
    global _loan_repository, _payment_repository
    _loan_repository = None
    _payment_repository = None

