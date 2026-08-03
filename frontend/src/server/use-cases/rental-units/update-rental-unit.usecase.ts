import { RentalUnitRepository } from '@/server/repositories/rentalUnitRepository';
import { RentalUnitRecord, UpdateRentalUnitInput } from './types';

export class UpdateRentalUnitUseCase {
  constructor(private readonly rentalUnitRepository: RentalUnitRepository) {}

  async execute(id: string, input: UpdateRentalUnitInput): Promise<RentalUnitRecord> {
    if (!id) {
      throw new Error('Rental unit ID is required');
    }

    const payload: UpdateRentalUnitInput = {};
    if (input.name !== undefined) payload.name = input.name.trim();
    if (input.type !== undefined) payload.type = input.type.trim();
    if (input.description !== undefined) payload.description = input.description.trim();
    if (input.basePrice !== undefined) {
      if (!Number.isFinite(input.basePrice) || input.basePrice < 0) {
        throw new Error('basePrice must be a non-negative number');
      }
      payload.basePrice = input.basePrice;
    }
    if (input.status !== undefined) payload.status = input.status;

    return this.rentalUnitRepository.update(id, payload);
  }
}
