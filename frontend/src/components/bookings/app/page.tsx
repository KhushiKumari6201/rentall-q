'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookingList } from '@/components/bookings/BookingList';

export default function HomePage() {
  const [churnResult, setChurnResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTestChurnAgent = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/agents/churn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: 'cust-demo-88' }),
      });
      const data = await res.json();
      setChurnResult(data);
    } catch (err: any) {
      setChurnResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>Rental Business Intelligence Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '4px' }}>
            Next.js Clean Architecture Core + Python Decoupled AI Microservice
          </p>
        </div>
        <Badge status="Microservice Active" />
      </header>

      <Card title="AI Agent Testing (Python Microservice Call)" subtitle="Triggers HTTP inference call from Next.js backend to agents-service">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <strong style={{ color: 'white' }}>Churn Prediction Agent</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Analyses tenant booking patterns and flags retention risk</p>
          </div>
          <button className="btn" onClick={handleTestChurnAgent} disabled={loading}>
            {loading ? 'Calling Python Microservice...' : 'Run Churn Analysis'}
          </button>
        </div>

        {churnResult && (
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-card)' }}>
            <h4 style={{ color: '#a855f7', marginBottom: '8px' }}>Response from Python `agents-service`</h4>
            <pre style={{ fontSize: '0.85rem', color: '#e2e8f0' }}>{JSON.stringify(churnResult, null, 2)}</pre>
          </div>
        )}
      </Card>

      <BookingList />
    </div>
  );
}
