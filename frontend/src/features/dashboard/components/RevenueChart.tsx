'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

interface FinancialItem {
  period: string;
  revenue: number;
  expenses: number;
  target: number;
}

const monthlyData: FinancialItem[] = [
  { period: 'Mar', revenue: 34200, expenses: 12100, target: 32000 },
  { period: 'Apr', revenue: 36800, expenses: 13400, target: 35000 },
  { period: 'May', revenue: 38500, expenses: 12900, target: 37000 },
  { period: 'Jun', revenue: 41200, expenses: 14100, target: 40000 },
  { period: 'Jul', revenue: 39900, expenses: 13800, target: 41000 },
  { period: 'Aug', revenue: 42850, expenses: 14500, target: 42000 },
];

const quarterlyData: FinancialItem[] = [
  { period: 'Q3 2025', revenue: 98500, expenses: 35200, target: 95000 },
  { period: 'Q4 2025', revenue: 108200, expenses: 38400, target: 102000 },
  { period: 'Q1 2026', revenue: 114500, expenses: 39800, target: 110000 },
  { period: 'Q2 2026', revenue: 123950, expenses: 42400, target: 118000 },
];

export function RevenueChart() {
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'monthly' | 'quarterly'>('monthly');
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentData = viewMode === 'monthly' ? monthlyData : quarterlyData;
  const totalRevenue = currentData.reduce((acc, item) => acc + item.revenue, 0);
  const totalExpenses = currentData.reduce((acc, item) => acc + item.expenses, 0);
  const netIncome = totalRevenue - totalExpenses;

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h2 className="text-lg font-bold text-navy-900 font-serif">Financial Revenue Analytics</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            {viewMode === 'monthly' ? 'Monthly revenue trend vs. operational expenses' : 'Quarterly financial performance & target alignment'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Monthly / Quarterly Toggle */}
          <div className="inline-flex rounded-xl bg-stone-100 p-1 text-xs font-semibold">
            <button
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'monthly' ? 'bg-white text-navy-900 shadow-2xs font-bold' : 'text-stone-500 hover:text-navy-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setViewMode('quarterly')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                viewMode === 'quarterly' ? 'bg-white text-navy-900 shadow-2xs font-bold' : 'text-stone-500 hover:text-navy-900'
              }`}
            >
              Quarterly
            </button>
          </div>

          {/* Chart Type Selector */}
          <button
            onClick={() => setChartType((prev) => (prev === 'area' ? 'bar' : 'area'))}
            className="px-3 py-1.5 rounded-xl border border-stone-200 bg-cream-50 text-xs font-semibold text-navy-800 hover:bg-cream-100 transition cursor-pointer"
          >
            {chartType === 'area' ? 'Bar View' : 'Area View'}
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-3.5 rounded-xl bg-cream-50 border border-stone-200/70">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Total Revenue ({viewMode === 'monthly' ? '6 Mo' : '4 Qtrs'})</div>
          <div className="text-xl font-bold text-navy-900 font-serif mt-1">₹{totalRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-0.5">
            <ArrowUpRight className="h-3 w-3" /> +12.4% vs target
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-cream-50 border border-stone-200/70">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Operational Expenses</div>
          <div className="text-xl font-bold text-rose-900 font-serif mt-1">₹{totalExpenses.toLocaleString()}</div>
          <div className="text-[10px] text-stone-500 font-medium mt-0.5">
            {((totalExpenses / totalRevenue) * 100).toFixed(1)}% of total revenue
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200">
          <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Net Cashflow</div>
          <div className="text-xl font-bold text-emerald-950 font-serif mt-1">₹{netIncome.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">Healthy margin profit</div>
        </div>
      </div>

      {/* Chart Visualization */}
      <div className="h-72 w-full pt-2">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16261E" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16261E" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E11D48" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#E11D48" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4D5" />
                <XAxis dataKey="period" stroke="#78716C" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#78716C"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value || 0).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#16261E', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none' }}
                  itemStyle={{ color: '#FCD34D' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue (₹)" stroke="#16261E" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="expenses" name="Expenses (₹)" stroke="#E11D48" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            ) : (
              <BarChart data={currentData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4D5" />
                <XAxis dataKey="period" stroke="#78716C" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#78716C"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value: any) => [`₹${Number(value || 0).toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#16261E', borderRadius: '12px', color: '#fff', fontSize: '12px', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" name="Revenue (₹)" fill="#16261E" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses (₹)" fill="#E11D48" radius={[6, 6, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-cream-50 rounded-xl">
            <span className="text-xs text-stone-400">Loading chart analytics...</span>
          </div>
        )}
      </div>
    </div>
  );
}
