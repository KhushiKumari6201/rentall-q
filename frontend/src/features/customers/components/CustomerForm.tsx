'use client';

import { FormEvent, useState } from 'react';
import { useCustomers } from '@/features/customers/hooks/useCustomers';
import { CustomerRecord, CustomerStatus } from '@/server/use-cases/customers/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

interface CustomerFormProps {
  initialCustomer?: CustomerRecord | null;
  onSuccess?: () => void;
  onClose?: () => void;
}

export function CustomerForm({ initialCustomer, onSuccess, onClose }: CustomerFormProps) {
  const { createCustomer, updateCustomer } = useCustomers();
  const isEditing = Boolean(initialCustomer);

  const [name, setName] = useState(initialCustomer?.name || '');
  const [email, setEmail] = useState(initialCustomer?.email || '');
  const [phone, setPhone] = useState(initialCustomer?.phone || '');
  const [address, setAddress] = useState(initialCustomer?.address || '');
  const [status, setStatus] = useState<CustomerStatus>(initialCustomer?.status || 'ACTIVE');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditing && initialCustomer) {
        await updateCustomer(initialCustomer.id, {
          name,
          email,
          phone,
          address,
          status,
        });
      } else {
        await createCustomer({
          name,
          email,
          phone,
          address,
          status,
        });
      }

      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving customer');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-slate-200 shadow-xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-slate-100">
        <CardTitle>{isEditing ? 'Edit Customer' : 'Create New Customer'}</CardTitle>
        {onClose ? (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        ) : null}
      </CardHeader>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2 pt-4">
        <Input
          label="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
        />

        <Input
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
        />

        <Input
          label="Phone Number"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 000-0000"
        />

        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as CustomerStatus)}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="INACTIVE">INACTIVE</option>
          <option value="LEAD">LEAD</option>
        </Select>

        <div className="w-full space-y-1.5 md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700">Address</label>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, Suite 400..."
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
            {isEditing ? 'Update Customer' : 'Create Customer'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
