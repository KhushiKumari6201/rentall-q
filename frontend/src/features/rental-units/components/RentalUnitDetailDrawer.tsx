'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building, Calendar, DollarSign, User, ShieldCheck, History, Tag } from 'lucide-react';
import { RentalUnitRecord } from '@/server/use-cases/rental-units/types';
import { Badge } from '@/components/ui/Badge';

interface RentalUnitDetailDrawerProps {
  unit: RentalUnitRecord | null;
  onClose: () => void;
}

export function RentalUnitDetailDrawer({ unit, onClose }: RentalUnitDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'booking' | 'history'>('specs');

  if (!unit) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-navy-950/50 backdrop-blur-xs flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-white min-h-full shadow-2xl flex flex-col justify-between border-l border-stone-200"
        >
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-start justify-between bg-cream-50/70">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge status={unit.status} />
                <span className="text-[11px] font-semibold text-stone-400">ID: {unit.id.substring(0, 8)}</span>
              </div>
              <h2 className="text-xl font-bold text-navy-900 font-serif">{unit.name}</h2>
              <p className="text-xs text-stone-500">{unit.type}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-navy-900 hover:bg-cream-200 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-stone-200 text-xs font-bold text-stone-500 bg-cream-50 px-6 pt-2">
            {[
              { id: 'specs', label: 'Unit Specs' },
              { id: 'booking', label: 'Current Tenant' },
              { id: 'history', label: 'Audit History' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 border-b-2 font-semibold transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-navy-900 font-bold'
                    : 'border-transparent text-stone-500 hover:text-navy-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="p-6 flex-1 overflow-y-auto space-y-5 text-xs text-navy-900">
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="space-y-3 rounded-2xl border border-stone-200 p-4 bg-cream-50/40">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                    <span className="text-stone-500 font-semibold">Category / Type:</span>
                    <span className="font-bold text-navy-900">{unit.type}</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                    <span className="text-stone-500 font-semibold">Daily Rate:</span>
                    <span className="font-bold text-emerald-700">₹{unit.basePrice} / day</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                    <span className="text-stone-500 font-semibold">Monthly Equivalent:</span>
                    <span className="font-bold text-navy-900">₹{(unit.basePrice * 30).toLocaleString()} / month</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-500 font-semibold">Zone / Floor:</span>
                    <span className="font-bold text-navy-900">Ground Floor &bull; Zone A</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 p-4 space-y-1">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Description</div>
                  <p className="text-stone-600 leading-relaxed">
                    {unit.description || 'Standard climate-controlled unit suitable for storage, warehouse bay, or equipment hosting.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'booking' && (
              <div className="space-y-4">
                {unit.status === 'OCCUPIED' ? (
                  <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sky-900 font-serif font-bold text-sm">
                      <User className="h-4 w-4 text-sky-700" />
                      <span>Current Active Tenant</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-stone-600">
                      <div className="flex justify-between">
                        <span>Tenant Name:</span>
                        <span className="font-semibold text-navy-900">Sarah Lin</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lease Period:</span>
                        <span className="font-semibold text-navy-900">Jan 01, 2026 - Dec 31, 2026</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Rate:</span>
                        <span className="font-bold text-navy-900">₹{(unit.basePrice * 30).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 text-center space-y-2">
                    <ShieldCheck className="h-6 w-6 text-emerald-600 mx-auto" />
                    <div className="font-bold text-navy-900">Unit is Currently Available</div>
                    <p className="text-stone-500">Ready for instant lease assignment or guest booking.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-3">
                <div className="rounded-xl border border-stone-200 p-3 bg-cream-50/70 space-y-1">
                  <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                    <span>Status Changed to OCCUPIED</span>
                    <span>Aug 01, 2026</span>
                  </div>
                  <p className="text-stone-700 font-medium">Assigned lease to Sarah Lin (₹20,000/mo).</p>
                </div>
                <div className="rounded-xl border border-stone-200 p-3 bg-cream-50/70 space-y-1">
                  <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                    <span>Inspection Completed</span>
                    <span>Jul 15, 2026</span>
                  </div>
                  <p className="text-stone-700 font-medium">Turnaround clean and lock verification.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-stone-100 bg-cream-50/50">
            <button
              onClick={onClose}
              className="w-full rounded-xl border border-stone-300 bg-white py-2.5 text-xs font-bold text-navy-900 hover:bg-cream-100 transition"
            >
              Close Drawer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
