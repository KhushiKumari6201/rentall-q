import { PaymentRepository } from '@/server/repositories/paymentRepository';
import { PaymentRecord } from './types';

export class ListPaymentsUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(): Promise<PaymentRecord[]> {
    return this.paymentRepository.findAll();
  }
}
