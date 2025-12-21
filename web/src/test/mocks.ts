import { GET_LOANS_QUERY } from '../graphql/queries';

export const mockLoansData = {
  loans: {
    loans: [
      {
        id: 1,
        name: "Tom's Loan",
        interestRate: 5.0,
        principal: 10000,
        dueDate: '2025-03-01',
        loanPayments: [
          {
            id: 1,
            loanId: 1,
            paymentDate: '2025-03-04',
          },
        ],
      },
      {
        id: 2,
        name: "Chris Wailaka",
        interestRate: 3.5,
        principal: 500000,
        dueDate: '2025-03-01',
        loanPayments: [
          {
            id: 2,
            loanId: 2,
            paymentDate: '2025-03-15',
          },
        ],
      },
      {
        id: 3,
        name: "NP Mobile Money",
        interestRate: 4.5,
        principal: 30000,
        dueDate: '2025-03-01',
        loanPayments: [
          {
            id: 3,
            loanId: 3,
            paymentDate: '2025-04-05',
          },
        ],
      },
      {
        id: 4,
        name: "Esther's Autoparts",
        interestRate: 1.5,
        principal: 40000,
        dueDate: '2025-03-01',
        loanPayments: [],
      },
    ],
    pagination: {
      page: 1,
      pageSize: 4,
      total: 4,
      totalPages: 1,
      hasNext: false,
      hasPrev: false,
    },
  },
};

export const mockLoansQuery = {
  request: {
    query: GET_LOANS_QUERY,
    variables: { page: 1, pageSize: 0 },
  },
  result: {
    data: mockLoansData,
  },
};

export const mockLoansQueryError = {
  request: {
    query: GET_LOANS_QUERY,
    variables: { page: 1, pageSize: 0 },
  },
  error: new Error('Network error'),
};

