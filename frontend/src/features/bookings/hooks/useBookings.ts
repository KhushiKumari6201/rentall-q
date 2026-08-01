import useSWR from 'swr';
import { BookingRecord } from '@/server/use-cases/bookings/types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data as BookingRecord[];
};

export function useBookings() {
  const { data, isLoading, error, mutate } = useSWR('/api/bookings', fetcher);

  const bookings = Array.isArray(data) ? data : [];

  const createBooking = async (input: {
    customerId: string;
    rentalUnitId: string;
    startDate: Date;
    endDate: Date;
    totalAmount: number;
    status?: string;
  }) => {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to create booking');
    }

    await mutate();
    return payload as BookingRecord;
  };

  const updateStatus = async (id: string, status: string) => {
    const response = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to update booking');
    }

    await mutate();
    return payload as BookingRecord;
  };

  return {
    bookings,
    loading: isLoading,
    error,
    createBooking,
    updateStatus,
    refresh: mutate,
  };
}
