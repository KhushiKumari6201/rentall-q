'use client';

import React from 'react';
import { motion, HTMLMotionProps, Transition } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface FadeUpProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

/**
 * Reusable Framer Motion wrapper that fades and slides content up when scrolled into view.
 * Respects prefers-reduced-motion accessibility setting.
 */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.5,
  distance = 24,
  className = '',
  ...props
}: FadeUpProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // If user prefers reduced motion, skip slide offset & shorten duration
  const initial = prefersReducedMotion ? { opacity: 0, y: 0 } : { opacity: 0, y: distance };
  const animate = { opacity: 1, y: 0 };
  const transition: Transition = {
    duration: prefersReducedMotion ? 0.05 : duration,
    delay: prefersReducedMotion ? 0 : delay,
    ease: 'easeOut',
  };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '-50px' }} // Triggers once when 50px inside viewport
      transition={transition}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
