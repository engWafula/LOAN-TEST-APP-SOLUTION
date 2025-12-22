import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GET_LOANS_QUERY } from '../graphql/queries';
import { categorizeLoanPayments, LoanData } from '../utils/paymentStatus';

export function useLoans() {
  const { data, loading, error, refetch } = useQuery(GET_LOANS_QUERY, {
    variables: { page: 1, pageSize: 0 },
    errorPolicy: 'all',
  });

  const loans: LoanData[] = useMemo(
    () =>
      (data?.loans?.loans || [])
        .filter((loan): loan is LoanData => loan !== null)
        .map((loan) => ({
          ...loan,
          loanPayments: loan.loanPayments || [],
        })),
    [data]
  );

  const categorizedPayments = useMemo(() => categorizeLoanPayments(loans), [loans]);

  const uniqueLoans = useMemo(
    () =>
      loans.reduce((acc, loan) => {
        if (!acc.find((l) => l.id === loan.id)) {
          acc.push(loan);
        }
        return acc;
      }, [] as LoanData[]),
    [loans]
  );

  return {
    loans,
    categorizedPayments,
    uniqueLoans,
    loading,
    error,
    refetch,
  };
}

