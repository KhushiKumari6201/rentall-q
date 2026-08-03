'use client';

import { Card } from '@/components/ui/Card';
import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white font-serif">Platform Settings</h1>
        <p className="text-sm text-stone-400">
          Global system configurations, multi-agent AI parameters, and tenant policies.
        </p>
      </div>

      <Card className="border-navy-700 bg-navy-800/80 p-8 text-center text-stone-300">
        <Settings className="mx-auto h-8 w-8 text-amber-400 mb-2" />
        <h3 className="text-base font-bold text-white">System Configuration Shell</h3>
        <p className="text-xs text-stone-400 mt-1 max-w-md mx-auto">
          Configure multi-tenant rules, feature flags, and global integration settings.
        </p>
      </Card>
    </div>
  );
}
