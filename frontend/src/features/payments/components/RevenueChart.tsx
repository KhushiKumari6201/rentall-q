'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { TrendingUp, IndianRupee } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

const monthlyRevenueData = [
  { month: 'Mar', revenue: 284000, pending: 21000 },
  { month: 'Apr', revenue: 312000, pending: 18000 },
  { month: 'May', revenue: 345000, pending: 32000 },
  { month: 'Jun', revenue: 389000, pending: 24000 },
  { month: 'Jul', revenue: 412000, pending: 19000 },
  { month: 'Aug', revenue: 428500, pending: 34000 },
];

export function RevenueChart() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-4 font-sans text-navy-900">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-emerald-600" />
            <h3 className="text-lg font-bold text-navy-900 font-serif">Revenue Collection Trends</h3>
          </div>
          <p className="text-xs text-stone-500">Monthly lease collections &amp; pending balance tracking</p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 inline-block" />
            <span>Collections (₹4,28,500)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block" />
            <span>Pending (₹34,000)</span>
          </div>
        </div>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E7E5E4" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#78716C' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: '#16261E', borderRadius: '12px', color: '#FFF', fontSize: '12px', border: 'none' }}
              itemStyle={{ color: '#F3F1E7' }}
              formatter={(val: any) => [`₹${Number(val).toLocaleString()}`, 'Amount']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              isAnimationActive={!shouldReduceMotion}
            />
            <Area
              type="monotone"
              dataKey="pending"
              stroke="#F59E0B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPending)"
              isAnimationActive={!shouldReduceMotion}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
