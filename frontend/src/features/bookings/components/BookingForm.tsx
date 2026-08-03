'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useBookings } from '@/features/bookings/hooks/useBookings';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

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
    <Card className="border-slate-200 shadow-xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100">
        <CardTitle>Create New Booking</CardTitle>
        {onClose ? (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        ) : null}
      </CardHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 pt-4">
        <Select
          label="Customer"
          value={customerId}
          onChange={(event) => setCustomerId(event.target.value)}
          required
        >
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name} ({customer.email})
            </option>
          ))}
        </Select>

        <Select
          label="Rental Unit"
          value={rentalUnitId}
          onChange={(event) => setRentalUnitId(event.target.value)}
          required
        >
          {rentalUnits.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.name} (₹{unit.basePrice}/day)
            </option>
          ))}
        </Select>

        <Input
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />

        <Input
          label="End Date"
          type="date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          required
        />

        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="ACTIVE">ACTIVE</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELLED">CANCELLED</option>
        </Select>

        <Input
          label="Calculated Total (₹)"
          value={`₹${totalAmount}`}
          readOnly
          className="bg-slate-50 font-semibold text-emerald-700"
        />

        {error ? (
          <p className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700 md:col-span-2 font-medium">
            {error}
          </p>
        ) : null}

        <div className="flex gap-3 md:col-span-2 justify-end pt-2 border-t border-slate-100 mt-2">
          {onClose ? (
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
          ) : null}
          <Button type="submit" loading={loading} disabled={!customerId || !rentalUnitId}>
            Create Booking
          </Button>
        </div>
      </form>
    </Card>
  );
}
