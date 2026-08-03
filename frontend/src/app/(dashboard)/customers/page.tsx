'use client';

import { useState } from 'react';
import { CustomerForm } from '@/features/customers/components/CustomerForm';
import { CustomerList } from '@/features/customers/components/CustomerList';
import { Button } from '@/components/ui/Button';
import { UserPlus } from 'lucide-react';

export default function CustomersPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="space-y-6 text-slate-900">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Customers</h1>
          <p className="text-sm text-slate-500">
            Manage customer profiles, contacts, and account statuses
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <UserPlus className="h-4 w-4" />
          New Customer
        </Button>
      </header>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 p-6 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl my-8">
            <CustomerForm
              onSuccess={() => {
                setRefreshKey((prev) => prev + 1);
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      ) : null}

      <CustomerList refreshKey={refreshKey} />
    </main>
  );
}
