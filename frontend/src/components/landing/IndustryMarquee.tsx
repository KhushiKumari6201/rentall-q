'use client';

import React from 'react';
import { Box, Building2, Home, Car, Wrench, Package, Calendar } from 'lucide-react';

const industryItems = [
  { icon: Box, label: 'Self-Storage Facilities' },
  { icon: Building2, label: 'Commercial Warehouses' },
  { icon: Home, label: 'Hostels & Co-Living' },
  { icon: Car, label: 'Parking Lots & Bays' },
  { icon: Wrench, label: 'Equipment Rental Fleet' },
  { icon: Package, label: 'Container Storage' },
  { icon: Calendar, label: 'Event & Tool Rentals' },
];

export function IndustryMarquee() {
  return (
    <div className="bg-white border-b border-stone-200/70 py-6 overflow-hidden relative group">
      
      {/* Edge Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Track — duplicate items for infinite continuous loop */}
      <div className="flex w-max gap-8 animate-marquee group-hover:[animation-play-state:paused]">
        {[...industryItems, ...industryItems, ...industryItems].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 rounded-full border border-stone-200 bg-cream-50/80 px-4 py-2 text-xs font-semibold text-navy-900 whitespace-nowrap shadow-2xs"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-amber-400">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
