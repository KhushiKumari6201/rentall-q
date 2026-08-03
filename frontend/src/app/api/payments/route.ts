import { NextResponse } from 'next/server';
import { ListPaymentsUseCase } from '@/server/use-cases/payments/list-payments.usecase';
import { CreatePaymentUseCase } from '@/server/use-cases/payments/create-payment.usecase';
import { PaymentRepository } from '@/server/repositories/paymentRepository';

const paymentRepository = new PaymentRepository();

export async function GET() {
  try {
    const useCase = new ListPaymentsUseCase(paymentRepository);
    const payments = await useCase.execute();
    return NextResponse.json(payments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch payments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const useCase = new CreatePaymentUseCase(paymentRepository);

    const payment = await useCase.execute({
      bookingId: body.bookingId,
      amount: Number(body.amount ?? 0),
      dueDate: new Date(body.dueDate),
      method: body.method,
      status: body.status,
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create payment' }, { status: 400 });
  }
}
