'use client';

import { CompanyList } from '@/features/company-associated/components/CompanyList';

export default function CompanyAssociatedPage() {
  return (
    <main className="space-y-6 text-slate-900">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Companies Associated</h1>
        <p className="text-sm text-slate-500">
          View and manage all companies registered on the RentallQ platform
        </p>
      </header>

      <CompanyList />
    </main>
  );
}
