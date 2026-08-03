'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

interface StaggerGridProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

/**
 * StaggerGrid component for animating grids of cards with staggered children animations.
 * Used for feature grids, pricing tiers, and stat card grids.
 */
export function StaggerGrid({ children, staggerDelay = 0.1, className = '' }: StaggerGridProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Child item wrapper for StaggerGrid elements.
 */
export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20, scale: prefersReducedMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0.05 : 0.45,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
