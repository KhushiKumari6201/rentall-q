import { PrismaBookingRepository } from '@/server/repositories/bookingRepository';
import { BookingRecord, BookingStatus } from '@/server/use-cases/bookings/types';

export class UpdateBookingStatusUseCase {
  constructor(private readonly bookingRepository: PrismaBookingRepository) {}

  async execute(id: string, status: BookingStatus): Promise<BookingRecord> {
    const allowed: BookingStatus[] = ['PENDING', 'CONFIRMED', 'ACTIVE', 'COMPLETED', 'CANCELLED'];
    if (!allowed.includes(status)) {
      throw new Error('Unsupported booking status');
    }

    return this.bookingRepository.updateStatus(id, status);
  }
}
