'use client';

import { BookingRecord } from '@/server/use-cases/bookings/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';

interface BookingCardProps {
  booking: BookingRecord;
  onStatusChange: (id: string, status: string) => Promise<unknown>;
}

export function BookingCard({ booking, onStatusChange }: BookingCardProps) {
  return (
    <Card className="border-slate-200 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 text-xs uppercase">Booking ID:</span>
            <span className="font-mono text-slate-900 font-bold">{booking.id}</span>
          </div>
          <div>
            <span className="font-medium text-slate-500">Customer:</span>{' '}
            <span className="font-semibold text-slate-900">{booking.customerName ?? booking.customerId}</span>
          </div>
          <div>
            <span className="font-medium text-slate-500">Rental Unit:</span>{' '}
            <span className="font-semibold text-slate-900">{booking.rentalUnitName ?? booking.rentalUnitId}</span>
          </div>
          <div>
            <span className="font-medium text-slate-500">Period:</span>{' '}
            <span className="text-slate-800 font-medium">
              {new Date(booking.startDate).toLocaleDateString()} &rarr; {new Date(booking.endDate).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-slate-500">Total Amount:</span>{' '}
            <span className="font-bold text-emerald-600">₹{booking.totalAmount}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 min-w-[140px]">
          <Badge status={booking.status} className="self-start">
            {booking.status}
          </Badge>
          <Select
            value={booking.status}
            onChange={(event) => onStatusChange(booking.id, event.target.value)}
            className="text-xs"
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="CANCELLED">CANCELLED</option>
          </Select>
        </div>
      </div>
    </Card>
  );
}
