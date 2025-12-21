import { useState, FormEvent } from 'react';
import { addPayment } from '../../utils/api';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ErrorMessage } from '../ui/ErrorMessage';
import { Modal } from '../ui/Modal';
import { LoanData } from '../../utils/paymentStatus';
import './AddPaymentModal.css';

interface AddPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentAdded?: () => void;
  loans: LoanData[];
}

export function AddPaymentModal({ isOpen, onClose, onPaymentAdded, loans }: AddPaymentModalProps) {
  const [loanId, setLoanId] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const loanIdNum = parseInt(loanId, 10);
      if (!loanId || isNaN(loanIdNum) || loanIdNum < 1) {
        throw new Error('Please select a loan');
      }

      await addPayment({
        loan_id: loanIdNum,
        payment_date: paymentDate || undefined,
      });

      setSuccess(true);
      setLoanId('');
      setPaymentDate('');

      if (onPaymentAdded) {
        onPaymentAdded();
      }

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add payment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setError(null);
      setSuccess(false);
      setLoanId('');
      setPaymentDate('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Payment">
      {error && <ErrorMessage message={error} />}

      {success && (
        <div className="add-payment__success">
          Payment added successfully!
        </div>
      )}

      <form className="add-payment__form" onSubmit={handleSubmit}>
        <div className="add-payment__field">
          <label htmlFor="loan-select" className="add-payment__label">
            Select Loan *
          </label>
          <select
            id="loan-select"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            required
            disabled={isSubmitting || loans.length === 0}
            className="add-payment__select"
          >
            <option value="">-- Select a loan --</option>
            {loans.map((loan) => (
              <option key={loan.id} value={loan.id}>
                {loan.name} (ID: {loan.id}) - ${loan.principal.toLocaleString()}
              </option>
            ))}
          </select>
          {loans.length === 0 && (
            <p className="add-payment__hint">No loans available</p>
          )}
        </div>

        <div className="add-payment__field">
          <label htmlFor="payment-date" className="add-payment__label">
            Payment Date (optional)
          </label>
          <input
            id="payment-date"
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            disabled={isSubmitting}
            className="add-payment__input"
          />
        </div>

        <div className="add-payment__actions">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="add-payment__button add-payment__button--cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="add-payment__button add-payment__button--submit"
          >
            {isSubmitting ? (
              <span className="add-payment__button-content">
                <LoadingSpinner size="small" inline />
                Adding...
              </span>
            ) : (
              'Add Payment'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
