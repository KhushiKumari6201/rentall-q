import useSWR from 'swr';
import { BusinessRecord, CreateBusinessInput } from '@/server/repositories/businessRepository';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data as BusinessRecord[];
};

export function useCompanies() {
  const { data, isLoading, error, mutate } = useSWR('/api/businesses', fetcher);

  const companies = Array.isArray(data) ? data : [];

  const createCompany = async (input: CreateBusinessInput) => {
    const response = await fetch('/api/businesses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const payload = await response.json();
    if (!response.ok) {
      throw new Error(payload.error || 'Unable to create company');
    }
    await mutate();
    return payload as BusinessRecord;
  };

  return {
    companies,
    loading: isLoading,
    error,
    createCompany,
    refresh: mutate,
  };
}
