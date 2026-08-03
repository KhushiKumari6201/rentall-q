'use client';

import { useState } from 'react';
import { PaymentForm } from '@/features/payments/components/PaymentForm';
import { PaymentList } from '@/features/payments/components/PaymentList';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';

export default function PaymentsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="space-y-6 text-navy-900">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900 font-serif">Payments</h1>
          <p className="text-sm text-stone-500">
            Track transactions, record incoming payments, and monitor overdue balances
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} variant="primary" className="bg-amber-500 text-navy-900 hover:bg-amber-400 font-semibold border-amber-500">
          <Plus className="h-4 w-4" />
          New Payment
        </Button>
      </header>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-navy-950/50 p-6 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl my-8">
            <PaymentForm
              onSuccess={() => {
                setRefreshKey((prev) => prev + 1);
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      ) : null}

      <PaymentList refreshKey={refreshKey} />
    </main>
  );
}
