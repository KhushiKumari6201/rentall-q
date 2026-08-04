'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { useCompanies } from '@/features/company-associated/hooks/useCompanies';
import { X, Building2 } from 'lucide-react';

interface CompanyFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const BUSINESS_TYPES = [
  { value: 'self_storage', label: 'Self Storage' },
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'hostel', label: 'Hostel' },
  { value: 'parking', label: 'Parking' },
  { value: 'equipment', label: 'Equipment' },
] as const;

export function CompanyForm({ onSuccess, onClose }: CompanyFormProps) {
  const { createCompany } = useCompanies();

  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState<string>('self_storage');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Company name is required.');
      return;
    }
    try {
      setSubmitting(true);
      setError(null);
      await createCompany({ name: name.trim(), businessType: businessType as any });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-navy-900 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
            <Building2 className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white font-serif">Register New Company</h2>
            <p className="text-[11px] text-navy-300">Add a company to the platform</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {error && (
          <div className="rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs text-rose-700 font-medium">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
            Company Name <span className="text-rose-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="e.g. Acme Storage Co."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl"
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-navy-900 uppercase tracking-wider">
            Business Type
          </label>
          <Select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className="rounded-xl"
          >
            {BUSINESS_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-stone-100">
          <Button
            type="submit"
            variant="primary"
            loading={submitting}
            className="flex-1 bg-navy-900 text-white font-semibold"
          >
            Register Company
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
