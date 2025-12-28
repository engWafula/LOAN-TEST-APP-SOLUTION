import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../test/utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { mockLoansQuery, mockLoansQueryError } from '../test/mocks';
import * as api from '../utils/api';

describe('App', () => {
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

  it('should render loading state initially', async () => {
    render(<App />, {
      mocks: [mockLoansQuery],
    });
    expect(screen.getByText(/loading loans and payments/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading loans and payments/i)).not.toBeInTheDocument();
    });
  });

  it('should render loans and payments when data loads', async () => {
    render(<App />, {
      mocks: [mockLoansQuery],
    });

    await waitFor(() => {
      expect(screen.getByText(/^Loans$/)).toBeInTheDocument();
    });

    expect(screen.getByText("Tom's Loan")).toBeInTheDocument();
    expect(screen.getByText("Chris Wailaka")).toBeInTheDocument();
  });

  it('should render error message on query error', async () => {
    render(<App />, {
      mocks: [mockLoansQueryError],
    });

    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument();
    });
  });

  it('should open add payment modal when header button is clicked', async () => {
    const user = userEvent.setup();

    render(<App />, {
      mocks: [mockLoansQuery],
    });

    await waitFor(() => {
      expect(screen.getByText(/^Loans$/)).toBeInTheDocument();
    });

    const addButton = screen.getByRole('button', { name: /add payment/i });
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add New Payment')).toBeInTheDocument();
    });
  });


  it('should display calculator in sidebar', async () => {
    render(<App />, {
      mocks: [mockLoansQuery],
    });

    await waitFor(() => {
      expect(screen.getByText(/loan interest calculator/i)).toBeInTheDocument();
    });
  });

});

