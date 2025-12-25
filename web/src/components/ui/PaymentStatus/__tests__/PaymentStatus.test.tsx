import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/utils';
import { PaymentStatus } from '../PaymentStatus';

describe('PaymentStatus', () => {
  it('should render status text', () => {
    render(<PaymentStatus status="On Time" />);
    expect(screen.getByText('On Time')).toBeInTheDocument();
  });

  it('should apply correct styling for each status', () => {
    const { rerender } = render(<PaymentStatus status="On Time" />);
    let badge = screen.getByText('On Time');
    expect(badge).toHaveClass('bg-green-100');

    rerender(<PaymentStatus status="Late" />);
    badge = screen.getByText('Late');
    expect(badge).toHaveClass('bg-yellow-100');

    rerender(<PaymentStatus status="Defaulted" />);
    badge = screen.getByText('Defaulted');
    expect(badge).toHaveClass('bg-red-100');
  });

  it('should accept custom className', () => {
    render(<PaymentStatus status="On Time" className="custom-class" />);
    const badge = screen.getByText('On Time');
    expect(badge).toHaveClass('custom-class');
  });
});
