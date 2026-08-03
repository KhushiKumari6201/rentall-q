'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Building2, Shield, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBusinesses() {
      try {
        const res = await fetch('/api/businesses');
        if (res.ok) {
          const data = await res.json();
          setBusinesses(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load businesses', err);
      } finally {
        setLoading(false);
      }
    }

    loadBusinesses();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white font-serif">Registered Businesses</h1>
          <p className="text-sm text-stone-400">
            Platform-wide directory of all tenant businesses on RentallQ.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="text-sm text-stone-400">Loading business tenants...</div>
      ) : businesses.length === 0 ? (
        <Card className="border-navy-700 bg-navy-800/80 p-8 text-center text-stone-300">
          <Building2 className="mx-auto h-8 w-8 text-amber-400 mb-2" />
          <h3 className="text-base font-bold text-white">Default Business Active</h3>
          <p className="text-xs text-stone-400 mt-1">
            Registered business tenants will be listed here as providers sign up.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((b) => (
            <Card key={b.id} className="border-navy-700 bg-navy-800/80 text-cream-100">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-navy-700">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{b.name}</span>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  {b.businessType}
                </span>
              </div>
              <div className="text-xs text-stone-400 space-y-1">
                <div>ID: {b.id.slice(0, 8)}...</div>
                <div>Created: {new Date(b.createdAt).toLocaleDateString()}</div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
