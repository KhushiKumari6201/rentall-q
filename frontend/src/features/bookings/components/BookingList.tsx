'use client';

import { useState } from 'react';
import { BookingCard } from '@/features/bookings/components/BookingCard';
import { BookingStatusStepper } from '@/features/bookings/components/BookingStatusStepper';
import { NewBookingModal } from '@/features/bookings/components/NewBookingModal';
import { useBookings } from '@/features/bookings/hooks/useBookings';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { RefreshCw, Plus, Calendar as CalendarIcon, List } from 'lucide-react';

interface BookingListProps {
  refreshKey?: number;
}

export function BookingList({ refreshKey = 0 }: BookingListProps) {
  const { bookings, loading, error, updateStatus, refresh } = useBookings();
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'calendar'>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) ?? null;

  return (
    <section className="space-y-6 text-navy-900 font-sans">
      
      {/* Header & Controls Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-navy-900 font-serif">Rental Bookings &amp; Leases</h2>
          <p className="text-xs text-stone-500">Manage client reservations, active leases, and pipeline status</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* View Mode Switcher */}
          <div className="inline-flex rounded-xl border border-stone-200 bg-cream-50 p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-navy-900 shadow-xs font-bold' : 'text-stone-500 hover:text-navy-900'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                viewMode === 'calendar' ? 'bg-white text-navy-900 shadow-xs font-bold' : 'text-stone-500 hover:text-navy-900'
              }`}
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>Calendar View</span>
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="bg-navy-900 text-white font-semibold shadow-xs"
          >
            <Plus className="h-4 w-4 text-amber-400" />
            <span>New Booking Flow</span>
          </Button>

          <Button variant="outline" size="sm" onClick={() => refresh()}>
            <RefreshCw className="h-3.5 w-3.5 text-stone-500" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* New Booking 4-Step Modal */}
      <NewBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refresh();
        }}
      />

      {loading ? (
        <div className="py-12 text-center text-sm text-stone-500 font-medium">Loading bookings...</div>
      ) : null}

      {error ? (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-700">
          {error.message}
        </div>
      ) : null}

      {/* VIEW MODE 1: LIST VIEW TABLE WITH ANIMATED STATUS PIPELINE STEPPER */}
      {!loading && viewMode === 'table' && bookings.length > 0 && (
        <div className="rounded-2xl border border-stone-200 bg-white shadow-xs overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-cream-50/70 border-stone-200">
                <TableHead className="font-bold text-navy-900">Client / Tenant</TableHead>
                <TableHead className="font-bold text-navy-900">Rental Unit</TableHead>
                <TableHead className="font-bold text-navy-900">Lease Dates</TableHead>
                <TableHead className="font-bold text-navy-900">Total Commitment</TableHead>
                <TableHead className="font-bold text-navy-900">Pipeline Status</TableHead>
                <TableHead className="font-bold text-navy-900 text-right">Update Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-cream-50/50 transition-colors">
                  <TableCell className="font-semibold text-navy-900">
                    <button
                      type="button"
                      onClick={() => setSelectedBookingId(booking.id)}
                      className="text-left font-bold text-navy-900 hover:text-amber-700 transition cursor-pointer font-serif"
                    >
                      {booking.customerName ?? booking.customerId}
                    </button>
                  </TableCell>
                  <TableCell className="text-stone-600 text-xs font-medium">
                    {booking.rentalUnitName ?? booking.rentalUnitId}
                  </TableCell>
                  <TableCell className="text-stone-500 text-xs">
                    {new Date(booking.startDate).toLocaleDateString()} &rarr; {new Date(booking.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-bold text-emerald-700 text-xs">
                    ₹{booking.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <BookingStatusStepper status={booking.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={booking.status}
                      onChange={(event) => updateStatus(booking.id, event.target.value)}
                      className="py-1 text-xs font-semibold border-stone-200 rounded-lg bg-cream-50 inline-block w-32"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* VIEW MODE 2: CALENDAR VIEW */}
      {!loading && viewMode === 'calendar' && (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <h3 className="text-base font-bold text-navy-900 font-serif">August 2026 Lease Calendar</h3>
            <span className="text-xs text-stone-500 font-semibold">Gold: Active Leases • Green: Available</span>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-stone-400 pb-2">
            <div>MON</div><div>TUE</div><div>WED</div><div>THU</div><div>FRI</div><div>SAT</div><div>SUN</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const hasBooking = day >= 10 && day <= 25;

              return (
                <div
                  key={day}
                  className={`rounded-xl p-3 text-center border font-bold text-xs flex flex-col justify-between h-16 ${
                    hasBooking
                      ? 'bg-amber-500/20 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  <span className="text-left font-serif text-[11px]">{day}</span>
                  <span className="text-[10px] font-semibold">{hasBooking ? 'Sarah Lin (Locker 102)' : 'Open'}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selectedBooking ? (
        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-stone-700">Booking Summary</h3>
            <button
              type="button"
              onClick={() => setSelectedBookingId(null)}
              className="text-xs text-amber-700 hover:underline font-bold cursor-pointer"
            >
              Close details
            </button>
          </div>
          <BookingCard booking={selectedBooking} onStatusChange={updateStatus} />
        </div>
      ) : null}
    </section>
  );
}
