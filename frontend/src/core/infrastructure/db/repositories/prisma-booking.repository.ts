import { SupabaseClient } from '@supabase/supabase-js';
import { BookingEntity, BookingStatus } from '../../../domain/entities/booking.entity';
import { IBookingRepository } from '../../../interfaces/repositories/booking.repository.interface';
import { supabase as defaultSupabase } from '../../../../server/lib/supabaseClient';

export class PrismaBookingRepository implements IBookingRepository {
  private client: SupabaseClient;

  constructor(client: SupabaseClient = defaultSupabase) {
    this.client = client;
  }

  private toDomain(model: any): BookingEntity {
    return new BookingEntity({
      id: model.id,
      customerId: model.customer_id ?? model.customerId,
      rentalUnitId: model.rental_unit_id ?? model.rentalUnitId,
      startDate: new Date(model.start_date ?? model.startDate),
      endDate: new Date(model.end_date ?? model.endDate),
      totalAmount: Number(model.total_amount ?? model.totalAmount),
      status: model.status as BookingStatus,
      createdAt: new Date(model.created_at ?? model.createdAt),
      updatedAt: model.updated_at ? new Date(model.updated_at) : undefined,
    });
  }

  async findById(id: string): Promise<BookingEntity | null> {
    const { data, error } = await this.client
      .from('bookings')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data ? this.toDomain(data) : null;
  }

  async findAll(skip: number = 0, limit: number = 100): Promise<BookingEntity[]> {
    const { data, error } = await this.client
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1);

    if (error) throw error;
    return (data || []).map((r) => this.toDomain(r));
  }

  async save(entity: BookingEntity): Promise<BookingEntity> {
    const payload = {
      customer_id: entity.customerId,
      rental_unit_id: entity.rentalUnitId,
      start_date: entity.startDate.toISOString(),
      end_date: entity.endDate.toISOString(),
      total_amount: entity.totalAmount,
      status: entity.status,
    };

    if (entity.id) {
      const { data, error } = await this.client
        .from('bookings')
        .update(payload)
        .eq('id', entity.id)
        .select('*')
        .single();
      if (error) throw error;
      return this.toDomain(data);
    } else {
      const { data, error } = await this.client
        .from('bookings')
        .insert(payload)
        .select('*')
        .single();
      if (error) throw error;
      return this.toDomain(data);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const { error } = await this.client.from('bookings').delete().eq('id', id);
      return !error;
    } catch {
      return false;
    }
  }

  async findByCustomer(customerId: string): Promise<BookingEntity[]> {
    const { data, error } = await this.client
      .from('bookings')
      .select('*')
      .eq('customer_id', customerId);

    if (error) throw error;
    return (data || []).map((r) => this.toDomain(r));
  }

  async findByUnit(rentalUnitId: string): Promise<BookingEntity[]> {
    const { data, error } = await this.client
      .from('bookings')
      .select('*')
      .eq('rental_unit_id', rentalUnitId);

    if (error) throw error;
    return (data || []).map((r) => this.toDomain(r));
  }
}
