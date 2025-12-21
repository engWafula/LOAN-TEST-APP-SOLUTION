import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../../../test/utils';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header';

describe('Header', () => {
  it('should render header with title and subtitle', () => {
    render(<Header onAddPaymentClick={vi.fn()} />);
    
    expect(screen.getByText('Loan Management System')).toBeInTheDocument();
    expect(
      screen.getByText('View and manage loans and their payment status')
    ).toBeInTheDocument();
  });

  it('should render add payment button', () => {
    render(<Header onAddPaymentClick={vi.fn()} />);
    expect(screen.getByRole('button', { name: /add payment/i })).toBeInTheDocument();
  });

  it('should call onAddPaymentClick when button is clicked', async () => {
    const user = userEvent.setup();
    const onAddPaymentClick = vi.fn();
    render(<Header onAddPaymentClick={onAddPaymentClick} />);
    
    const button = screen.getByRole('button', { name: /add payment/i });
    await user.click(button);
    
    expect(onAddPaymentClick).toHaveBeenCalledTimes(1);
  });
});

