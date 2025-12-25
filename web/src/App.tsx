import { useState } from 'react';
import { LoansTable } from './components/loans/LoansTable';
import { AddPaymentModal } from './components/payments/AddPaymentModal';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { LoadingOverlay } from './components/ui/LoadingOverlay';
import { CalculatorCard } from './components/loans/CalculatorCard';
import { Header } from './components/layout/Header';
import { AlertCircle } from 'lucide-react';
import { useLoans } from './hooks/useLoans';

function App() {
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const { categorizedPayments, uniqueLoans, loading, error, refetch } = useLoans();

  const handlePaymentAdded = () => {
    refetch();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onRefresh={refetch} isLoading={loading} />
      <div className="container mx-auto px-4 py-8 relative min-h-[400px]">
        <LoadingOverlay isLoading={loading} message="Loading loans and payments..." />

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message}
              <button
                onClick={() => refetch()}
                className="ml-2 underline hover:no-underline"
              >
                Retry
              </button>
            </AlertDescription>
          </Alert>
        )}

        <div className={`grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 ${loading ? 'opacity-30' : ''}`}>
          <div>
            {!loading && !error && (
              <LoansTable
                payments={categorizedPayments}
                itemsPerPage={20}
                onAddPaymentClick={() => setIsAddPaymentModalOpen(true)}
              />
            )}
          </div>

          <div className="lg:sticky lg:top-8 h-fit">
            <CalculatorCard />
          </div>
        </div>
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
