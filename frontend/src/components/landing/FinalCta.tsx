'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface FinalCtaProps {
  onOpenTrialModal: () => void;
}

export function FinalCta({ onOpenTrialModal }: FinalCtaProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 sm:py-28 bg-navy-900 text-white text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight font-serif leading-tight">
          Ready to Streamline Your Rental Business with RentallQ?
        </h2>
        <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Get started in minutes. Replace spreadsheets with purpose-built software and decision support.
        </p>

        <div className="pt-4 flex justify-center">
          <motion.div
            animate={{ x: mousePos.x, y: mousePos.y }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Button
              onClick={onOpenTrialModal}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              variant="secondary"
              size="lg"
              className="bg-amber-500 text-navy-900 hover:bg-amber-400 font-bold px-8 py-4 text-base shadow-xl border-amber-500 cursor-pointer"
            >
              <span>Start Your 14-Day Free Trial</span>
              <ArrowRight className="h-5 w-5 ml-1.5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
