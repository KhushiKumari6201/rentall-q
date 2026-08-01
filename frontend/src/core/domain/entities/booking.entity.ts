import { InvalidBookingDateException } from '../exceptions/domain.exception';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface BookingProps {
  id?: string;
  customerId: string;
  rentalUnitId: string;
  startDate: Date;
  endDate: Date;
  totalAmount?: number;
  status?: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class BookingEntity {
  public readonly id?: string;
  public readonly customerId: string;
  public readonly rentalUnitId: string;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public totalAmount: number;
  public status: BookingStatus;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  constructor(props: BookingProps) {
    this.id = props.id;
    this.customerId = props.customerId;
    this.rentalUnitId = props.rentalUnitId;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.status = props.status || 'PENDING';
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;

    this.validateDates();
    this.totalAmount = props.totalAmount !== undefined ? props.totalAmount : this.calculateTotalAmount();
  }

  public validateDates(): void {
    if (this.endDate.getTime() <= this.startDate.getTime()) {
      throw new InvalidBookingDateException('End date must be strictly after start date.');
    }
  }

  public calculateTotalAmount(): number {
    this.validateDates();
    return Number(this.totalAmount || 0);
  }

  public cancel(): void {
    this.status = 'CANCELLED';
  }

  public confirm(): void {
    this.status = 'CONFIRMED';
  }
}
