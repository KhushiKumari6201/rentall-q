export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
export type PaymentMethod = 'CREDIT_CARD' | 'BANK_TRANSFER' | 'STRIPE' | 'PAYPAL';

export interface PaymentProps {
  id?: string;
  bookingId: string;
  amount: number;
  status?: PaymentStatus;
  method?: PaymentMethod;
  transactionId?: string | null;
  createdAt?: Date;
}

export class PaymentEntity {
  public readonly id?: string;
  public readonly bookingId: string;
  public readonly amount: number;
  public readonly status: PaymentStatus;
  public readonly method: PaymentMethod;
  public readonly transactionId?: string | null;
  public readonly createdAt?: Date;

  constructor(props: PaymentProps) {
    this.id = props.id;
    this.bookingId = props.bookingId;
    this.amount = props.amount;
    this.status = props.status || 'PENDING';
    this.method = props.method || 'CREDIT_CARD';
    this.transactionId = props.transactionId;
    this.createdAt = props.createdAt;
  }
}
