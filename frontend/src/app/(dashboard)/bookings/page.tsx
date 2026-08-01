'use client';

import { useState } from 'react';
import { BookingForm } from '@/features/bookings/components/BookingForm';
import { BookingList } from '@/features/bookings/components/BookingList';

export default function BookingsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="grid gap-6 text-slate-100">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="m-0 text-2xl font-bold text-white">Rental Business Bookings</h1>
          <p className="m-0 text-sm text-slate-400">
            Create, view, and manage customer rental bookings
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-500"
        >
          New booking
        </button>
      </header>

      {showForm ? (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/80 p-6 backdrop-blur-sm">
          <div className="w-full max-w-3xl">
            <BookingForm
              onSuccess={() => {
                setRefreshKey((prev) => prev + 1);
                setShowForm(false);
              }}
              onClose={() => setShowForm(false)}
            />
          </div>
        </div>
      ) : null}

      <BookingList refreshKey={refreshKey} />
    </main>
  );
}
