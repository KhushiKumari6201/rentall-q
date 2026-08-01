'use client';

import React, { useState } from 'react';
import { BookingForm } from '@/components/bookings/BookingForm';
import { BookingList } from '@/components/bookings/BookingList';

export default function BookingsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Booking Operations</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>
          End-to-End Clean Architecture Workflow Example
        </p>
      </header>

      <BookingForm onSuccess={() => setRefreshKey(prev => prev + 1)} />
      <BookingList key={refreshKey} />
    </div>
  );
}
