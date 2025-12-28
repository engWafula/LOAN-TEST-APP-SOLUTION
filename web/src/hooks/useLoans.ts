import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GET_LOANS_QUERY } from '../graphql/queries';
import { LoanData } from '../utils/paymentStatus';

export function useLoans() {
  const { data, loading, error, refetch } = useQuery(GET_LOANS_QUERY, {
    errorPolicy: 'all',
  });

  const loans: LoanData[] = useMemo(
    () =>
      (data?.loans || [])
        .filter((loan): loan is LoanData => loan !== null)
        .map((loan) => ({
          ...loan,
          loanPayments: loan.loanPayments?.filter((p): p is NonNullable<typeof p> => p !== null) || [],
        })),
    [data]
  );

  return {
    loans,
    loading,
    error,
    refetch,
  };
}

