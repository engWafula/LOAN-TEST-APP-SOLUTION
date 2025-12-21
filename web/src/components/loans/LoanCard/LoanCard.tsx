import { CategorizedPayment } from '../../../utils/paymentStatus';
import { PaymentStatus } from '../../ui/PaymentStatus';
import './LoanCard.css';

interface LoanCardProps {
  payment: CategorizedPayment;
}

export function LoanCard({ payment }: LoanCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="loan-card">
      <div className="loan-card__header">
        <div>
          <h3 className="loan-card__title">{payment.name}</h3>
          <p className="loan-card__id">Loan ID: {payment.id}</p>
        </div>
        <PaymentStatus status={payment.status} />
      </div>

      <div className="loan-card__grid">
        <div className="loan-card__field">
          <p className="loan-card__label">Principal</p>
          <p className="loan-card__value">{formatCurrency(payment.principal)}</p>
        </div>
        <div className="loan-card__field">
          <p className="loan-card__label">Interest Rate</p>
          <p className="loan-card__value">{payment.interestRate}%</p>
        </div>
        <div className="loan-card__field">
          <p className="loan-card__label">Due Date</p>
          <p className="loan-card__value loan-card__value--secondary">{formatDate(payment.dueDate)}</p>
        </div>
        <div className="loan-card__field">
          <p className="loan-card__label">Payment Date</p>
          <p className="loan-card__value loan-card__value--secondary">{formatDate(payment.paymentDate)}</p>
        </div>
      </div>
    </div>
  );
}
