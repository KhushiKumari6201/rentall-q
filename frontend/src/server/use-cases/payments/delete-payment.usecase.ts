import { PaymentRepository } from '@/server/repositories/paymentRepository';

export class DeletePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(id: string): Promise<boolean> {
    if (!id) {
      throw new Error('Payment ID is required');
    }
    return this.paymentRepository.delete(id);
  }
}
