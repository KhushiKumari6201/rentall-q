'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, CreditCard, MessageSquare, Plus, CheckCircle2, Clock } from 'lucide-react';
import { CustomerRecord } from '@/server/use-cases/customers/types';
import { Badge } from '@/components/ui/Badge';

interface CustomerDetailDrawerProps {
  customer: CustomerRecord | null;
  onClose: () => void;
}

export function CustomerDetailDrawer({ customer, onClose }: CustomerDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings' | 'payments' | 'notes'>('profile');
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState([
    { id: '1', date: '2026-08-01', text: 'Confirmed lease extension for Storage Locker #102.' },
    { id: '2', date: '2026-07-15', text: 'Sent automated invoice reminder via WhatsApp.' },
  ]);

  if (!customer) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now().toString(), date: '2026-08-04', text: newNote.trim() }, ...notes]);
    setNewNote('');
  };

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
                <Badge status={customer.status} />
                <span className="text-[11px] font-semibold text-stone-400">ID: {customer.id.substring(0, 8)}</span>
              </div>
              <h2 className="text-xl font-bold text-navy-900 font-serif">{customer.name}</h2>
              <p className="text-xs text-stone-500">{customer.email}</p>
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
              { id: 'profile', label: 'Profile' },
              { id: 'bookings', label: 'Bookings' },
              { id: 'payments', label: 'Payments' },
              { id: 'notes', label: 'Comm Log' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2.5 border-b-2 font-semibold transition-colors cursor-pointer ${
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
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="space-y-3 rounded-2xl border border-stone-200 p-4 bg-cream-50/40">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-stone-400" />
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-semibold">Email Address</div>
                      <div className="font-semibold text-navy-900">{customer.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-stone-400" />
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-semibold">Phone Number</div>
                      <div className="font-semibold text-navy-900">{customer.phone || '—'}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-stone-400" />
                    <div>
                      <div className="text-[10px] text-stone-400 uppercase font-semibold">Address</div>
                      <div className="font-semibold text-navy-900">{customer.address || 'San Francisco, CA'}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-stone-200 p-4 space-y-1">
                  <div className="text-[10px] text-stone-400 uppercase font-semibold">Customer Notes</div>
                  <p className="text-stone-600 leading-relaxed">
                    {customer.notes || 'No special notes logged for this customer profile.'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-3">
                <div className="rounded-2xl border border-stone-200 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900">Storage Unit 102</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      ACTIVE
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Lease Term:</span>
                    <span className="font-semibold text-navy-900">Jan 01, 2026 - Dec 31, 2026</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Monthly Rate:</span>
                    <span className="font-bold text-navy-900">₹20,000 / mo</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-3">
                <div className="rounded-2xl border border-stone-200 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy-900">Invoice #INV-2026-08</span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                      PAID
                    </span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Amount Paid:</span>
                    <span className="font-bold text-navy-900">₹20,000</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Payment Date:</span>
                    <span>Aug 01, 2026</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="space-y-4">
                <form onSubmit={handleAddNote} className="space-y-2">
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Log a call, message, or interaction..."
                    className="w-full rounded-xl border border-stone-300 p-2.5 text-xs text-navy-900 focus:border-amber-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-navy-900 py-2 text-xs font-bold text-white shadow-xs hover:bg-navy-800 transition"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Communication Note</span>
                  </button>
                </form>

                <div className="space-y-3.5 pt-2">
                  {notes.map((n) => (
                    <div key={n.id} className="rounded-xl border border-stone-200 bg-cream-50/70 p-3 space-y-1">
                      <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                        <span>Staff Note</span>
                        <span>{n.date}</span>
                      </div>
                      <p className="text-stone-700 font-medium">{n.text}</p>
                    </div>
                  ))}
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
