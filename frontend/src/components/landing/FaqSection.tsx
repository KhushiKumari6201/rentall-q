'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What types of rental businesses can use RentallQ?',
    answer:
      'RentallQ is purpose-built for operators in self-storage facilities, commercial warehouses, hostels & co-living spaces, parking lot providers, and equipment rental fleets.',
  },
  {
    question: 'How does the 14-day free trial work?',
    answer:
      'You get full, unrestricted access to RentallQ for 14 days without entering a credit card. You can onboard your units, invite team members, and test all management & AI features.',
  },
  {
    question: 'Can I assign different role permissions to my team members?',
    answer:
      'Yes. RentallQ supports Business Owner (full metrics & AI recommendations), Manager (employee & booking management, invoices, reports), and Staff (updating daily bookings and recording payments) role panels.',
  },
  {
    question: 'How does the weekly AI Business Advisor generate recommendations?',
    answer:
      'The AI Advisor analyzes your occupancy trends, payment history, and turnover timelines to output clear, plain-English advice every week on which units to reprice and which clients require renewal follow-ups.',
  },
  {
    question: 'Can I export my business data and reports?',
    answer:
      'Absolutely. All revenue, occupancy, booking, and payment records are fully exportable in CSV and PDF formats for your accounting and record-keeping needs.',
  },
];

export function FaqSection() {
  const shouldReduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-cream-100 border-b border-stone-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
            FREQUENTLY ASKED QUESTIONS
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight font-serif">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-stone-200/80 bg-white overflow-hidden shadow-xs transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer"
                >
                  <span className="text-base font-bold text-navy-900 font-serif pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-cream-100 text-navy-900 flex-shrink-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: 0 },
                      }}
                      transition={{ duration: shouldReduceMotion ? 0.05 : 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-stone-600 leading-relaxed border-t border-stone-100/80 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
