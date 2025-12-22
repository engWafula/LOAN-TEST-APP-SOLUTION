import { CategorizedPayment } from '../../../utils/paymentStatus';
import { PaymentStatus } from '../../ui/PaymentStatus';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { format } from 'date-fns';

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
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return 'N/A';
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{payment.name}</h3>
            <p className="text-sm text-muted-foreground">Loan ID: {payment.id}</p>
          </div>
          <PaymentStatus status={payment.status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Principal</p>
            <p className="text-lg font-semibold">{formatCurrency(payment.principal)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Interest Rate</p>
            <p className="text-lg font-semibold">{payment.interestRate}%</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Due Date</p>
            <p className="text-base">{formatDate(payment.dueDate)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Payment Date</p>
            <p className="text-base">{formatDate(payment.paymentDate)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
