'use client';

import { useState } from 'react';
import { BookingCard } from '@/features/bookings/components/BookingCard';
import { useBookings } from '@/features/bookings/hooks/useBookings';

interface BookingListProps {
  refreshKey?: number;
}

export function BookingList({ refreshKey = 0 }: BookingListProps) {
  const { bookings, loading, error, updateStatus, refresh } = useBookings();
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const selectedBooking = bookings.find((booking) => booking.id === selectedBookingId) ?? null;

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4 text-slate-100">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="m-0 text-xl font-semibold">Bookings</h2>
        <button
          type="button"
          onClick={() => refresh()}
          className="rounded bg-slate-800 px-3 py-2 text-sm hover:bg-slate-700"
        >
          Refresh
        </button>
      </div>

      {loading ? <p>Loading...</p> : null}
      {error ? <p className="text-rose-300">{error.message}</p> : null}
      {!loading && bookings.length === 0 ? <p>No bookings found yet.</p> : null}

      {!loading && bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-3 py-2">Customer</th>
                <th className="px-3 py-2">Rental Unit</th>
                <th className="px-3 py-2">Start</th>
                <th className="px-3 py-2">End</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-slate-800 hover:bg-slate-900/70">
                  <td className="px-3 py-2">
                    <button type="button" onClick={() => setSelectedBookingId(booking.id)} className="text-left text-sky-300">
                      {booking.customerName ?? booking.customerId}
                    </button>
                  </td>
                  <td className="px-3 py-2">{booking.rentalUnitName ?? booking.rentalUnitId}</td>
                  <td className="px-3 py-2">{new Date(booking.startDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{new Date(booking.endDate).toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <select
                      value={booking.status}
                      onChange={(event) => updateStatus(booking.id, event.target.value)}
                      className="rounded border border-slate-600 bg-slate-950 px-2 py-1 text-xs"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                  <td className="px-3 py-2">${booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {selectedBooking ? (
        <div className="mt-4">
          <BookingCard booking={selectedBooking} onStatusChange={updateStatus} />
        </div>
      ) : null}
    </section>
  );
}
