import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addPayment, type AddPaymentRequest } from '../api';

describe('addPayment', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully add a payment', async () => {
    const mockResponse = {
      message: 'Payment added successfully',
      payment: {
        id: 1,
        loan_id: 1,
        payment_date: '2025-03-10',
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const request: AddPaymentRequest = {
      loan_id: 1,
      payment_date: '2025-03-10',
    };

    const result = await addPayment(request);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:2024/api/payments',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      }
    );
  });

  it('should add payment without date', async () => {
    const mockResponse = {
      message: 'Payment added successfully',
      payment: {
        id: 2,
        loan_id: 1,
        payment_date: null,
      },
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const request: AddPaymentRequest = {
      loan_id: 1,
    };

    const result = await addPayment(request);

    expect(result).toEqual(mockResponse);
  });

  it('should throw error when response is not ok', async () => {
    const mockError = {
      error: 'Loan with id 999 does not exist',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => mockError,
    });

    const request: AddPaymentRequest = {
      loan_id: 999,
    };

    await expect(addPayment(request)).rejects.toThrow(
      'Loan with id 999 does not exist'
    );
  });

  it('should throw generic error when error message is missing', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });

    const request: AddPaymentRequest = {
      loan_id: 1,
    };

    await expect(addPayment(request)).rejects.toThrow('Failed to add payment');
  });

  it('should handle network errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const request: AddPaymentRequest = {
      loan_id: 1,
    };

    await expect(addPayment(request)).rejects.toThrow('Network error');
  });
});

