import { CustomerRepository } from '@/server/repositories/customerRepository';
import { CustomerRecord } from './types';

export class ListCustomersUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(): Promise<CustomerRecord[]> {
    return this.customerRepository.findAll();
  }
}
