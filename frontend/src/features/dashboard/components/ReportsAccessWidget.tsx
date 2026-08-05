'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, Download, FileSpreadsheet, FileText, ArrowRight, TrendingUp, Calendar, Filter } from 'lucide-react';

interface ReportsAccessWidgetProps {
  onNotify: (msg: string) => void;
}

export function ReportsAccessWidget({ onNotify }: ReportsAccessWidgetProps) {
  const handleExport = (reportName: string, type: 'CSV' | 'PDF') => {
    onNotify(`Generated and exported ${reportName} in ${type} format.`);
  };

  return (
    <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-5 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy-900 text-white">
              <BarChart3 className="h-4 w-4 text-amber-400" />
            </div>
            <h2 className="text-lg font-bold text-navy-900 font-serif">Exportable Business &amp; Performance Reports</h2>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Download verified accounting, occupancy, and tenant retention reports for stakeholders.
          </p>
        </div>

        <Link
          href="/business/reports"
          className="inline-flex items-center gap-1 text-xs font-bold text-navy-900 hover:text-amber-700 transition"
        >
          <span>View Full Reports Suite</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 3 Main Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Report 1: Occupancy & Forecast */}
        <div className="p-4 rounded-xl bg-cream-50 border border-stone-200/80 space-y-3 flex flex-col justify-between hover:border-amber-300 transition">
          <div>
            <div className="flex justify-between items-center text-xs text-stone-500 font-semibold">
              <span className="uppercase tracking-wider">Occupancy Forecast</span>
              <Calendar className="h-4 w-4 text-sky-600" />
            </div>
            <div className="text-xl font-bold text-navy-900 font-serif mt-2">85.4% Rate</div>
            <p className="text-[11px] text-stone-500 mt-1">184 Occupied / 32 Available units</p>
          </div>

          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between gap-2">
            <button
              onClick={() => handleExport('Occupancy Forecast', 'CSV')}
              className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-white rounded-lg border border-stone-200 text-[11px] font-bold text-navy-900 hover:bg-amber-50 transition cursor-pointer"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-700" /> CSV
            </button>
            <button
              onClick={() => handleExport('Occupancy Forecast', 'PDF')}
              className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-white rounded-lg border border-stone-200 text-[11px] font-bold text-navy-900 hover:bg-amber-50 transition cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-rose-700" /> PDF
            </button>
          </div>
        </div>

        {/* Report 2: Financial Revenue Collections */}
        <div className="p-4 rounded-xl bg-cream-50 border border-stone-200/80 space-y-3 flex flex-col justify-between hover:border-amber-300 transition">
          <div>
            <div className="flex justify-between items-center text-xs text-stone-500 font-semibold">
              <span className="uppercase tracking-wider">Revenue Collections</span>
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="text-xl font-bold text-navy-900 font-serif mt-2">₹42,850.00 / mo</div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">+9.4% MoM Revenue Growth</p>
          </div>

          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between gap-2">
            <button
              onClick={() => handleExport('Revenue Collections', 'CSV')}
              className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-white rounded-lg border border-stone-200 text-[11px] font-bold text-navy-900 hover:bg-amber-50 transition cursor-pointer"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-700" /> CSV
            </button>
            <button
              onClick={() => handleExport('Revenue Collections', 'PDF')}
              className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-white rounded-lg border border-stone-200 text-[11px] font-bold text-navy-900 hover:bg-amber-50 transition cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-rose-700" /> PDF
            </button>
          </div>
        </div>

        {/* Report 3: Tenant Retention & Churn */}
        <div className="p-4 rounded-xl bg-cream-50 border border-stone-200/80 space-y-3 flex flex-col justify-between hover:border-amber-300 transition">
          <div>
            <div className="flex justify-between items-center text-xs text-stone-500 font-semibold">
              <span className="uppercase tracking-wider">Tenant Churn &amp; Retention</span>
              <Filter className="h-4 w-4 text-amber-600" />
            </div>
            <div className="text-xl font-bold text-navy-900 font-serif mt-2">2.1% Churn</div>
            <p className="text-[11px] text-stone-500 mt-1">97.9% Tenant Lease Renewal Rate</p>
          </div>

          <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between gap-2">
            <button
              onClick={() => handleExport('Tenant Churn Report', 'CSV')}
              className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-white rounded-lg border border-stone-200 text-[11px] font-bold text-navy-900 hover:bg-amber-50 transition cursor-pointer"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-700" /> CSV
            </button>
            <button
              onClick={() => handleExport('Tenant Churn Report', 'PDF')}
              className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 bg-white rounded-lg border border-stone-200 text-[11px] font-bold text-navy-900 hover:bg-amber-50 transition cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5 text-rose-700" /> PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
