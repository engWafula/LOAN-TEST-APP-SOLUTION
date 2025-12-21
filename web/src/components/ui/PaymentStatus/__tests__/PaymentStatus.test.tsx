import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/utils';
import { PaymentStatus } from '../PaymentStatus';
import type { PaymentStatus as StatusType } from '../../../../utils/paymentStatus';

describe('PaymentStatus', () => {
  const statuses: StatusType[] = ['On Time', 'Late', 'Defaulted', 'Unpaid'];

  statuses.forEach((status) => {
    it(`should render ${status} status correctly`, () => {
      render(<PaymentStatus status={status} />);
      const badge = screen.getByText(status);
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass('payment-status');
    });
  });

  it('should apply correct CSS class for each status', () => {
    const { rerender } = render(<PaymentStatus status="On Time" />);
    expect(screen.getByText('On Time')).toHaveClass('payment-status--on-time');

    rerender(<PaymentStatus status="Late" />);
    expect(screen.getByText('Late')).toHaveClass('payment-status--late');

    rerender(<PaymentStatus status="Defaulted" />);
    expect(screen.getByText('Defaulted')).toHaveClass('payment-status--defaulted');

    rerender(<PaymentStatus status="Unpaid" />);
    expect(screen.getByText('Unpaid')).toHaveClass('payment-status--unpaid');
  });

  it('should accept custom className', () => {
    render(<PaymentStatus status="On Time" className="custom-class" />);
    const badge = screen.getByText('On Time');
    expect(badge).toHaveClass('payment-status');
    expect(badge).toHaveClass('payment-status--on-time');
    expect(badge).toHaveClass('custom-class');
  });
});

