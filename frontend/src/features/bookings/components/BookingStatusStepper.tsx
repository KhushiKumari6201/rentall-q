'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, ShieldCheck, Play, CheckCircle2, XCircle } from 'lucide-react';

interface BookingStatusStepperProps {
  status: string;
}

export function BookingStatusStepper({ status }: BookingStatusStepperProps) {
  const steps = [
    { id: 'PENDING', label: 'Pending', icon: Clock },
    { id: 'CONFIRMED', label: 'Confirmed', icon: ShieldCheck },
    { id: 'ACTIVE', label: 'Active Lease', icon: Play },
    { id: 'COMPLETED', label: 'Completed', icon: CheckCircle2 },
  ];

  if (status === 'CANCELLED') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold">
        <XCircle className="h-3.5 w-3.5" />
        <span>CANCELLED</span>
      </div>
    );
  }

  const currentStepIndex = steps.findIndex((s) => s.id === status);
  const activeIndex = currentStepIndex !== -1 ? currentStepIndex : 0;

  return (
    <div className="flex items-center gap-1.5 py-1">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        const isPassed = idx < activeIndex;
        const isCurrent = idx === activeIndex;

        return (
          <React.Fragment key={step.id}>
            <div className="flex items-center gap-1">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  isPassed
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-amber-500 text-navy-900 shadow-2xs ring-2 ring-amber-300'
                    : 'bg-stone-200 text-stone-500'
                }`}
              >
                {isPassed ? <Check className="h-3 w-3" /> : <Icon className="h-3 w-3" />}
              </motion.div>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  isCurrent ? 'text-navy-900' : isPassed ? 'text-emerald-700' : 'text-stone-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div
                className={`h-0.5 w-4 rounded-full ${
                  idx < activeIndex ? 'bg-emerald-500' : 'bg-stone-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
