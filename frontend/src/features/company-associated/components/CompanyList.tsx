'use client';

import { useState } from 'react';
import { useCompanies } from '@/features/company-associated/hooks/useCompanies';
import { CompanyForm } from '@/features/company-associated/components/CompanyForm';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Input } from '@/components/ui/Input';
import {
  Building2,
  RefreshCw,
  Plus,
  Search,
  Warehouse,
  HardHat,
  Car,
  BedDouble,
  Package,
  Calendar,
} from 'lucide-react';

const BUSINESS_TYPE_META: Record<
  string,
  { label: string; icon: React.ElementType; color: string }
> = {
  self_storage: {
    label: 'Self Storage',
    icon: Package,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  warehouse: {
    label: 'Warehouse',
    icon: Warehouse,
    color: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  hostel: {
    label: 'Hostel',
    icon: BedDouble,
    color: 'bg-violet-50 text-violet-700 border-violet-200',
  },
  parking: {
    label: 'Parking',
    icon: Car,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  equipment: {
    label: 'Equipment',
    icon: HardHat,
    color: 'bg-rose-50 text-rose-700 border-rose-200',
  },
};

function BusinessTypePill({ type }: { type: string }) {
  const meta = BUSINESS_TYPE_META[type] ?? {
    label: type,
    icon: Building2,
    color: 'bg-stone-50 text-stone-600 border-stone-200',
  };
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${meta.color}`}
    >
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
}

export function CompanyList() {
  const { companies, loading, error, refresh } = useCompanies();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.businessType && c.businessType.toLowerCase().includes(search.toLowerCase()))
  );

  // Stats
  const byType = companies.reduce<Record<string, number>>((acc, c) => {
    acc[c.businessType] = (acc[c.businessType] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="space-y-6 text-navy-900 font-sans">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-navy-900 px-8 py-6 text-white shadow-lg">
        {/* Decorative circle */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-amber-500/10" />
        <div className="pointer-events-none absolute -bottom-8 right-20 h-32 w-32 rounded-full bg-white/5" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/20 shadow-inner">
              <Building2 className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif">Companies Associated</h2>
              <p className="text-sm text-navy-300 mt-0.5">
                {companies.length} {companies.length === 1 ? 'company' : 'companies'} registered on the platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refresh()}
              className="border-white/20 text-white bg-white/10 hover:bg-white/20"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Refresh
            </Button>
            <Button
              size="sm"
              onClick={() => setShowForm(true)}
              className="bg-amber-500 text-navy-900 font-bold hover:bg-amber-400 border-0"
            >
              <Plus className="h-4 w-4" />
              Add Company
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      {companies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(BUSINESS_TYPE_META).map(([type, meta]) => {
            const Icon = meta.icon;
            const count = byType[type] || 0;
            return (
              <div
                key={type}
                className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-4 py-3 shadow-xs"
              >
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${meta.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-lg font-bold text-navy-900 leading-none">{count}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5 font-medium">{meta.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex items-center gap-4 rounded-2xl border border-stone-200/80 bg-cream-50/60 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-stone-400" />
          <Input
            type="text"
            placeholder="Search companies by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 text-xs rounded-xl"
          />
        </div>
        <span className="text-xs font-medium text-stone-500 whitespace-nowrap">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Add Company Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg">
            <CompanyForm
              onSuccess={() => {
                setShowForm(false);
                refresh();
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="py-16 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-stone-500 font-medium">
            <RefreshCw className="h-4 w-4 animate-spin" />
            Loading companies...
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-700">
          {error.message}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white p-16 text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-100 mx-auto">
            <Building2 className="h-8 w-8 text-stone-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-navy-900 font-serif">
              {search ? 'No companies match your search.' : 'No companies registered yet.'}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              {search
                ? 'Try a different search term.'
                : 'Click "Add Company" to register the first one.'}
            </p>
          </div>
          {!search && (
            <Button
              size="sm"
              onClick={() => setShowForm(true)}
              className="mx-auto bg-navy-900 text-white font-semibold"
            >
              <Plus className="h-4 w-4" />
              Add First Company
            </Button>
          )}
        </div>
      )}

      {/* Company Table */}
      {!loading && filtered.length > 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-cream-50/70 border-stone-200">
                <TableHead className="font-bold text-navy-900">Company Name</TableHead>
                <TableHead className="font-bold text-navy-900">Business Type</TableHead>
                <TableHead className="font-bold text-navy-900">Company ID</TableHead>
                <TableHead className="font-bold text-navy-900">Registered</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((company, idx) => (
                <TableRow
                  key={company.id}
                  className="hover:bg-cream-50/50 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy-900 shadow-sm flex-shrink-0">
                        <span className="text-xs font-bold text-white">
                          {company.name.slice(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-navy-900 text-sm font-serif">{company.name}</p>
                        <p className="text-[10px] text-stone-400 font-mono">#{idx + 1}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <BusinessTypePill type={company.businessType} />
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-[11px] text-stone-500 bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-md">
                      {company.id.slice(0, 8)}…
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <Calendar className="h-3.5 w-3.5 text-stone-400" />
                      {company.createdAt
                        ? new Date(company.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '—'}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="px-6 py-3 border-t border-stone-100 bg-cream-50/40 text-[11px] text-stone-500 font-medium flex items-center justify-between">
            <span>Total: {filtered.length} {filtered.length === 1 ? 'company' : 'companies'}</span>
            <span>RentallQ Platform</span>
          </div>
        </div>
      )}
    </section>
  );
}
