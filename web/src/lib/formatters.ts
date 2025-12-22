import { format } from 'date-fns';

/**
 * Formats a number as USD currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a date string to a readable format
 * Returns 'N/A' if date is null or invalid
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), 'MMM dd, yyyy');
  } catch {
    return 'N/A';
  }
}

/**
 * Formats a number with locale-specific formatting
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

