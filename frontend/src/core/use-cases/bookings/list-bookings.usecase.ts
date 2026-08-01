import { BookingEntity } from '../../domain/entities/booking.entity';
import { IBookingRepository } from '../../interfaces/repositories/booking.repository.interface';

export class ListBookingsUseCase {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(skip: number = 0, limit: number = 100): Promise<BookingEntity[]> {
    return await this.bookingRepo.findAll(skip, limit);
  }
}
