import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { addPayment, type AddPaymentRequest, type AddPaymentResponse } from '../api';

describe('addPayment', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully add a payment', async () => {
    const mockResponse: AddPaymentResponse = {
      message: 'Payment added successfully',
      payment: {
        id: 1,
        loan_id: 1,
        payment_date: '2025-03-10',
      },
    };

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: (): Promise<AddPaymentResponse> => Promise.resolve(mockResponse),
    } as Response);

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
    const mockResponse: AddPaymentResponse = {
      message: 'Payment added successfully',
      payment: {
        id: 2,
        loan_id: 1,
        payment_date: null,
      },
    };

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: true,
      json: (): Promise<AddPaymentResponse> => Promise.resolve(mockResponse),
    } as Response);

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

    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      json: (): Promise<{ error: string }> => Promise.resolve(mockError),
    } as Response);

    const request: AddPaymentRequest = {
      loan_id: 999,
    };

    await expect(addPayment(request)).rejects.toThrow(
      'Loan with id 999 does not exist'
    );
  });

  it('should throw generic error when error message is missing', async () => {
    vi.mocked(global.fetch).mockResolvedValueOnce({
      ok: false,
      json: (): Promise<Record<string, unknown>> => Promise.resolve({}),
    } as Response);

    const request: AddPaymentRequest = {
      loan_id: 1,
    };

    await expect(addPayment(request)).rejects.toThrow('Failed to add payment');
  });

  it('should handle network errors', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

    const request: AddPaymentRequest = {
      loan_id: 1,
    };

    await expect(addPayment(request)).rejects.toThrow('Network error');
  });
});

