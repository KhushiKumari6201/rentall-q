'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface DrawSVGPathProps {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

/**
 * DrawSVGPath component using GSAP ScrollTrigger.
 * Animates strokeDashoffset on scroll to draw SVG connector paths.
 * Uses gsap.context() + ctx.revert() for React cleanup safety.
 */
export function DrawSVGPath({
  d,
  stroke = '#D89B3C',
  strokeWidth = 3,
  className = '',
}: DrawSVGPathProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!svgRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set initial dash properties
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: prefersReducedMotion ? 0 : length,
    });

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%', // Starts drawing when SVG reaches 80% down viewport
          end: 'bottom 40%',  // Completes drawing when SVG reaches 40%
          scrub: 0.5,        // Smooth 0.5s scrub catchup
        },
      });
    }, svgRef);

    return () => ctx.revert();
  }, [d, prefersReducedMotion]);

  return (
    <svg
      ref={svgRef}
      className={`w-full overflow-visible ${className}`}
      fill="none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
