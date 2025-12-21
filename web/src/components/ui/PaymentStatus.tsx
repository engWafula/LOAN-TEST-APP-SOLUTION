import { PaymentStatus as StatusType } from '../utils/paymentStatus';
import './PaymentStatus.css';

interface PaymentStatusProps {
  status: StatusType;
  className?: string;
}

const statusClassMap: Record<StatusType, string> = {
  'On Time': 'payment-status--on-time',
  'Late': 'payment-status--late',
  'Defaulted': 'payment-status--defaulted',
  'Unpaid': 'payment-status--unpaid',
};

export function PaymentStatus({ status, className = '' }: PaymentStatusProps) {
  return (
    <span className={`payment-status ${statusClassMap[status]} ${className}`}>
      {status}
    </span>
  );
}
