import { NextResponse } from 'next/server';
import { GetBookingByIdUseCase } from '@/server/use-cases/bookings/get-booking.usecase';
import { UpdateBookingStatusUseCase } from '@/server/use-cases/bookings/update-booking-status.usecase';
import { PrismaBookingRepository } from '@/server/repositories/bookingRepository';

const bookingRepository = new PrismaBookingRepository();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const useCase = new GetBookingByIdUseCase(bookingRepository);
    const booking = await useCase.execute(params.id);

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json(booking);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch booking' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const useCase = new UpdateBookingStatusUseCase(bookingRepository);
    const booking = await useCase.execute(params.id, body.status);
    return NextResponse.json(booking);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update booking' }, { status: 400 });
  }
}
