import { LoanCalculator } from '../LoanCalculator';

interface CalculatorCardProps {
  principal: number;
  rate: number;
  months: number;
}

export function CalculatorCard({
  principal,
  rate,
  months,
}: CalculatorCardProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Loan Interest Calculator</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Calculate the total interest for a loan based on principal, interest rate, and duration.
        </p>
      </div>
      <LoanCalculator principal={principal} rate={rate} months={months} />
    </div>
  );
}
