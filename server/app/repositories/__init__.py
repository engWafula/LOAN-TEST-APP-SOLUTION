"""
Repository layer for data access.
Separates data access logic from business logic.
"""
from app.repositories.loan_repository import LoanRepository
from app.repositories.payment_repository import PaymentRepository

__all__ = ["LoanRepository", "PaymentRepository"]

