import { useState, useMemo } from 'react';
import { LoanData } from '../../../utils/paymentStatus';
import { DataTable } from './DataTable';
import { createLoansTableColumns } from './columns';
import { SortState } from './types';
import { sortData, toggleSort } from './utils';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface LoansTableProps {
  loans: LoanData[];
  onAddPaymentClick?: () => void;
  onViewPayments?: (loan: LoanData) => void;
}

export function LoansTable({ loans, onAddPaymentClick, onViewPayments }: LoansTableProps) {
  const [sortState, setSortState] = useState<SortState>({
    field: 'id',
    direction: 'asc',
  });

  const columns = useMemo(
    () => createLoansTableColumns(onViewPayments),
    [onViewPayments]
  );

  const handleSort = (field: string) => {
    const newSortState = toggleSort(sortState, field);
    setSortState(newSortState);
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortState.field) return loans;
    const column = columns.find((col) => col.id === sortState.field);
    const accessor = column?.accessor || (() => null);
    return sortData(loans, sortState, accessor);
  }, [loans, sortState, columns]);

  const getRowId = (row: LoanData) => `loan-${row.id}`;

  if (loans.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Loans</h2>
          {onAddPaymentClick && (
            <Button onClick={onAddPaymentClick}>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
          )}
        </div>
        <EmptyState
          title="No loans found"
          description="There are no loans to display at this time."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Loans</h2>
        {onAddPaymentClick && (
          <Button onClick={onAddPaymentClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Payment
          </Button>
        )}
      </div>

      <DataTable
        data={sortedData}
        columns={columns}
        sortState={sortState}
        onSort={handleSort}
        getRowId={getRowId}
        emptyTitle="No data available"
        emptyDescription="Try adjusting your filters or search criteria."
      />
    </div>
  );
}
