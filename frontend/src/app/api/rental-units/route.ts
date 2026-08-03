import { NextResponse } from 'next/server';
import { ListRentalUnitsUseCase } from '@/server/use-cases/rental-units/list-rental-units.usecase';
import { CreateRentalUnitUseCase } from '@/server/use-cases/rental-units/create-rental-unit.usecase';
import { RentalUnitRepository } from '@/server/repositories/rentalUnitRepository';

const rentalUnitRepository = new RentalUnitRepository();

export async function GET() {
  try {
    const useCase = new ListRentalUnitsUseCase(rentalUnitRepository);
    const units = await useCase.execute();
    return NextResponse.json(units);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch rental units' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const useCase = new CreateRentalUnitUseCase(rentalUnitRepository);

    const unit = await useCase.execute({
      name: body.name,
      type: body.type,
      description: body.description,
      basePrice: Number(body.basePrice ?? 0),
      status: body.status,
    });

    return NextResponse.json(unit, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create rental unit' }, { status: 400 });
  }
}
