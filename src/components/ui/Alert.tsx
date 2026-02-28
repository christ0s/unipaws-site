import { type ReactNode } from 'react';
import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type AlertVariant = 'info' | 'warning' | 'danger' | 'success';

const variantConfig: Record<
  AlertVariant,
  { icon: LucideIcon; styles: string }
> = {
  info: {
    icon: Info,
    styles:
      'bg-info-50 border-info-200 text-info-700 dark:bg-dark-info-bg dark:border-info-700/30 dark:text-info-500',
  },
  warning: {
    icon: AlertTriangle,
    styles:
      'bg-warning-50 border-warning-200 text-warning-700 dark:bg-dark-warning-bg dark:border-warning-700/30 dark:text-warning-500',
  },
  danger: {
    icon: AlertCircle,
    styles:
      'bg-danger-50 border-danger-200 text-danger-700 dark:bg-dark-danger-bg dark:border-danger-700/30 dark:text-danger-500',
  },
  success: {
    icon: CheckCircle2,
    styles:
      'bg-success-50 border-success-200 text-success-700 dark:bg-dark-success-bg dark:border-success-700/30 dark:text-success-500',
  },
};

interface AlertProps {
  readonly variant: AlertVariant;
  readonly title?: string;
  readonly children: ReactNode;
  readonly className?: string;
}

export function Alert({ variant, title, children, className }: AlertProps) {
  const { icon: Icon, styles } = variantConfig[variant];

  return (
    <div
      role="alert"
      className={cn('rounded-lg border p-4 flex gap-3', styles, className)}
    >
      <Icon size={20} className="shrink-0 mt-0.5" />
      <div>
        {title && <p className="font-medium">{title}</p>}
        <div className="text-sm opacity-90">{children}</div>
      </div>
    </div>
  );
}
