import { PaymentRepository } from '@/server/repositories/paymentRepository';
import { PaymentRecord } from './types';

export class GetPaymentByIdUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(id: string): Promise<PaymentRecord | null> {
    if (!id) {
      throw new Error('Payment ID is required');
    }
    return this.paymentRepository.findById(id);
  }
}
