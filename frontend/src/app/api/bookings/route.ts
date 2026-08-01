import { NextResponse } from 'next/server';
import { ListBookingsUseCase } from '@/server/use-cases/bookings/list-bookings.usecase';
import { CreateBookingUseCase } from '@/server/use-cases/bookings/create-booking.usecase';
import { PrismaBookingRepository } from '@/server/repositories/bookingRepository';

const bookingRepository = new PrismaBookingRepository();

export async function GET() {
  try {
    const useCase = new ListBookingsUseCase(bookingRepository);
    const bookings = await useCase.execute();
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to load bookings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const useCase = new CreateBookingUseCase(bookingRepository);

    const booking = await useCase.execute({
      customerId: body.customerId,
      rentalUnitId: body.rentalUnitId,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      totalAmount: Number(body.totalAmount ?? 0),
      status: body.status,
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create booking' }, { status: 400 });
  }
}
