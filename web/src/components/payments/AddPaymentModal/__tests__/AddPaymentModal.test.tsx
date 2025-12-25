import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../../../test/utils';
import userEvent from '@testing-library/user-event';
import { AddPaymentModal } from '../AddPaymentModal';
import type { LoanData } from '../../../../utils/paymentStatus';
import * as api from '../../../../utils/api';

const mockLoans: LoanData[] = [
  {
    id: 1,
    name: "Tom's Loan",
    interestRate: 5.0,
    principal: 10000,
    dueDate: '2025-03-01',
    loanPayments: [],
  },
];

describe('AddPaymentModal', () => {
  beforeEach(() => {
    vi.spyOn(api, 'addPayment').mockResolvedValue({
      message: 'Payment added successfully',
      payment: {
        id: 1,
        loan_id: 1,
        payment_date: '2025-03-10',
      },
    });
  });

  it('should render when isOpen is true', () => {
    render(
      <AddPaymentModal
        isOpen={true}
        onClose={vi.fn()}
        loans={mockLoans}
      />
    );
    expect(screen.getByText('Add New Payment')).toBeInTheDocument();
    expect(screen.getByLabelText(/select loan/i)).toBeInTheDocument();
  });

  it('should show "No loans available" when loans array is empty', () => {
    render(
      <AddPaymentModal
        isOpen={true}
        onClose={vi.fn()}
        loans={[]}
      />
    );
    expect(screen.getByText('No loans available')).toBeInTheDocument();
  });

  it('should close modal when cancel is clicked', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <AddPaymentModal
        isOpen={true}
        onClose={onClose}
        loans={mockLoans}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await user.click(cancelButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
