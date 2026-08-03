export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'CASH' | 'STRIPE' | 'PAYPAL';

export interface PaymentRecord {
  id: string;
  bookingId: string;
  bookingCustomerName?: string;
  bookingUnitName?: string;
  amount: number;
  dueDate: Date;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: Date;
}

export interface CreatePaymentInput {
  bookingId: string;
  amount: number;
  dueDate: Date;
  method: PaymentMethod;
  status?: PaymentStatus;
}

export interface UpdatePaymentStatusInput {
  status: PaymentStatus;
}
