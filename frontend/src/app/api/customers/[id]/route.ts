import { NextResponse } from 'next/server';
import { GetCustomerByIdUseCase } from '@/server/use-cases/customers/get-customer.usecase';
import { UpdateCustomerUseCase } from '@/server/use-cases/customers/update-customer.usecase';
import { DeleteCustomerUseCase } from '@/server/use-cases/customers/delete-customer.usecase';
import { CustomerRepository } from '@/server/repositories/customerRepository';

const customerRepository = new CustomerRepository();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const useCase = new GetCustomerByIdUseCase(customerRepository);
    const customer = await useCase.execute(params.id);

    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
    }

    return NextResponse.json(customer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch customer' }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const useCase = new UpdateCustomerUseCase(customerRepository);
    const customer = await useCase.execute(params.id, body);
    return NextResponse.json(customer);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update customer' }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const useCase = new DeleteCustomerUseCase(customerRepository);
    await useCase.execute(params.id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to delete customer' }, { status: 400 });
  }
}
