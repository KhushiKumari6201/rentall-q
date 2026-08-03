import { RentalUnitRepository } from '@/server/repositories/rentalUnitRepository';
import { RentalUnitRecord } from './types';

export class GetRentalUnitByIdUseCase {
  constructor(private readonly rentalUnitRepository: RentalUnitRepository) {}

  async execute(id: string): Promise<RentalUnitRecord | null> {
    if (!id) {
      throw new Error('Rental unit ID is required');
    }
    return this.rentalUnitRepository.findById(id);
  }
}
