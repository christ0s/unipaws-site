import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const variantStyles = {
  default:
    'bg-slate-100 text-slate-700 dark:bg-surface-300 dark:text-slate-300',
  success:
    'bg-success-100 text-success-700 dark:bg-dark-success-bg dark:text-success-500',
  warning:
    'bg-warning-100 text-warning-700 dark:bg-dark-warning-bg dark:text-warning-500',
  danger:
    'bg-danger-100 text-danger-700 dark:bg-dark-danger-bg dark:text-danger-500',
  hero: 'bg-hero-100 text-hero-700 dark:bg-hero-700/20 dark:text-hero-500',
} as const;

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
} as const;

type BadgeVariant = keyof typeof variantStyles;
type BadgeSize = keyof typeof sizeStyles;

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  className?: string;
}

export function Badge({
  variant = 'default',
  size = 'md',
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded-full font-medium inline-flex items-center',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
