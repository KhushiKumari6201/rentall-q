import { BookingRecord } from '@/server/use-cases/bookings/types';

interface BookingCardProps {
  booking: BookingRecord;
  onStatusChange: (id: string, status: string) => Promise<unknown>;
}

export function BookingCard({ booking, onStatusChange }: BookingCardProps) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900/50 p-4 text-sm text-slate-100 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1">
          <div><span className="font-semibold text-slate-300">Booking:</span> {booking.id}</div>
          <div><span className="font-semibold text-slate-300">Customer:</span> {booking.customerName ?? booking.customerId}</div>
          <div><span className="font-semibold text-slate-300">Rental unit:</span> {booking.rentalUnitName ?? booking.rentalUnitId}</div>
          <div><span className="font-semibold text-slate-300">Period:</span> {new Date(booking.startDate).toLocaleDateString()} → {new Date(booking.endDate).toLocaleDateString()}</div>
          <div><span className="font-semibold text-slate-300">Total:</span> ${booking.totalAmount}</div>
        </div>

        <div className="grid gap-2">
          <span className="rounded bg-slate-800 px-2 py-1 text-xs font-medium uppercase tracking-wide text-sky-300">{booking.status}</span>
          <select
            value={booking.status}
            onChange={(event) => onStatusChange(booking.id, event.target.value)}
            className="rounded border border-slate-600 bg-slate-950 px-2 py-1 text-sm text-slate-100"
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>
    </article>
  );
}
