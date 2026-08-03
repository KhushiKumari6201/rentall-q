import { NextResponse } from 'next/server';
import { GetPaymentByIdUseCase } from '@/server/use-cases/payments/get-payment.usecase';
import { UpdatePaymentStatusUseCase } from '@/server/use-cases/payments/update-payment-status.usecase';
import { DeletePaymentUseCase } from '@/server/use-cases/payments/delete-payment.usecase';
import { PaymentRepository } from '@/server/repositories/paymentRepository';

const paymentRepository = new PaymentRepository();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const useCase = new GetPaymentByIdUseCase(paymentRepository);
    const payment = await useCase.execute(params.id);

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json(payment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch payment' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const useCase = new UpdatePaymentStatusUseCase(paymentRepository);
    const payment = await useCase.execute(params.id, body.status);
    return NextResponse.json(payment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update payment status' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const useCase = new DeletePaymentUseCase(paymentRepository);
    await useCase.execute(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete payment' }, { status: 400 });
  }
}
