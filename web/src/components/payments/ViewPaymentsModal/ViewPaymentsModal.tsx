import { LoanData } from '../../../utils/paymentStatus';
import { categorizePayment, PaymentStatus } from '../../../utils/paymentStatus';
import { PaymentStatus as PaymentStatusComponent } from '@/components/ui/PaymentStatus';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/formatters';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EmptyState } from '@/components/ui/EmptyState';

interface ViewPaymentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: LoanData | null;
}

export function ViewPaymentsModal({ isOpen, onClose, loan }: ViewPaymentsModalProps) {
  if (!loan) return null;

  const payments = loan.loanPayments?.filter((p) => p !== null) || [];
  const categorizedPayments = payments.map((payment) => ({
    ...payment,
    status: categorizePayment(loan.dueDate, payment.paymentDate) as PaymentStatus,
  }));

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Payments for {loan.name}</DialogTitle>
          <DialogDescription>
            View all payments for loan ID: {loan.id}
          </DialogDescription>
        </DialogHeader>

        {categorizedPayments.length === 0 ? (
          <EmptyState
            title="No payments found"
            description="This loan has no payments recorded yet."
          />
        ) : (
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment ID</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categorizedPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>
                      {payment.paymentDate ? formatDate(payment.paymentDate) : 'N/A'}
                    </TableCell>
                    <TableCell>{formatDate(loan.dueDate)}</TableCell>
                    <TableCell className="text-center">
                      <PaymentStatusComponent status={payment.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}


