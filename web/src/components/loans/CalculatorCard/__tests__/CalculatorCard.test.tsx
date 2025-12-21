import { describe, it, expect } from 'vitest';
import { render, screen } from '../../../../test/utils';
import { CalculatorCard } from '../CalculatorCard';

describe('CalculatorCard', () => {
  it('should render calculator card with title and description', () => {
    render(<CalculatorCard />);
    
    expect(screen.getByText('Loan Interest Calculator')).toBeInTheDocument();
    expect(
      screen.getByText(/calculate the total interest for a loan/i)
    ).toBeInTheDocument();
  });

  it('should render LoanCalculator component', () => {
    render(<CalculatorCard />);
    expect(screen.getByText('$10,000')).toBeInTheDocument();
    expect(screen.getByText('5%')).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
  });
});

