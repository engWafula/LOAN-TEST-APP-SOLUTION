import graphene
from app.services.loan_service import LoanService


class PaginationInfo(graphene.ObjectType):
    page = graphene.Int(required=True)
    page_size = graphene.Int(required=True)
    total = graphene.Int(required=True)
    total_pages = graphene.Int(required=True)
    has_next = graphene.Boolean(required=True)
    has_prev = graphene.Boolean(required=True)


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
        service = LoanService()
        payments, _ = service.get_payments_by_loan_id(self.id, page=1, page_size=1000)
        return payments


class LoanConnection(graphene.ObjectType):
    loans = graphene.List(LoanType, required=True)
    pagination = graphene.Field(PaginationInfo, required=True)


class Query(graphene.ObjectType):
    loans = graphene.Field(
        LoanConnection,
        page=graphene.Int(default_value=1),
        page_size=graphene.Int(default_value=0)
    )
    
    def resolve_loans(self, info, page=1, page_size=0):
        service = LoanService()
        
        if page_size == 0:
            loans, _ = service.get_all_loans(page=1, page_size=1000)
            total = len(loans)
            pagination = {
                "page": 1,
                "page_size": total,
                "total": total,
                "total_pages": 1,
                "has_next": False,
                "has_prev": False
            }
        else:
            if page < 1:
                page = 1
            if page_size < 1:
                page_size = 10
            if page_size > 100:
                page_size = 100
            
            loans, pagination = service.get_all_loans(page=page, page_size=page_size)
        
        return LoanConnection(
            loans=loans,
            pagination=PaginationInfo(**pagination)
        )
    


schema = graphene.Schema(query=Query)

