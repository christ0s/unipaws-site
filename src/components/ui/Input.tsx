'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, id, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
            {required && <span className="ml-0.5 text-danger-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          required={required}
          className={cn(
            'w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'dark:bg-surface-100 dark:text-slate-200',
            'focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            error
              ? 'border-danger-500'
              : 'border-slate-300 dark:border-surface-400',
            className,
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-danger-500">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
