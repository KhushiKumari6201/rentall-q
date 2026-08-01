import { PrismaBookingRepository } from '@/server/repositories/bookingRepository';
import { BookingRecord, CreateBookingInput } from '@/server/use-cases/bookings/types';

export class CreateBookingUseCase {
  constructor(private readonly bookingRepository: PrismaBookingRepository) {}

  async execute(input: CreateBookingInput): Promise<BookingRecord> {
    if (!input.customerId || !input.rentalUnitId) {
      throw new Error('customerId and rentalUnitId are required');
    }

    if (input.endDate.getTime() <= input.startDate.getTime()) {
      throw new Error('endDate must be after startDate');
    }

    if (!Number.isFinite(input.totalAmount) || input.totalAmount < 0) {
      throw new Error('totalAmount must be a valid non-negative number');
    }

    return this.bookingRepository.create({
      customerId: input.customerId,
      rentalUnitId: input.rentalUnitId,
      startDate: input.startDate,
      endDate: input.endDate,
      totalAmount: input.totalAmount,
      status: input.status ?? 'PENDING',
    });
  }
}
