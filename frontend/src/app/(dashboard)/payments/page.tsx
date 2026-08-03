'use client';

import { useState } from 'react';
import { PaymentForm } from '@/features/payments/components/PaymentForm';
import { PaymentList } from '@/features/payments/components/PaymentList';
import { Button } from '@/components/ui/Button';
import { CreditCard } from 'lucide-react';

export default function PaymentsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="space-y-6 text-slate-900">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Payments</h1>
          <p className="text-sm text-slate-500">
            Track customer payments, due dates, billing methods, and transaction statuses
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <CreditCard className="h-4 w-4" />
          New Payment
        </Button>
      </header>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 p-6 backdrop-blur-xs overflow-y-auto">
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
