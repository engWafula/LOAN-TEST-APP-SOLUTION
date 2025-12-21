import { useEffect, useState } from 'react';
import './LoanCalculator.css';

interface LoanCalculatorProps {
  principal: number;
  rate: number;
  months: number;
}

export function LoanCalculator({ principal, rate, months }: LoanCalculatorProps) {
  const [interest, setInterest] = useState(0);

  useEffect(() => {
    if (principal > 0 && rate >= 0 && months > 0) {
      const calculatedInterest = (principal * rate * months) / 100;
      setInterest(calculatedInterest);
    } else {
      setInterest(0);
    }
  }, [principal, rate, months]);

  return (
    <div className="loan-calculator">
      <div className="loan-calculator__fields">
        <div className="loan-calculator__row">
          <span className="loan-calculator__label">Principal</span>
          <span className="loan-calculator__value">${principal.toLocaleString()}</span>
        </div>
        <div className="loan-calculator__row">
          <span className="loan-calculator__label">Interest Rate</span>
          <span className="loan-calculator__value">{rate}%</span>
        </div>
        <div className="loan-calculator__row">
          <span className="loan-calculator__label">Duration</span>
          <span className="loan-calculator__value">{months} months</span>
        </div>
      </div>
      <div className="loan-calculator__divider">
        <div className="loan-calculator__total">
          <span className="loan-calculator__total-label">Total Interest</span>
          <span className="loan-calculator__total-value">
            ${interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
