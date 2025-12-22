import { LoansTableColumn } from './types';
import { CategorizedPayment } from '../../../utils/paymentStatus';
import { PaymentStatus } from '../../ui/PaymentStatus';
import { formatCurrency, formatDate } from '@/lib/formatters';

export const loansTableColumns: LoansTableColumn[] = [
  {
    id: 'name',
    header: 'Loan Name',
    accessor: (row) => row.name,
    sortable: true,
    className: 'font-medium',
  },
  {
    id: 'id',
    header: 'Loan ID',
    accessor: (row) => row.id,
    sortable: true,
    className: 'text-muted-foreground',
  },
  {
    id: 'principal',
    header: 'Principal',
    accessor: (row) => row.principal,
    cell: (value) => formatCurrency(value as number),
    sortable: true,
    align: 'right',
    className: 'font-semibold',
  },
  {
    id: 'interestRate',
    header: 'Interest Rate',
    accessor: (row) => row.interestRate,
    cell: (value) => `${value}%`,
    sortable: true,
    align: 'right',
  },
  {
    id: 'dueDate',
    header: 'Due Date',
    accessor: (row) => row.dueDate,
    cell: (value) => formatDate(value as string),
    sortable: true,
  },
  {
    id: 'paymentDate',
    header: 'Payment Date',
    accessor: (row) => row.paymentDate,
    cell: (value) => formatDate(value as string | null),
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessor: (row) => row.status,
    cell: (value) => <PaymentStatus status={value as CategorizedPayment['status']} />,
    sortable: true,
    align: 'center',
  },
];
