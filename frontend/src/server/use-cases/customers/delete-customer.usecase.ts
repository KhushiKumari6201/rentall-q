import { CustomerRepository } from '@/server/repositories/customerRepository';

export class DeleteCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<boolean> {
    if (!id) {
      throw new Error('Customer ID is required');
    }
    return this.customerRepository.delete(id);
  }
}
