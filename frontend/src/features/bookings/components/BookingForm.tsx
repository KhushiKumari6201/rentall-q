'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useBookings } from '@/features/bookings/hooks/useBookings';

interface CustomerOption {
  id: string;
  name: string;
  email: string;
}

interface RentalUnitOption {
  id: string;
  name: string;
  basePrice: number;
  status: string;
}

interface BookingFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export function BookingForm({ onSuccess, onClose }: BookingFormProps) {
  const { createBooking } = useBookings();
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [rentalUnits, setRentalUnits] = useState<RentalUnitOption[]>([]);
  const [customerId, setCustomerId] = useState('');
  const [rentalUnitId, setRentalUnitId] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  const [status, setStatus] = useState('PENDING');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadOptions() {
      const [customerResponse, rentalUnitResponse] = await Promise.all([
        fetch('/api/customers'),
        fetch('/api/rental-units'),
      ]);

      const customerData = await customerResponse.json();
      const rentalUnitData = await rentalUnitResponse.json();

      setCustomers(Array.isArray(customerData) ? customerData : []);
      setRentalUnits(Array.isArray(rentalUnitData) ? rentalUnitData : []);
    }

    loadOptions().catch(() => {
      setError('Unable to load customer and rental unit options');
    });
  }, []);

  useEffect(() => {
    if (customers.length > 0 && !customerId) {
      setCustomerId(customers[0].id);
    }

    if (rentalUnits.length > 0 && !rentalUnitId) {
      setRentalUnitId(rentalUnits[0].id);
    }
  }, [customers, rentalUnits, customerId, rentalUnitId]);

  const selectedRentalUnit = rentalUnits.find((unit) => unit.id === rentalUnitId) ?? null;

  const totalAmount = useMemo(() => {
    if (!selectedRentalUnit || !startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000));
    return selectedRentalUnit.basePrice * differenceInDays;
  }, [selectedRentalUnit, startDate, endDate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createBooking({
        customerId,
        rentalUnitId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalAmount,
        status,
      });

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-950 p-4 text-slate-100">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="m-0 text-lg font-semibold">Create booking</h2>
        {onClose ? (
          <button type="button" onClick={onClose} className="rounded bg-slate-800 px-3 py-1 text-sm">
            Close
          </button>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
        <label className="grid gap-1 text-sm">
          <span className="text-slate-300">Customer</span>
          <select value={customerId} onChange={(event) => setCustomerId(event.target.value)} className="rounded border border-slate-600 bg-slate-900 px-3 py-2" required>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name} ({customer.email})
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-slate-300">Rental unit</span>
          <select value={rentalUnitId} onChange={(event) => setRentalUnitId(event.target.value)} className="rounded border border-slate-600 bg-slate-900 px-3 py-2" required>
            {rentalUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-slate-300">Start date</span>
          <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="rounded border border-slate-600 bg-slate-900 px-3 py-2" required />
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-slate-300">End date</span>
          <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="rounded border border-slate-600 bg-slate-900 px-3 py-2" required />
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-slate-300">Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded border border-slate-600 bg-slate-900 px-3 py-2">
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </label>

        <label className="grid gap-1 text-sm">
          <span className="text-slate-300">Estimated total</span>
          <input value={totalAmount} readOnly className="rounded border border-slate-600 bg-slate-900 px-3 py-2" />
        </label>

        {error ? <p className="text-rose-300 md:col-span-2">{error}</p> : null}

        <button type="submit" disabled={loading} className="rounded bg-sky-600 px-4 py-2 font-medium text-white hover:bg-sky-500 md:col-span-2">
          {loading ? 'Creating...' : 'Create booking'}
        </button>
      </form>
    </section>
  );
}
