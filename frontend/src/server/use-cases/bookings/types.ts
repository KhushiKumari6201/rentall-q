export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface BookingRecord {
  id: string;
  customerId: string;
  customerName?: string;
  rentalUnitId: string;
  rentalUnitName?: string;
  startDate: Date;
  endDate: Date;
  status: BookingStatus;
  totalAmount: number;
  createdAt: Date;
}

export interface CreateBookingInput {
  customerId: string;
  rentalUnitId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status?: BookingStatus;
}
