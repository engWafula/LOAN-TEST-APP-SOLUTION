import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/utils';
import { LoanCard } from '../LoanCard';
import type { CategorizedPayment } from '../../../../utils/paymentStatus';

describe('LoanCard', () => {
  const mockPayment: CategorizedPayment = {
    id: 1,
    name: "Tom's Loan",
    interestRate: 5.0,
    principal: 10000,
    dueDate: '2025-03-01',
    paymentDate: '2025-03-04',
    status: 'On Time',
  };

  it('should render loan information correctly', () => {
    render(<LoanCard payment={mockPayment} />);
    
    expect(screen.getByText("Tom's Loan")).toBeInTheDocument();
    expect(screen.getByText(/Loan ID: 1/)).toBeInTheDocument();
    expect(screen.getByText('$10,000.00')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  it('should render payment status badge', () => {
    render(<LoanCard payment={mockPayment} />);
    expect(screen.getByText('On Time')).toBeInTheDocument();
  });

  it('should format currency correctly', () => {
    const largeAmount: CategorizedPayment = {
      ...mockPayment,
      principal: 500000,
    };
    render(<LoanCard payment={largeAmount} />);
    expect(screen.getByText('$500,000.00')).toBeInTheDocument();
  });

  it('should format dates correctly', () => {
    render(<LoanCard payment={mockPayment} />);
    expect(screen.getByText(/Mar 0?1, 2025/)).toBeInTheDocument();
    expect(screen.getByText(/Mar 0?4, 2025/)).toBeInTheDocument();
  });

  it('should display N/A for null payment date', () => {
    const unpaidPayment: CategorizedPayment = {
      ...mockPayment,
      paymentDate: null,
      status: 'Unpaid',
    };
    render(<LoanCard payment={unpaidPayment} />);
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('should render all status types correctly', () => {
    const statuses: Array<CategorizedPayment['status']> = [
      'On Time',
      'Late',
      'Defaulted',
      'Unpaid',
    ];

    statuses.forEach((status) => {
      const { unmount } = render(
        <LoanCard payment={{ ...mockPayment, status }} />
      );
      expect(screen.getByText(status)).toBeInTheDocument();
      unmount();
    });
  });
});

