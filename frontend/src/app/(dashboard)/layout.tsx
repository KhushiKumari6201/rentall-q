'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ClientSidebar } from '@/components/layout/ClientSidebar';
import { Navbar } from '@/components/layout/Navbar';
import { createClient } from '@/server/lib/supabaseClient';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
          const demoRole = typeof document !== 'undefined'
            ? document.cookie
                .split('; ')
                .find((row) => row.startsWith('rentallq_demo_session='))
                ?.split('=')[1]
            : null;
          setRole(demoRole || 'BUSINESS_OWNER');
        }
      } catch (err) {
        setRole('BUSINESS_OWNER');
      }
    }

    checkRole();
  }, []);

  return (
    <div className="flex min-h-screen bg-cream-100 text-navy-900 font-sans antialiased">
      {role === 'CLIENT' ? <ClientSidebar /> : <Sidebar />}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
