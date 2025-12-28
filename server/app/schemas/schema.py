import graphene
from app.services.service_factory import get_loan_service


class LoanPaymentType(graphene.ObjectType):
    id = graphene.Int(required=True)
    loan_id = graphene.Int(required=True)
    payment_date = graphene.String()
    
    @staticmethod
    def resolve_payment_date(payment, info):
        if payment.payment_date is None:
            return None
        if isinstance(payment.payment_date, str):
            return payment.payment_date
        return payment.payment_date.isoformat()


class LoanType(graphene.ObjectType):
    id = graphene.Int(required=True)
    name = graphene.String(required=True)
    interest_rate = graphene.Float(required=True)
    principal = graphene.Int(required=True)
    due_date = graphene.String(required=True)
    loan_payments = graphene.List(LoanPaymentType)
    
    @staticmethod
    def resolve_interest_rate(loan, info):
        return loan.interest_rate
    
    @staticmethod
    def resolve_due_date(loan, info):
        if isinstance(loan.due_date, str):
            return loan.due_date
        return loan.due_date.isoformat() if loan.due_date else None
    
    def resolve_loan_payments(self, info):
        service = get_loan_service()
        payments = service.get_all_payments_by_loan_id(self.id)
        return payments


class Query(graphene.ObjectType):
    loans = graphene.List(LoanType, required=True)
    
    def resolve_loans(self, info):
        service = get_loan_service()
        loans = service.get_all_loans()
        return loans
    


schema = graphene.Schema(query=Query)

