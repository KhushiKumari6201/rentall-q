import { PrismaBookingRepository } from '@/server/repositories/bookingRepository';
import { BookingRecord } from '@/server/use-cases/bookings/types';

export class ListBookingsUseCase {
  constructor(private readonly bookingRepository: PrismaBookingRepository) {}

  async execute(): Promise<BookingRecord[]> {
    return this.bookingRepository.findAll();
  }
}
