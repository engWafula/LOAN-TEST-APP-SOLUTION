const API_BASE_URL = 'http://localhost:2024';

export interface AddPaymentRequest {
  loan_id: number;
  payment_date?: string;
  amount?: number;
}

export interface AddPaymentResponse {
  message: string;
  payment: {
    id: number;
    loan_id: number;
    payment_date: string | null;
  };
}

export interface ApiError {
  error: string;
  details?: Record<string, string[]>;
}

export async function addPayment(
  data: AddPaymentRequest
): Promise<AddPaymentResponse> {
  const response = await fetch(`${API_BASE_URL}/api/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.error || 'Failed to add payment');
  }

  return response.json();
}

