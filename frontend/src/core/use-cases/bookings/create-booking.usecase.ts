import { BookingEntity, BookingStatus } from '../../domain/entities/booking.entity';
import { IBookingRepository } from '../../interfaces/repositories/booking.repository.interface';

export interface CreateBookingDTO {
  customerId: string;
  rentalUnitId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}

export class CreateBookingUseCase {
  constructor(private bookingRepo: IBookingRepository) {}

  async execute(dto: CreateBookingDTO): Promise<BookingEntity> {
    const booking = new BookingEntity({
      customerId: dto.customerId,
      rentalUnitId: dto.rentalUnitId,
      startDate: dto.startDate,
      endDate: dto.endDate,
      totalAmount: dto.totalAmount,
      status: 'PENDING',
    });

    return await this.bookingRepo.save(booking);
  }
}
