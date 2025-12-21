import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../../../test/utils';
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
  {
    id: 2,
    name: "Chris Wailaka",
    interestRate: 3.5,
    principal: 500000,
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

  it('should not render when isOpen is false', () => {
    render(
      <AddPaymentModal
        isOpen={false}
        onClose={vi.fn()}
        loans={mockLoans}
      />
    );
    expect(screen.queryByText('Add New Payment')).not.toBeInTheDocument();
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
    expect(screen.getByLabelText(/payment date/i)).toBeInTheDocument();
  });

  it('should display loans in dropdown', () => {
    render(
      <AddPaymentModal
        isOpen={true}
        onClose={vi.fn()}
        loans={mockLoans}
      />
    );
    
    const select = screen.getByLabelText(/select loan/i);
    expect(select).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /tom's loan/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /chris wailaka/i })).toBeInTheDocument();
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
    expect(screen.getByLabelText(/select loan/i)).toBeDisabled();
  });

  it('should submit form with selected loan and date', async () => {
    const user = userEvent.setup();
    const onPaymentAdded = vi.fn();
    const onClose = vi.fn();

    render(
      <AddPaymentModal
        isOpen={true}
        onClose={onClose}
        onPaymentAdded={onPaymentAdded}
        loans={mockLoans}
      />
    );

    const select = screen.getByLabelText(/select loan/i);
    await user.selectOptions(select, '1');

    const dateInput = screen.getByLabelText(/payment date/i);
    await user.type(dateInput, '2025-03-10');

    const submitButton = screen.getByRole('button', { name: /add payment/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.addPayment).toHaveBeenCalledWith({
        loan_id: 1,
        payment_date: '2025-03-10',
      });
    });

    await waitFor(() => {
      expect(screen.getByText('Payment added successfully!')).toBeInTheDocument();
    });
  });

  it('should submit form without date', async () => {
    const user = userEvent.setup();

    render(
      <AddPaymentModal
        isOpen={true}
        onClose={vi.fn()}
        loans={mockLoans}
      />
    );

    const select = screen.getByLabelText(/select loan/i);
    await user.selectOptions(select, '1');

    const submitButton = screen.getByRole('button', { name: /add payment/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(api.addPayment).toHaveBeenCalledWith({
        loan_id: 1,
        payment_date: undefined,
      });
    });
  });

  it('should show error message on API failure', async () => {
    const user = userEvent.setup();
    vi.spyOn(api, 'addPayment').mockRejectedValueOnce(
      new Error('Loan with id 999 does not exist')
    );

    render(
      <AddPaymentModal
        isOpen={true}
        onClose={vi.fn()}
        loans={mockLoans}
      />
    );

    const select = screen.getByLabelText(/select loan/i);
    await user.selectOptions(select, '1');

    const submitButton = screen.getByRole('button', { name: /add payment/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/loan with id 999 does not exist/i)).toBeInTheDocument();
    });
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

  it('should disable form when submitting', async () => {
    const user = userEvent.setup();
    let resolvePayment: (value: any) => void;
    const paymentPromise = new Promise((resolve) => {
      resolvePayment = resolve;
    });
    vi.spyOn(api, 'addPayment').mockReturnValueOnce(paymentPromise as any);

    render(
      <AddPaymentModal
        isOpen={true}
        onClose={vi.fn()}
        loans={mockLoans}
      />
    );

    const select = screen.getByLabelText(/select loan/i);
    await user.selectOptions(select, '1');

    const submitButton = screen.getByRole('button', { name: /add payment/i });
    await user.click(submitButton);

    expect(submitButton).toBeDisabled();
    expect(screen.getByText(/adding.../i)).toBeInTheDocument();

    resolvePayment!({
      message: 'Success',
      payment: { id: 1, loan_id: 1, payment_date: null },
    });
  });

  it('should auto-close after successful submission', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <AddPaymentModal
        isOpen={true}
        onClose={onClose}
        loans={mockLoans}
      />
    );

    const select = screen.getByLabelText(/select loan/i);
    await user.selectOptions(select, '1');

    const submitButton = screen.getByRole('button', { name: /add payment/i });
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalled();
      },
      { timeout: 2000 }
    );
  });
});

