import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const;

type CardPadding = keyof typeof paddingStyles;

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: CardPadding;
}

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-card dark:bg-surface-100 dark:shadow-card-dark',
        paddingStyles[padding],
        hover &&
          'hover:shadow-card-hover dark:hover:shadow-card-hover-dark transition-shadow',
        className,
      )}
    >
      {children}
    </div>
  );
}
