import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label ? (
          <label htmlFor={inputId} className="block text-xs font-semibold text-navy-700">
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-navy-900 placeholder-stone-400 transition focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 disabled:bg-cream-100 disabled:text-stone-500 ${
            error ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-600' : 'border-stone-300'
          } ${className}`}
          {...props}
        />
        {error ? <p className="text-xs text-rose-600 font-medium">{error}</p> : null}
        {!error && helperText ? <p className="text-xs text-stone-500">{helperText}</p> : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
