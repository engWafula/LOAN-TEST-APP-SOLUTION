import { gql } from '../__generated__';

export const GET_LOANS_QUERY = gql(`
  query GetLoans($page: Int, $pageSize: Int) {
    loans(page: $page, pageSize: $pageSize) {
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
      pagination {
        page
        pageSize
        total
        totalPages
        hasNext
        hasPrev
      }
    }
  }
`);
