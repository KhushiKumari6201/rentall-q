import { CustomerRepository } from '@/server/repositories/customerRepository';
import { CustomerRecord, UpdateCustomerInput } from './types';

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string, input: UpdateCustomerInput): Promise<CustomerRecord> {
    if (!id) {
      throw new Error('Customer ID is required');
    }

    const payload: UpdateCustomerInput = {};
    if (input.name !== undefined) payload.name = input.name.trim();
    if (input.email !== undefined) payload.email = input.email.trim().toLowerCase();
    if (input.phone !== undefined) payload.phone = input.phone.trim();
    if (input.address !== undefined) payload.address = input.address.trim();
    if (input.status !== undefined) payload.status = input.status;

    return this.customerRepository.update(id, payload);
  }
}
