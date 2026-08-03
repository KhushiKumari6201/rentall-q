'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  CreditCard,
  Users,
  BarChart3,
  BrainCircuit,
} from 'lucide-react';

const modules = [
  {
    id: 'dashboard-overview',
    title: 'Dashboard & Overview',
    featureCount: '5 features',
    description:
      'See revenue, occupancy, and pending payments at a glance, every morning.',
    icon: LayoutDashboard,
  },
  {
    id: 'booking-availability',
    title: 'Booking & Availability',
    featureCount: '6 features',
    description:
      'Real-time unit availability and booking management — no double bookings.',
    icon: Calendar,
  },
  {
    id: 'billing-payments',
    title: 'Billing & Payments',
    featureCount: '5 features',
    description:
      'Invoicing, due tracking, late fees, and payment history in one place.',
    icon: CreditCard,
  },
  {
    id: 'customer-management',
    title: 'Customer Management',
    featureCount: '4 features',
    description:
      'Unified customer records, rental history, and documents.',
    icon: Users,
  },
  {
    id: 'reports',
    title: 'Reports & Export',
    featureCount: '4 features',
    description:
      'Occupancy, revenue, and churn reports — exportable for your records.',
    icon: BarChart3,
  },
  {
    id: 'ai-advisor',
    title: 'AI Business Advisor',
    featureCount: '3 features',
    description:
      'Weekly plain-English recommendations: which units to reprice, which customers need a follow-up call.',
    icon: BrainCircuit,
  },
];

export function FeatureGrid() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-cream-100 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            CORE MODULES
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight font-serif">
            Everything Required to Run Your Rental Portfolio
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            Concrete operational tools designed for day-to-day business management.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.id}
                variants={cardVariants}
                className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm hover:border-navy-300 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 border border-navy-100 group-hover:bg-navy-900 group-hover:text-white transition-colors duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      {module.featureCount}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-900 tracking-tight font-serif group-hover:text-amber-700 transition-colors">
                    {module.title}
                  </h3>

                  <p className="text-sm text-stone-600 leading-relaxed">
                    {module.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
