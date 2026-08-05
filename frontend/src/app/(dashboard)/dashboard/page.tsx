'use client';

import { useEffect, useState } from 'react';
import { DashboardOverview } from '@/features/dashboard/components/DashboardOverview';
import { Card } from '@/components/ui/Card';
import { createClient } from '@/server/lib/supabaseClient';

export default function SmartDashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function checkRole() {
      const supabase = createClient();
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle();

          setRole(profile?.role || 'BUSINESS_OWNER');
        } else {
          setRole('BUSINESS_OWNER');
        }
      } catch (err) {
        setRole('BUSINESS_OWNER');
      }
    }

    checkRole();
  }, []);

  if (role === 'CLIENT') {
    return (
      <div className="space-y-6 text-navy-900 font-sans">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy-900 font-serif">
            My Active Bookings
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            View your rental unit subscriptions, leases, and reservation details.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-stone-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
              <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">Unit 102 — Storage Locker</span>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                ACTIVE
              </span>
            </div>
            <div className="space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Lease Period:</span>
                <span className="font-semibold text-navy-900">Jan 01, 2026 - Dec 31, 2026</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Rate:</span>
                <span className="font-semibold text-navy-900">$250.00 / month</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Business Owner, Manager, Staff all see the full Business DashboardOverview
  return <DashboardOverview />;
}
