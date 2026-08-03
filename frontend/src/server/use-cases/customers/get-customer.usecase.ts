import { CustomerRepository } from '@/server/repositories/customerRepository';
import { CustomerRecord } from './types';

export class GetCustomerByIdUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<CustomerRecord | null> {
    if (!id) {
      throw new Error('Customer ID is required');
    }
    return this.customerRepository.findById(id);
  }
}
