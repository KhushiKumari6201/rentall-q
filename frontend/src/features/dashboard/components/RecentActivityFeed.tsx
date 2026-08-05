'use client';

import React, { useState } from 'react';
import { Calendar, CreditCard, UserCheck, BrainCircuit, Activity, Search } from 'lucide-react';

export interface ActivityItem {
  id: string;
  type: 'BOOKING' | 'PAYMENT' | 'STAFF_ACTION' | 'AI_ACTION';
  title: string;
  description: string;
  actor: string;
  role: string;
  timestamp: string;
  amount?: string;
  badgeColor: string;
}

const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'PAYMENT',
    title: 'Payment Received & Verified',
    description: 'Received ₹16,200 via UPI for Storage Unit B12',
    actor: 'Sarah Lin',
    role: 'Client',
    timestamp: '12 mins ago',
    amount: '₹16,200',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    id: 'act-2',
    type: 'BOOKING',
    title: 'New Rental Agreement Signed',
    description: 'Leased Commercial Locker #104 for 12 months',
    actor: 'Marcus Vance',
    role: 'Client',
    timestamp: '45 mins ago',
    amount: '₹14,500/mo',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
  },
  {
    id: 'act-3',
    type: 'STAFF_ACTION',
    title: 'Staff Unit Inspection Logged',
    description: 'Completed turnover inspection for Locker #15',
    actor: 'David Miller',
    role: 'Staff',
    timestamp: '2 hours ago',
    badgeColor: 'bg-stone-100 text-stone-800 border-stone-300',
  },
  {
    id: 'act-4',
    type: 'AI_ACTION',
    title: 'AI Dynamic Price Optimization Applied',
    description: 'Automated 12% price bump applied to Zone C vacant bays',
    actor: 'Pricing Agent',
    role: 'AI System',
    timestamp: '3 hours ago',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
  },
  {
    id: 'act-5',
    type: 'PAYMENT',
    title: 'Overdue Notice Dispatched',
    description: 'Automated WhatsApp payment reminder sent to Apex Logistics',
    actor: 'Risk Agent',
    role: 'AI System',
    timestamp: '4 hours ago',
    amount: '₹2,50,000',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  {
    id: 'act-6',
    type: 'STAFF_ACTION',
    title: 'Manager Role Permission Updated',
    description: 'Granted full reporting export rights to Alex Turner',
    actor: 'You (Owner)',
    role: 'Owner',
    timestamp: '5 hours ago',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
];

export function RecentActivityFeed() {
  const [filter, setFilter] = useState<'ALL' | 'BOOKING' | 'PAYMENT' | 'STAFF_ACTION'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activities] = useState<ActivityItem[]>(initialActivities);

  const filteredActivities = activities.filter((act) => {
    const matchesFilter = filter === 'ALL' || act.type === filter;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.actor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'BOOKING':
        return <Calendar className="h-4 w-4 text-sky-700" />;
      case 'PAYMENT':
        return <CreditCard className="h-4 w-4 text-emerald-700" />;
      case 'STAFF_ACTION':
        return <UserCheck className="h-4 w-4 text-stone-700" />;
      case 'AI_ACTION':
        return <BrainCircuit className="h-4 w-4 text-amber-700" />;
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900 text-white">
              <Activity className="h-4 w-4 text-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-navy-900 font-serif">Recent Activity Audit Feed</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time audit log of customer bookings, payments, staff actions &amp; AI triggers.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-cream-50/50 pl-9 pr-3 py-1.5 text-xs text-navy-900 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
            filter === 'ALL'
              ? 'bg-navy-900 text-white shadow-2xs'
              : 'bg-cream-50 text-stone-600 hover:bg-cream-100 hover:text-navy-900'
          }`}
        >
          All Events ({activities.length})
        </button>
        <button
          onClick={() => setFilter('BOOKING')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
            filter === 'BOOKING'
              ? 'bg-sky-700 text-white shadow-2xs'
              : 'bg-cream-50 text-stone-600 hover:bg-cream-100 hover:text-navy-900'
          }`}
        >
          Bookings
        </button>
        <button
          onClick={() => setFilter('PAYMENT')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
            filter === 'PAYMENT'
              ? 'bg-emerald-700 text-white shadow-2xs'
              : 'bg-cream-50 text-stone-600 hover:bg-cream-100 hover:text-navy-900'
          }`}
        >
          Payments
        </button>
        <button
          onClick={() => setFilter('STAFF_ACTION')}
          className={`px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer ${
            filter === 'STAFF_ACTION'
              ? 'bg-purple-700 text-white shadow-2xs'
              : 'bg-cream-50 text-stone-600 hover:bg-cream-100 hover:text-navy-900'
          }`}
        >
          Staff &amp; System Actions
        </button>
      </div>

      {/* Activity Feed List */}
      <div className="space-y-3">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-cream-50/60 border border-stone-200/70 hover:border-amber-300/80 transition space-y-2 sm:space-y-0"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white border border-stone-200 shadow-2xs">
                {getIcon(act.type)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-navy-900">{act.title}</span>
                  <span className={`px-2 py-0.5 rounded-md border text-[10px] font-bold ${act.badgeColor}`}>
                    {act.actor} ({act.role})
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">{act.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
              {act.amount && (
                <span className="text-xs font-bold text-navy-900 font-serif bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                  {act.amount}
                </span>
              )}
              <span className="text-[11px] text-stone-400 font-medium whitespace-nowrap">{act.timestamp}</span>
            </div>
          </div>
        ))}

        {filteredActivities.length === 0 && (
          <div className="p-8 text-center text-xs text-stone-500 rounded-xl border border-dashed border-stone-300">
            No activity events matched your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
