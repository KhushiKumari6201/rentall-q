import React, { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, children, className = '', id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label ? (
          <label htmlFor={selectId} className="block text-xs font-semibold text-navy-700">
            {label}
          </label>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          className={`w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-navy-900 transition focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 disabled:bg-cream-100 disabled:text-stone-500 ${
            error ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-600' : 'border-stone-300'
          } ${className}`}
          {...props}
        >
          {options
            ? options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))
            : children}
        </select>
        {error ? <p className="text-xs text-rose-600 font-medium">{error}</p> : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
