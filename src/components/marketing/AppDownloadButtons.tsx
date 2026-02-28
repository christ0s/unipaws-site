import { Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppDownloadButtonsProps {
  variant?: 'primary' | 'outline';
}

export async function AppDownloadButtons({ variant = 'primary' }: AppDownloadButtonsProps) {

  const isPrimary = variant === 'primary';

  const baseStyles = cn(
    'inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold',
    'transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  );

  const primaryStyles = cn(
    'bg-white text-slate-900 hover:bg-white/90',
    'focus-visible:ring-white',
  );

  const outlineStyles = cn(
    'border-2 border-white text-white hover:bg-white/10',
    'focus-visible:ring-white',
  );

  const buttonStyles = cn(baseStyles, isPrimary ? primaryStyles : outlineStyles);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      <a href="#" className={buttonStyles}>
        <Smartphone className="h-5 w-5" />
        <span>App Store</span>
      </a>
      <a href="#" className={buttonStyles}>
        <Smartphone className="h-5 w-5" />
        <span>Google Play</span>
      </a>
    </div>
  );
}
