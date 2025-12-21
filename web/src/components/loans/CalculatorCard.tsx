import { LoanCalculator } from './LoanCalculator';
import './CalculatorCard.css';

export function CalculatorCard() {
  return (
    <div className="calculator-card">
      <h3 className="calculator-card__title">Loan Interest Calculator</h3>
      <p className="calculator-card__description">
        Calculate the total interest for a loan based on principal, interest rate, and duration.
      </p>
      <LoanCalculator principal={10000} rate={5.0} months={12} />
    </div>
  );
}
