'use client';

import { FormEvent, useState } from 'react';
import { useRentalUnits } from '@/features/rental-units/hooks/useRentalUnits';
import { RentalUnitRecord, RentalUnitStatus } from '@/server/use-cases/rental-units/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

interface RentalUnitFormProps {
  initialUnit?: RentalUnitRecord | null;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function RentalUnitForm({ initialUnit, onSuccess, onClose }: RentalUnitFormProps) {
  const { createRentalUnit, updateRentalUnit } = useRentalUnits();
  const isEditing = Boolean(initialUnit);

  const [name, setName] = useState(initialUnit?.name || '');
  const [type, setType] = useState(initialUnit?.type || 'Apartment');
  const [description, setDescription] = useState(initialUnit?.description || '');
  const [basePrice, setBasePrice] = useState(initialUnit?.basePrice ? String(initialUnit.basePrice) : '100');
  const [status, setStatus] = useState<RentalUnitStatus>(initialUnit?.status || 'AVAILABLE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const parsedPrice = Number(basePrice);
      if (isNaN(parsedPrice) || parsedPrice < 0) {
        throw new Error('Base price must be a valid positive number');
      }

      if (isEditing && initialUnit) {
        await updateRentalUnit(initialUnit.id, {
          name,
          type,
          description,
          basePrice: parsedPrice,
          status,
        });
      } else {
        await createRentalUnit({
          name,
          type,
          description,
          basePrice: parsedPrice,
          status,
        });
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving rental unit');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-slate-200 shadow-xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100">
        <CardTitle>{isEditing ? 'Edit Rental Unit' : 'Create Rental Unit'}</CardTitle>
        {onClose ? (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        ) : null}
      </CardHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 pt-4">
        <Input
          label="Unit Name / Title"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sunset Villa Suite 101"
        />

        <Select
          label="Unit Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Villa">Villa</option>
          <option value="Studio">Studio</option>
          <option value="Commercial">Commercial</option>
          <option value="Equipment">Equipment</option>
        </Select>

        <Input
          label="Base Price (₹ / day)"
          type="number"
          min="0"
          step="0.01"
          required
          value={basePrice}
          onChange={(e) => setBasePrice(e.target.value)}
          placeholder="150"
        />

        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as RentalUnitStatus)}
        >
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="OCCUPIED">OCCUPIED</option>
          <option value="MAINTENANCE">MAINTENANCE</option>
          <option value="UNAVAILABLE">UNAVAILABLE</option>
        </Select>

        <div className="w-full space-y-1.5 md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="2 bedroom luxury unit with ocean view..."
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

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
          <Button type="submit" loading={loading}>
            {isEditing ? 'Update Rental Unit' : 'Create Rental Unit'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
