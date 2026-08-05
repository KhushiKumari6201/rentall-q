'use client';

import React, { useState } from 'react';
import { X, UserPlus, Home, Calendar, CheckCircle2 } from 'lucide-react';

export type ActionType = 'CUSTOMER' | 'UNIT' | 'BOOKING' | null;

interface QuickActionsModalProps {
  actionType: ActionType;
  onClose: () => void;
  onSuccess: (message: string) => void;
}

export function QuickActionsModal({ actionType, onClose, onSuccess }: QuickActionsModalProps) {
  // Add Customer State
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');

  // Add Unit State
  const [unitNumber, setUnitNumber] = useState('');
  const [unitType, setUnitType] = useState('Storage Unit (10x10)');
  const [unitRate, setUnitRate] = useState('16200');

  // New Booking State
  const [bookingClient, setBookingClient] = useState('');
  const [bookingUnit, setBookingUnit] = useState('');
  const [bookingTerm, setBookingTerm] = useState('12 Months');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!actionType) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      let successMsg = '';
      if (actionType === 'CUSTOMER') successMsg = `Customer "${custName || 'New Client'}" created successfully.`;
      if (actionType === 'UNIT') successMsg = `Rental Unit "${unitNumber || 'Unit-X'}" added to inventory.`;
      if (actionType === 'BOOKING') successMsg = `Booking created for "${bookingClient || 'Client'}" on ${bookingUnit || 'Unit'}.`;

      onSuccess(successMsg);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-stone-200 font-sans space-y-5 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-100 text-amber-900">
              {actionType === 'CUSTOMER' && <UserPlus className="h-4 w-4" />}
              {actionType === 'UNIT' && <Home className="h-4 w-4" />}
              {actionType === 'BOOKING' && <Calendar className="h-4 w-4" />}
            </div>
            <h3 className="text-lg font-bold text-navy-900 font-serif">
              {actionType === 'CUSTOMER' && 'Add New Client Profile'}
              {actionType === 'UNIT' && 'Add Rental Unit to Portfolio'}
              {actionType === 'BOOKING' && 'Create New Rental Booking'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {actionType === 'CUSTOMER' && (
            <>
              <div>
                <label className="block font-semibold text-navy-900 mb-1">Full Name / Business Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Logistics India"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={custEmail}
                    onChange={(e) => setCustEmail(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {actionType === 'UNIT' && (
            <>
              <div>
                <label className="block font-semibold text-navy-900 mb-1">Unit / Bay ID *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Storage Bay B-104"
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Category Type</label>
                  <select
                    value={unitType}
                    onChange={(e) => setUnitType(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Storage Unit (10x10)">Storage Unit (10x10)</option>
                    <option value="Warehouse Bay (Large)">Warehouse Bay (Large)</option>
                    <option value="Commercial Locker">Commercial Locker</option>
                    <option value="EV Parking Slot">EV Parking Slot</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Monthly Rate (₹) *</label>
                  <input
                    type="number"
                    required
                    value={unitRate}
                    onChange={(e) => setUnitRate(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </>
          )}

          {actionType === 'BOOKING' && (
            <>
              <div>
                <label className="block font-semibold text-navy-900 mb-1">Select Client *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter client name or business"
                  value={bookingClient}
                  onChange={(e) => setBookingClient(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Target Unit *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Unit B-12"
                    value={bookingUnit}
                    onChange={(e) => setBookingUnit(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-navy-900 mb-1">Lease Tenure</label>
                  <select
                    value={bookingTerm}
                    onChange={(e) => setBookingTerm(e.target.value)}
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-navy-900 focus:border-amber-500 focus:outline-none"
                  >
                    <option value="6 Months">6 Months</option>
                    <option value="12 Months">12 Months</option>
                    <option value="24 Months">24 Months</option>
                    <option value="Month-to-Month">Month-to-Month</option>
                  </select>
                </div>
              </div>
            </>
          )}

          <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-stone-200 px-4 py-2 font-semibold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-xl bg-navy-900 px-5 py-2 font-bold text-white shadow-md hover:bg-navy-800 transition cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 text-amber-400" />
                  <span>Submit &amp; Save</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
