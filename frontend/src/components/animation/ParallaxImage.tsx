'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // Speed factor (e.g., -0.2 to 0.2)
  className?: string;
  containerClassName?: string;
}

/**
 * ParallaxImage client component using GSAP + ScrollTrigger.
 * Creates a smooth vertical scroll parallax effect.
 * Uses gsap.context() + ctx.revert() cleanup for strict React safety.
 */
export function ParallaxImage({
  src,
  alt,
  speed = -0.15,
  className = '',
  containerClassName = '',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !imageRef.current) return;

    // Use gsap.context() for clean scoped memory allocation and cleanup
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', // Start when top of container hits bottom of viewport
          end: 'bottom top',   // End when bottom of container hits top of viewport
          scrub: true,         // Links animation directly to scroll position
        },
      });
    }, containerRef);

    return () => ctx.revert(); // Reverts all GSAP animations inside this context on unmount
  }, [speed, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${containerClassName}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform ${className}`}
      />
    </div>
  );
}
