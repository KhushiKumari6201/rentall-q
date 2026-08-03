import useSWR from 'swr';
import {
  PaymentRecord,
  CreatePaymentInput,
  PaymentStatus,
} from '@/server/use-cases/payments/types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data as PaymentRecord[];
};

export function usePayments() {
  const { data, isLoading, error, mutate } = useSWR('/api/payments', fetcher);

  const payments = Array.isArray(data) ? data : [];

  const createPayment = async (input: CreatePaymentInput) => {
    const response = await fetch('/api/payments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to create payment');
    }

    await mutate();
    return payload as PaymentRecord;
  };

  const updateStatus = async (id: string, status: PaymentStatus) => {
    const response = await fetch(`/api/payments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to update payment status');
    }

    await mutate();
    return payload as PaymentRecord;
  };

  const deletePayment = async (id: string) => {
    const response = await fetch(`/api/payments/${id}`, {
      method: 'DELETE',
    });

    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to delete payment');
    }

    await mutate();
    return payload;
  };

  return {
    payments,
    loading: isLoading,
    error,
    createPayment,
    updateStatus,
    deletePayment,
    refresh: mutate,
  };
}
