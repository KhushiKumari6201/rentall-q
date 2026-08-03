'use client';

import { Card } from '@/components/ui/Card';
import { CreditCard, CheckCircle2, Clock } from 'lucide-react';

export default function ClientPaymentsPage() {
  return (
    <div className="space-y-6 text-navy-900">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-navy-900 font-serif">
          My Payments &amp; Invoices
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Review payment history, upcoming invoices, and receipts.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900">Storage Locker #102 — March Rent</h3>
                <p className="text-xs text-stone-500">Paid on Mar 01, 2026 &bull; Credit Card</p>
              </div>
            </div>
            <span className="text-sm font-bold text-navy-900">₹20,000.00</span>
          </div>
        </Card>

        <Card className="border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-900">Parking Bay #4B — April Rent</h3>
                <p className="text-xs text-amber-600 font-medium">Due on Apr 01, 2026</p>
              </div>
            </div>
            <span className="text-sm font-bold text-navy-900">₹9,600.00</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
