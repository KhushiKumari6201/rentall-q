'use client';

import { Card } from '@/components/ui/Card';
import { Calendar } from 'lucide-react';

export default function AdminAllBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-serif">All Platform Bookings</h1>
        <p className="text-sm text-stone-400">
          Global view of rental bookings across all businesses.
        </p>
      </div>

      <Card className="border-navy-700 bg-navy-800/80 p-8 text-center text-stone-300">
        <Calendar className="mx-auto h-8 w-8 text-amber-400 mb-2" />
        <h3 className="text-base font-bold text-white">Platform Bookings Console</h3>
        <p className="text-xs text-stone-400 mt-1 max-w-md mx-auto">
          System administrators can view, audit, and manage bookings across all registered business tenants.
        </p>
      </Card>
    </div>
  );
}
