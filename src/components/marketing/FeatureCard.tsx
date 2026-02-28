import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col items-center rounded-2xl bg-white p-8 text-center',
        'shadow-card dark:bg-surface-100 dark:shadow-card-dark',
        'transition-all duration-300',
        'hover:shadow-card-hover hover:-translate-y-1 dark:hover:shadow-card-hover-dark',
      )}
    >
      <div
        className={cn(
          'mb-5 flex h-14 w-14 items-center justify-center rounded-xl',
          'bg-primary-50 dark:bg-primary-900/30',
          'transition-colors group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50',
        )}
      >
        <Icon className="h-7 w-7 text-primary-500" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  );
}
