'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'Bookings', href: '/bookings', icon: '📅' },
  { label: 'Customers', href: '/customers', icon: '👥' },
  { label: 'Rental Units', href: '/rental-units', icon: '🏠' },
  { label: 'Payments', href: '/payments', icon: '💳' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950 p-4 text-slate-100 flex flex-col justify-between min-h-screen">
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 font-bold text-white shadow-md">
            RQ
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white leading-tight">RentAll-Q</h1>
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Business Platform</span>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 pt-4 px-2 text-xs text-slate-500">
        RentAll-Q v1.0.0
      </div>
    </aside>
  );
}
