'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PricingSectionProps {
  onOpenTrialModal: () => void;
}

export function PricingSection({ onOpenTrialModal }: PricingSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for independent operators getting started.',
      monthlyPrice: '3,999',
      yearlyPrice: '3,199',
      features: [
        'Up to 25 rental units',
        '2 team user seats',
        'Bookings & Unit Availability',
        'Billing & Payment Invoicing',
        'Standard Export Reports',
      ],
      isPopular: false,
      buttonText: 'Start 14-Day Free Trial',
    },
    {
      name: 'Professional',
      description: 'Complete operational management & AI recommendations.',
      monthlyPrice: '7,999',
      yearlyPrice: '6,399',
      features: [
        'Up to 150 rental units',
        '5 team user seats (Owner, Manager, Staff)',
        'Weekly AI Business Advisor',
        'Automated Payment Reminders',
        'Customer Portal Access',
        'Priority Phone & Email Support',
      ],
      isPopular: true,
      buttonText: 'Start 14-Day Free Trial',
    },
    {
      name: 'Enterprise',
      description: 'Multi-location operations & custom integrations.',
      monthlyPrice: '19,999',
      yearlyPrice: '15,999',
      features: [
        'Unlimited rental units',
        'Unlimited team user seats',
        'Multi-location & business switching',
        'Custom API & Accounting Sync',
        'Dedicated Account Manager',
        '99.9% Uptime SLA',
      ],
      isPopular: false,
      buttonText: 'Contact Enterprise Sales',
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            TRANSPARENT PRICING
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight font-serif">
            Simple Plans for Operators of Any Scale
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            All plans include a 14-day free trial. No credit card required to start.
          </p>
        </div>

        {/* Animated Monthly / Yearly Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span
            onClick={() => setBillingCycle('monthly')}
            className={`text-sm font-semibold cursor-pointer transition-colors ${
              billingCycle === 'monthly' ? 'text-navy-900' : 'text-stone-500'
            }`}
          >
            Monthly Billing
          </span>

          <button
            type="button"
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="relative h-8 w-16 rounded-full bg-navy-900 p-1 transition-colors cursor-pointer focus:outline-none"
            aria-label="Toggle Billing Cycle"
          >
            <motion.div
              className="h-6 w-6 rounded-full bg-amber-400 shadow-md"
              layout
              transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 500, damping: 30 }}
              style={{
                float: billingCycle === 'yearly' ? 'right' : 'left',
              }}
            />
          </button>

          <span
            onClick={() => setBillingCycle('yearly')}
            className={`text-sm font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
              billingCycle === 'yearly' ? 'text-navy-900' : 'text-stone-500'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
              Save 20%
            </span>
          </span>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 transition-all duration-300 flex flex-col justify-between relative ${
                  plan.isPopular
                    ? 'border-2 border-amber-500 bg-navy-900 text-white shadow-xl scale-102 z-10'
                    : 'border border-stone-200/80 bg-cream-50 text-navy-900 shadow-sm hover:border-stone-300'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-navy-900 font-bold text-[11px] uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-bold font-serif ${plan.isPopular ? 'text-white' : 'text-navy-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs mt-1 ${plan.isPopular ? 'text-stone-300' : 'text-stone-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Price display with spring number animation */}
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-bold font-serif ${plan.isPopular ? 'text-amber-400' : 'text-navy-900'}`}>
                      ₹
                    </span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                        transition={{ duration: shouldReduceMotion ? 0.05 : 0.2 }}
                        className={`text-4xl font-bold font-serif ${plan.isPopular ? 'text-amber-400' : 'text-navy-900'}`}
                      >
                        {price}
                      </motion.span>
                    </AnimatePresence>
                    <span className={`text-xs font-medium ml-1 ${plan.isPopular ? 'text-stone-400' : 'text-stone-500'}`}>
                      / month
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="space-y-3 pt-4 border-t border-stone-200/40 text-xs">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${plan.isPopular ? 'text-amber-400' : 'text-emerald-600'}`} />
                        <span className={plan.isPopular ? 'text-stone-200' : 'text-stone-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Button
                    onClick={onOpenTrialModal}
                    variant={plan.isPopular ? 'primary' : 'outline'}
                    size="lg"
                    className={`w-full justify-center font-semibold py-3 ${
                      plan.isPopular
                        ? 'bg-amber-500 text-navy-900 hover:bg-amber-400 border-amber-500'
                        : 'border-stone-300 hover:bg-cream-100'
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
