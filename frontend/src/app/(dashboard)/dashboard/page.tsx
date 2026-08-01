import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-400">Welcome to your RentAll-Q business management portal</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Bookings</div>
          <div className="mt-2 text-3xl font-bold text-white">24</div>
          <div className="mt-1 text-xs text-emerald-400">↑ 12% from last month</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Rental Units</div>
          <div className="mt-2 text-3xl font-bold text-white">8</div>
          <div className="mt-1 text-xs text-sky-400">6 Available • 2 Booked</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Customers</div>
          <div className="mt-2 text-3xl font-bold text-white">15</div>
          <div className="mt-1 text-xs text-slate-400">Registered clients</div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Monthly Revenue</div>
          <div className="mt-2 text-3xl font-bold text-emerald-400">$4,850</div>
          <div className="mt-1 text-xs text-emerald-400">On target</div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-lg font-bold text-white">Quick Actions</h2>
        <p className="text-xs text-slate-400">Jump directly to your operational modules</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/bookings"
            className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Manage Bookings
          </Link>
          <Link
            href="/customers"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            View Customers
          </Link>
          <Link
            href="/rental-units"
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-700"
          >
            Rental Units
          </Link>
        </div>
      </div>
    </div>
  );
}
