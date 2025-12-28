import { gql } from '../__generated__';

export const GET_LOANS_QUERY = gql(`
  query GetLoans {
    loans {
      id
      name
      interestRate
      principal
      dueDate
      loanPayments {
        id
        loanId
        paymentDate
      }
    }
  }
`);
