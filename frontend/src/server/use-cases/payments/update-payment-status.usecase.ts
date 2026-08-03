import { PaymentRepository } from '@/server/repositories/paymentRepository';
import { PaymentRecord, PaymentStatus } from './types';

export class UpdatePaymentStatusUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(id: string, status: PaymentStatus): Promise<PaymentRecord> {
    if (!id) {
      throw new Error('Payment ID is required');
    }
    if (!status) {
      throw new Error('Payment status is required');
    }
    return this.paymentRepository.updateStatus(id, status);
  }
}
