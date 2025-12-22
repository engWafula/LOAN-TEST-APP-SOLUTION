import { PaymentStatus as StatusType } from '../../../utils/paymentStatus';
import { cn } from '@/lib/utils';

interface PaymentStatusProps {
  status: StatusType;
  className?: string;
}

const statusClassMap: Record<StatusType, string> = {
  'On Time': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
  'Late': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100',
  'Defaulted': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
  'Unpaid': 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100',
};

export function PaymentStatus({ status, className }: PaymentStatusProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        statusClassMap[status],
        className
      )}
    >
      {status}
    </span>
  );
}
