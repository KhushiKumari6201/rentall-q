import { NextResponse } from 'next/server';
import { BusinessRepository } from '@/server/repositories/businessRepository';

const businessRepository = new BusinessRepository();

export async function GET() {
  try {
    const businesses = await businessRepository.findAll();
    return NextResponse.json(businesses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch businesses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const business = await businessRepository.create({
      name: body.name,
      businessType: body.businessType || 'self_storage',
      ownerProfileId: body.ownerProfileId,
    });
    return NextResponse.json(business, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create business' }, { status: 400 });
  }
}
