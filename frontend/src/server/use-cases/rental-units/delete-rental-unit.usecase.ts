import { RentalUnitRepository } from '@/server/repositories/rentalUnitRepository';

export class DeleteRentalUnitUseCase {
  constructor(private readonly rentalUnitRepository: RentalUnitRepository) {}

  async execute(id: string): Promise<boolean> {
    if (!id) {
      throw new Error('Rental unit ID is required');
    }
    return this.rentalUnitRepository.delete(id);
  }
}
