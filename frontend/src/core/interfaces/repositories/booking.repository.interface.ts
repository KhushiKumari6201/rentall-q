import { BookingEntity } from '../../domain/entities/booking.entity';
import { IBaseRepository } from './base.repository.interface';

export interface IBookingRepository extends IBaseRepository<BookingEntity> {
  findByCustomer(customerId: string): Promise<BookingEntity[]>;
  findByUnit(rentalUnitId: string): Promise<BookingEntity[]>;
}
