import { z } from 'zod';

export const paymentFormInputSchema = z.object({
  loan_id: z
    .string()
    .nonempty('Please select a loan')
    .refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num > 0;
    }, {
      message: 'Please select a valid loan',
    }),
  
  payment_date: z
    .string()
    .nonempty('Payment date is required')
    .refine((val) => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, {
      message: 'Please enter a valid date',
    }),
  
  amount: z
    .string()
    .nonempty('Amount is required')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, {
      message: 'Amount must be a positive number',
    }),
});

export const paymentFormSchema = paymentFormInputSchema.transform((data) => ({
  loan_id: parseInt(data.loan_id, 10),
  payment_date: data.payment_date,
  amount: parseFloat(data.amount),
}));

export type PaymentFormInput = z.input<typeof paymentFormInputSchema>;

export type PaymentFormData = z.output<typeof paymentFormSchema>;

