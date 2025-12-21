import { describe, it, expect } from 'vitest';
import {
  categorizePayment,
  categorizeLoanPayments,
  type LoanData,
} from '../paymentStatus';

describe('categorizePayment', () => {
  it('should return "Unpaid" when paymentDate is null', () => {
    expect(categorizePayment('2025-03-01', null)).toBe('Unpaid');
  });

  it('should return "On Time" when payment is within 5 days of due date', () => {
    expect(categorizePayment('2025-03-01', '2025-03-01')).toBe('On Time');
    expect(categorizePayment('2025-03-01', '2025-03-03')).toBe('On Time');
    expect(categorizePayment('2025-03-01', '2025-03-05')).toBe('On Time');
    expect(categorizePayment('2025-03-01', '2025-03-06')).toBe('On Time');
    expect(categorizePayment('2025-03-01', '2025-03-07')).toBe('Late');
  });

  it('should return "Late" when payment is 6-30 days after due date', () => {
    expect(categorizePayment('2025-03-01', '2025-03-07')).toBe('Late');
    expect(categorizePayment('2025-03-01', '2025-03-15')).toBe('Late');
    expect(categorizePayment('2025-03-01', '2025-03-31')).toBe('Late');
    expect(categorizePayment('2025-03-01', '2025-04-01')).toBe('Defaulted');
  });

  it('should return "Defaulted" when payment is more than 30 days late', () => {
    expect(categorizePayment('2025-03-01', '2025-04-02')).toBe('Defaulted');
    expect(categorizePayment('2025-03-01', '2025-05-01')).toBe('Defaulted');
  });

  it('should handle payments before due date correctly', () => {
    expect(categorizePayment('2025-03-01', '2025-02-28')).toBe('On Time');
    expect(categorizePayment('2025-03-01', '2025-02-25')).toBe('On Time');
  });
});

describe('categorizeLoanPayments', () => {
  const mockLoans: LoanData[] = [
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
      loanPayments: [],
    },
  ];

  it('should categorize loans with payments correctly', () => {
    const result = categorizeLoanPayments(mockLoans);

    expect(result).toHaveLength(3);
    expect(result[0].status).toBe('On Time');
    expect(result[1].status).toBe('Late');
    expect(result[2].status).toBe('Unpaid');
  });

  it('should handle loans with no payments', () => {
    const loansWithoutPayments: LoanData[] = [
      {
        id: 1,
        name: 'Test Loan',
        interestRate: 5.0,
        principal: 10000,
        dueDate: '2025-03-01',
        loanPayments: [],
      },
    ];

    const result = categorizeLoanPayments(loansWithoutPayments);

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('Unpaid');
    expect(result[0].paymentDate).toBeNull();
  });

  it('should handle loans with null loanPayments', () => {
    const loansWithNull: LoanData[] = [
      {
        id: 1,
        name: 'Test Loan',
        interestRate: 5.0,
        principal: 10000,
        dueDate: '2025-03-01',
        loanPayments: null,
      },
    ];

    const result = categorizeLoanPayments(loansWithNull);

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('Unpaid');
  });

  it('should handle loans with multiple payments', () => {
    const loanWithMultiplePayments: LoanData[] = [
      {
        id: 1,
        name: 'Test Loan',
        interestRate: 5.0,
        principal: 10000,
        dueDate: '2025-03-01',
        loanPayments: [
          {
            id: 1,
            loanId: 1,
            paymentDate: '2025-03-04',
          },
          {
            id: 2,
            loanId: 1,
            paymentDate: '2025-03-20',
          },
        ],
      },
    ];

    const result = categorizeLoanPayments(loanWithMultiplePayments);

    expect(result).toHaveLength(2);
    expect(result[0].status).toBe('On Time');
    expect(result[1].status).toBe('Late');
  });

  it('should filter out null payments', () => {
    const loansWithNullPayments: LoanData[] = [
      {
        id: 1,
        name: 'Test Loan',
        interestRate: 5.0,
        principal: 10000,
        dueDate: '2025-03-01',
        loanPayments: [
          {
            id: 1,
            loanId: 1,
            paymentDate: '2025-03-04',
          },
          null,
        ],
      },
    ];

    const result = categorizeLoanPayments(loansWithNullPayments);

    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('On Time');
  });
});

