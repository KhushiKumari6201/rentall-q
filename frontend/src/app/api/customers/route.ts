import { NextResponse } from 'next/server';
import { ListCustomersUseCase } from '@/server/use-cases/customers/list-customers.usecase';
import { CreateCustomerUseCase } from '@/server/use-cases/customers/create-customer.usecase';
import { CustomerRepository } from '@/server/repositories/customerRepository';

const customerRepository = new CustomerRepository();

export async function GET() {
  try {
    const useCase = new ListCustomersUseCase(customerRepository);
    const customers = await useCase.execute();
    return NextResponse.json(customers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const customer = await useCase.execute({
      name: body.name,
      email: body.email,
      phone: body.phone,
      address: body.address,
      status: body.status,
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create customer' }, { status: 400 });
  }
}
