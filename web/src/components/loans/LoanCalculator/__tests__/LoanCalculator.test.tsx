import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/utils';
import { LoanCalculator } from '../LoanCalculator';

describe('LoanCalculator', () => {
  it('should calculate and display interest correctly', () => {
    render(<LoanCalculator principal={10000} rate={5.0} months={12} />);
    
    expect(screen.getByText('$10,000')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
    expect(screen.getByText('$6,000.00')).toBeInTheDocument();
  });

  it('should handle zero values', () => {
    render(<LoanCalculator principal={0} rate={0} months={0} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
  });

  it('should handle large numbers', () => {
    render(<LoanCalculator principal={1000000} rate={10} months={24} />);
    expect(screen.getByText('$2,400,000.00')).toBeInTheDocument();
  });

  it('should update calculation when props change', () => {
    const { rerender } = render(
      <LoanCalculator principal={10000} rate={5.0} months={12} />
    );
    expect(screen.getByText('$6,000.00')).toBeInTheDocument();

    rerender(<LoanCalculator principal={20000} rate={5.0} months={12} />);
    expect(screen.getByText('$12,000.00')).toBeInTheDocument();
  });

  it('should handle decimal interest rates', () => {
    render(<LoanCalculator principal={10000} rate={3.5} months={12} />);
    expect(screen.getByText('3.5%')).toBeInTheDocument();
    expect(screen.getByText('$4,200.00')).toBeInTheDocument();
  });
});

