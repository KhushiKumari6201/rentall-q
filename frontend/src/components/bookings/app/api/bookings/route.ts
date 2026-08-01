import { NextResponse } from 'next/server';
import { PrismaBookingRepository } from '@/core/infrastructure/db/repositories/prisma-booking.repository';
import { CreateBookingUseCase } from '@/core/use-cases/bookings/create-booking.usecase';
import { ListBookingsUseCase } from '@/core/use-cases/bookings/list-bookings.usecase';
import { DomainException } from '@/core/domain/exceptions/domain.exception';

const bookingRepo = new PrismaBookingRepository();

export async function GET() {
  try {
    const useCase = new ListBookingsUseCase(bookingRepo);
    const bookings = await useCase.execute();
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const useCase = new CreateBookingUseCase(bookingRepo);

    const booking = await useCase.execute({
      customerId: body.customerId,
      rentalUnitId: body.rentalUnitId,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate),
      totalAmount: Number(body.totalAmount),
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    if (error instanceof DomainException) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
