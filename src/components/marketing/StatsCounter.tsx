'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Heart, Users, Stethoscope } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

interface StatData {
  livesSaved: number;
  registeredDonors: number;
  vetsOnline: number;
}

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for a smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration]);

  return count;
}

interface StatCardProps {
  icon: typeof Heart;
  label: string;
  value: number;
  color: string;
  iconBg: string;
}

function StatCard({ icon: Icon, label, value, color, iconBg }: StatCardProps) {
  const animatedValue = useCountUp(value);

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-3 rounded-2xl bg-white p-8',
        'shadow-card dark:bg-surface-100 dark:shadow-card-dark',
        'transition-shadow hover:shadow-card-hover dark:hover:shadow-card-hover-dark',
      )}
    >
      <div className={cn('flex h-14 w-14 items-center justify-center rounded-xl', iconBg)}>
        <Icon className={cn('h-7 w-7', color)} />
      </div>
      <span className="text-4xl font-bold text-slate-900 dark:text-white">
        {animatedValue.toLocaleString()}
      </span>
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</span>
    </div>
  );
}

export function StatsCounter() {
  const t = useTranslations('homepage');
  const [stats, setStats] = useState<StatData>({
    livesSaved: 0,
    registeredDonors: 0,
    vetsOnline: 0,
  });

  const fetchStats = useCallback(async () => {
    try {
      const supabase = createClient();

      const [livesResult, donorsResult, vetsResult] = await Promise.allSettled([
        supabase.rpc('get_total_lives_saved'),
        supabase
          .from('pets')
          .select('id', { count: 'exact', head: true })
          .eq('is_available_as_donor', true),
        supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'vet')
          .eq('is_verified', true),
      ]);

      setStats({
        livesSaved:
          livesResult.status === 'fulfilled' && livesResult.value.data
            ? Number(livesResult.value.data)
            : 0,
        registeredDonors:
          donorsResult.status === 'fulfilled' && donorsResult.value.count
            ? donorsResult.value.count
            : 0,
        vetsOnline:
          vetsResult.status === 'fulfilled' && vetsResult.value.count
            ? vetsResult.value.count
            : 0,
      });
    } catch {
      // Stats remain at 0 on error
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <StatCard
        icon={Heart}
        label={t('livesSaved')}
        value={stats.livesSaved}
        color="text-danger-500"
        iconBg="bg-danger-50 dark:bg-dark-danger-bg"
      />
      <StatCard
        icon={Users}
        label={t('registeredDonors')}
        value={stats.registeredDonors}
        color="text-primary-500"
        iconBg="bg-primary-50 dark:bg-primary-900/30"
      />
      <StatCard
        icon={Stethoscope}
        label={t('vetsOnline')}
        value={stats.vetsOnline}
        color="text-success-500"
        iconBg="bg-success-50 dark:bg-dark-success-bg"
      />
    </div>
  );
}
