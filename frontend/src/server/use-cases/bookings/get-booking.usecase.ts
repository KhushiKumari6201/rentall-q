import { PrismaBookingRepository } from '@/server/repositories/bookingRepository';
import { BookingRecord } from '@/server/use-cases/bookings/types';

export class GetBookingByIdUseCase {
  constructor(private readonly bookingRepository: PrismaBookingRepository) {}

  async execute(id: string): Promise<BookingRecord | null> {
    return this.bookingRepository.findById(id);
  }
}
