import useSWR from 'swr';
import {
  RentalUnitRecord,
  CreateRentalUnitInput,
  UpdateRentalUnitInput,
} from '@/server/use-cases/rental-units/types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data as RentalUnitRecord[];
};

export function useRentalUnits() {
  const { data, isLoading, error, mutate } = useSWR('/api/rental-units', fetcher);

  const rentalUnits = Array.isArray(data) ? data : [];

  const createRentalUnit = async (input: CreateRentalUnitInput) => {
    const response = await fetch('/api/rental-units', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to create rental unit');
    }

    await mutate();
    return payload as RentalUnitRecord;
  };

  const updateRentalUnit = async (id: string, input: UpdateRentalUnitInput) => {
    const response = await fetch(`/api/rental-units/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to update rental unit');
    }

    await mutate();
    return payload as RentalUnitRecord;
  };

  const deleteRentalUnit = async (id: string) => {
    const response = await fetch(`/api/rental-units/${id}`, {
      method: 'DELETE',
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to delete rental unit');
    }

    await mutate();
    return payload;
  };

  return {
    rentalUnits,
    loading: isLoading,
    error,
    createRentalUnit,
    updateRentalUnit,
    deleteRentalUnit,
    refresh: mutate,
  };
}
