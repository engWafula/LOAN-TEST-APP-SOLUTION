import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOANS_QUERY } from './graphql/queries';
import { categorizeLoanPayments, LoanData } from './utils/paymentStatus';
import { Header } from './components/layout/Header';
import { LoanCard } from './components/loans/LoanCard';
import { AddPaymentModal } from './components/payments/AddPaymentModal';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ErrorMessage } from './components/ui/ErrorMessage';
import { CalculatorCard } from './components/loans/CalculatorCard';
import './App.css';

function App() {
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_LOANS_QUERY, {
    variables: { page: 1, pageSize: 0 },
    errorPolicy: 'all',
  });

  const handlePaymentAdded = () => {
    refetch();
  };

  const loans: LoanData[] = (data?.loans?.loans || [])
    .filter((loan): loan is LoanData => loan !== null)
    .map(loan => ({
      ...loan,
      loanPayments: loan.loanPayments || [],
    }));
  const categorizedPayments = categorizeLoanPayments(loans);
  
  const uniqueLoans = loans.reduce((acc, loan) => {
    if (!acc.find(l => l.id === loan.id)) {
      acc.push(loan);
    }
    return acc;
  }, [] as LoanData[]);

  return (
    <div className="app">
      <Header onAddPaymentClick={() => setIsAddPaymentModalOpen(true)} />

      <div className="app__container">
        {loading && (
          <div className="app__loading">
            <LoadingSpinner size="large" message="Loading loans and payments..." />
          </div>
        )}

        {error && (
          <div className="app__error">
            <ErrorMessage message={error.message} onRetry={() => refetch()} />
          </div>
        )}

        {!loading && !error && (
          <div className="app__grid">
            <div>
              <section className="app__section">
                <h2 className="app__section-title">Loans & Payments</h2>
                {categorizedPayments.length === 0 ? (
                  <div className="app__empty-state">
                    <p className="app__empty-state-text">No loans found</p>
                  </div>
                ) : (
                  <div>
                    {categorizedPayments.map((payment) => (
                      <LoanCard
                        key={`${payment.id}-${payment.paymentDate || 'unpaid'}`}
                        payment={payment}
                      />
                    ))}
                  </div>
                )}
              </section>
            </div>

            <div className="app__sidebar">
              <CalculatorCard />
            </div>
          </div>
        )}
      </div>

      <AddPaymentModal
        isOpen={isAddPaymentModalOpen}
        onClose={() => setIsAddPaymentModalOpen(false)}
        onPaymentAdded={handlePaymentAdded}
        loans={uniqueLoans}
      />
    </div>
  );
}

export default App;
