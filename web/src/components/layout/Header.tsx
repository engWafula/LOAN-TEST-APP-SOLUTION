import './Header.css';

interface HeaderProps {
  onAddPaymentClick: () => void;
}

export function Header({ onAddPaymentClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__container">
        <div>
          <h1 className="header__title">Loan Management System</h1>
          <p className="header__subtitle">View and manage loans and their payment status</p>
        </div>
        <button className="header__button" onClick={onAddPaymentClick}>
          + Add Payment
        </button>
      </div>
    </header>
  );
}
