import useSWR from 'swr';
import { CustomerRecord, CreateCustomerInput, UpdateCustomerInput } from '@/server/use-cases/customers/types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data as CustomerRecord[];
};

export function useCustomers() {
  const { data, isLoading, error, mutate } = useSWR('/api/customers', fetcher);

  const customers = Array.isArray(data) ? data : [];

  const createCustomer = async (input: CreateCustomerInput) => {
    const response = await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to create customer');
    }

    await mutate();
    return payload as CustomerRecord;
  };

  const updateCustomer = async (id: string, input: UpdateCustomerInput) => {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to update customer');
    }

    await mutate();
    return payload as CustomerRecord;
  };

  const deleteCustomer = async (id: string) => {
    const response = await fetch(`/api/customers/${id}`, {
      method: 'DELETE',
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to delete customer');
    }

    await mutate();
    return payload;
  };

  return {
    customers,
    loading: isLoading,
    error,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    refresh: mutate,
  };
}
