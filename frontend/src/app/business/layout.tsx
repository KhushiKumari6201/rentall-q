'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === '/business/login' ||
    pathname === '/business/register' ||
    pathname?.startsWith('/business/login') ||
    pathname?.startsWith('/business/register');

  if (isAuthPage) {
    return <div className="min-h-screen bg-cream-100 text-navy-900">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-cream-100 text-navy-900 font-sans antialiased">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
