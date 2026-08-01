export default function PaymentsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white">Payments</h1>
        <p className="text-sm text-slate-400">Track invoices, billing, and payment processing</p>
      </div>

      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center">
        <span className="text-4xl">💳</span>
        <h2 className="mt-3 text-lg font-semibold text-white">Payments & Billing</h2>
        <p className="mt-1 text-sm text-slate-400">Payment tracking and invoice generation module is coming soon.</p>
      </div>
    </div>
  );
}
