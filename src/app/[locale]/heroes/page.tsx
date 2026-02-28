import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Trophy, Heart, Droplets, Star, Medal, Download } from 'lucide-react';
import { createServerClient } from '@/lib/supabase/server';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

// ISR: revalidate every 5 minutes
export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'heroes' });
  return { title: t('title'), description: t('description') };
}

type Hero = {
  name: string;
  photo_url: string | null;
  species: string;
  breed: string | null;
  donation_count: number;
  lives_saved_count: number;
  total_points: number;
};

type BadgeTier = 'platinum' | 'gold' | 'silver' | 'bronze';

function getBadgeTier(donationCount: number): { tier: BadgeTier; color: string; bg: string } {
  if (donationCount >= 10) return { tier: 'platinum', color: 'text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' };
  if (donationCount >= 5) return { tier: 'gold', color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
  if (donationCount >= 3) return { tier: 'silver', color: 'text-slate-400', bg: 'bg-slate-100 dark:bg-slate-700/30' };
  return { tier: 'bronze', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' };
}

function getRankAccent(rank: number) {
  if (rank === 1) return { border: 'border-yellow-400 dark:border-yellow-500', glow: 'shadow-yellow-200/50 dark:shadow-yellow-500/20', text: 'text-yellow-500' };
  if (rank === 2) return { border: 'border-slate-300 dark:border-slate-400', glow: 'shadow-slate-200/50 dark:shadow-slate-400/20', text: 'text-slate-400' };
  return { border: 'border-orange-400 dark:border-orange-500', glow: 'shadow-orange-200/50 dark:shadow-orange-500/20', text: 'text-orange-500' };
}

function HeroAvatar({ hero, size = 'md' }: { hero: Hero; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-10 w-10 text-sm',
    md: 'h-16 w-16 text-xl',
    lg: 'h-20 w-20 text-2xl',
  };

  if (hero.photo_url) {
    return (
      <img
        src={hero.photo_url}
        alt={hero.name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white dark:ring-surface-200`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} flex items-center justify-center rounded-full bg-primary-100 font-bold text-primary-600 ring-2 ring-white dark:bg-primary-500/20 dark:text-primary-400 dark:ring-surface-200`}
    >
      {hero.name.charAt(0).toUpperCase()}
    </div>
  );
}

export default async function HeroesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('heroes');

  const supabase = await createServerClient();
  const { data: heroes } = await supabase
    .from('public_heroes')
    .select('*')
    .order('total_points', { ascending: false })
    .limit(100);

  const heroList = (heroes as Hero[] | null) ?? [];
  const top3 = heroList.slice(0, 3);
  const rest = heroList.slice(3);

  // Empty state
  if (heroList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-24">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-hero-100 dark:bg-hero-500/20">
          <Trophy className="h-10 w-10 text-hero-500" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('title')}
        </h1>
        <p className="mt-3 max-w-md text-center text-lg text-slate-500 dark:text-slate-400">
          {t('emptyState')}
        </p>

        {/* CTA */}
        <div className="mt-16 w-full max-w-2xl rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 px-8 py-10 text-center text-white shadow-lg">
          <h2 className="text-2xl font-bold">{t('ctaTitle')}</h2>
          <p className="mt-2 text-primary-100">{t('ctaSubtitle')}</p>
          <a
            href="https://unipaws.gr"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm transition-colors hover:bg-primary-50"
          >
            <Download className="h-4 w-4" />
            {t('ctaTitle')}
          </a>
        </div>
      </div>
    );
  }

  // Reorder top 3 for podium display: [2nd, 1st, 3rd]
  const podiumOrder = top3.length === 3
    ? [top3[1], top3[0], top3[2]]
    : top3;
  const podiumRanks = top3.length === 3 ? [2, 1, 3] : top3.map((_, i) => i + 1);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hero-100 dark:bg-hero-500/20">
          <Trophy className="h-8 w-8 text-hero-500" />
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-3 text-lg text-slate-500 dark:text-slate-400">
          {t('subtitle')}
        </p>
      </div>

      {/* Top 3 Podium */}
      {top3.length > 0 && (
        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-center sm:gap-4 lg:gap-8">
          {podiumOrder.map((hero, idx) => {
            const rank = podiumRanks[idx];
            const accent = getRankAccent(rank);
            const badge = getBadgeTier(hero.donation_count);
            const isFirst = rank === 1;

            return (
              <div
                key={`podium-${rank}`}
                className={`flex w-full max-w-[280px] flex-col items-center rounded-2xl border-2 ${accent.border} bg-white p-6 shadow-lg ${accent.glow} dark:bg-surface-100 ${isFirst ? 'sm:order-2 sm:-mt-4 sm:pb-8' : rank === 2 ? 'sm:order-1' : 'sm:order-3'}`}
              >
                {/* Rank badge */}
                <div className={`-mt-10 flex h-8 w-8 items-center justify-center rounded-full ${isFirst ? 'bg-yellow-400 text-yellow-900' : rank === 2 ? 'bg-slate-300 text-slate-700 dark:bg-slate-500 dark:text-slate-100' : 'bg-orange-400 text-orange-900'} text-sm font-bold shadow-md`}>
                  {rank}
                </div>

                {/* Rank icon */}
                <div className="mt-3">
                  {isFirst ? (
                    <Trophy className={`h-6 w-6 ${accent.text}`} />
                  ) : (
                    <Medal className={`h-6 w-6 ${accent.text}`} />
                  )}
                </div>

                {/* Avatar */}
                <div className="mt-4">
                  <HeroAvatar hero={hero} size={isFirst ? 'lg' : 'md'} />
                </div>

                {/* Name & breed */}
                <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                  {hero.name}
                </h3>
                {hero.breed && (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {hero.breed}
                  </p>
                )}

                {/* Badge tier */}
                <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${badge.bg} ${badge.color}`}>
                  <Star className="h-3 w-3" />
                  {t(`tiers.${badge.tier}`)}
                </span>

                {/* Stats */}
                <div className="mt-4 grid w-full grid-cols-2 gap-3 border-t border-slate-100 pt-4 dark:border-surface-300">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-primary-500">
                      <Droplets className="h-3.5 w-3.5" />
                      <span className="text-lg font-bold">{hero.donation_count}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('donations')}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-danger-500">
                      <Heart className="h-3.5 w-3.5" />
                      <span className="text-lg font-bold">{hero.lives_saved_count}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{t('livesSaved')}</p>
                  </div>
                </div>

                {/* Points */}
                <div className="mt-3 text-center">
                  <span className="text-2xl font-bold text-hero-500">{hero.total_points.toLocaleString()}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t('points')}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Leaderboard Table (4th place onwards) */}
      {rest.length > 0 && (
        <div className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-surface-300 dark:bg-surface-100">
          {/* Table header */}
          <div className="hidden grid-cols-[3.5rem_1fr_6rem_6rem_6rem_7rem] items-center gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-surface-300 dark:bg-surface-200 dark:text-slate-400 sm:grid">
            <span>{t('rank')}</span>
            <span>{/* Name */}</span>
            <span className="text-center">{t('donations')}</span>
            <span className="text-center">{t('livesSaved')}</span>
            <span className="text-center">{t('points')}</span>
            <span className="text-center">{/* Badge */}</span>
          </div>

          {/* Table rows */}
          {rest.map((hero, idx) => {
            const rank = idx + 4;
            const badge = getBadgeTier(hero.donation_count);
            const isEven = idx % 2 === 0;

            return (
              <div
                key={`row-${rank}`}
                className={`grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 px-4 py-3 sm:grid-cols-[3.5rem_1fr_6rem_6rem_6rem_7rem] sm:gap-4 ${
                  isEven
                    ? 'bg-white dark:bg-surface-100'
                    : 'bg-slate-50/50 dark:bg-surface-200/50'
                } border-b border-slate-100 last:border-b-0 dark:border-surface-300/50`}
              >
                {/* Rank */}
                <span className="text-sm font-bold text-slate-400 dark:text-slate-500 sm:text-center">
                  #{rank}
                </span>

                {/* Name + Avatar */}
                <div className="flex items-center gap-3">
                  <HeroAvatar hero={hero} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {hero.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {hero.breed ? `${hero.breed} - ${hero.species}` : hero.species}
                    </p>
                  </div>
                </div>

                {/* Mobile stats row */}
                <div className="col-span-2 flex items-center gap-4 sm:hidden">
                  <span className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                    <Droplets className="h-3 w-3 text-primary-500" />
                    {hero.donation_count}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                    <Heart className="h-3 w-3 text-danger-500" />
                    {hero.lives_saved_count}
                  </span>
                  <span className="text-xs font-semibold text-hero-500">
                    {hero.total_points.toLocaleString()} pts
                  </span>
                  <span className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.bg} ${badge.color}`}>
                    <Star className="h-2.5 w-2.5" />
                    {t(`tiers.${badge.tier}`)}
                  </span>
                </div>

                {/* Desktop: Donations */}
                <div className="hidden text-center sm:block">
                  <span className="flex items-center justify-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Droplets className="h-3.5 w-3.5 text-primary-500" />
                    {hero.donation_count}
                  </span>
                </div>

                {/* Desktop: Lives Saved */}
                <div className="hidden text-center sm:block">
                  <span className="flex items-center justify-center gap-1 text-sm font-semibold text-slate-700 dark:text-slate-200">
                    <Heart className="h-3.5 w-3.5 text-danger-500" />
                    {hero.lives_saved_count}
                  </span>
                </div>

                {/* Desktop: Points */}
                <div className="hidden text-center sm:block">
                  <span className="text-sm font-bold text-hero-500">
                    {hero.total_points.toLocaleString()}
                  </span>
                </div>

                {/* Desktop: Badge */}
                <div className="hidden sm:flex sm:justify-center">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${badge.bg} ${badge.color}`}>
                    <Star className="h-3 w-3" />
                    {t(`tiers.${badge.tier}`)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 px-8 py-12 text-center shadow-lg">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t('ctaTitle')}
        </h2>
        <p className="mt-2 text-lg text-primary-100">
          {t('ctaSubtitle')}
        </p>
        <a
          href="https://unipaws.gr"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary-600 shadow-sm transition-colors hover:bg-primary-50"
        >
          <Download className="h-4 w-4" />
          Download UniPaws
        </a>
      </div>
    </div>
  );
}
