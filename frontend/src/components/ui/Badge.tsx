import React from 'react';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'secondary'
    | 'outline';
  status?: string;
  className?: string;
}

export function Badge({ children, variant, status, className = '' }: BadgeProps) {
  let resolvedVariant = variant || 'default';

  if (status) {
    const uppercaseStatus = status.toUpperCase();
    if (['CONFIRMED', 'ACTIVE', 'COMPLETED', 'PAID', 'AVAILABLE'].includes(uppercaseStatus)) {
      resolvedVariant = 'success';
    } else if (['PENDING', 'MAINTENANCE', 'LEAD'].includes(uppercaseStatus)) {
      resolvedVariant = 'warning';
    } else if (['CANCELLED', 'FAILED', 'OVERDUE', 'UNAVAILABLE', 'INACTIVE'].includes(uppercaseStatus)) {
      resolvedVariant = 'danger';
    } else if (['REFUNDED', 'OCCUPIED'].includes(uppercaseStatus)) {
      resolvedVariant = 'info';
    }
  }

  const styles = {
    default: 'bg-navy-50 text-navy-900 border-navy-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    danger: 'bg-rose-50 text-rose-700 border-rose-200/80',
    info: 'bg-sky-50 text-sky-700 border-sky-200/80',
    secondary: 'bg-cream-200 text-navy-700 border-stone-200',
    outline: 'bg-white text-navy-700 border-stone-300',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide transition-colors ${styles[resolvedVariant]} ${className}`}
    >
      {children || status}
    </span>
  );
}
