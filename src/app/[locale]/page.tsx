import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Droplets, QrCode, Brain, Briefcase, UserPlus, Tag, Heart } from 'lucide-react';

export const runtime = 'edge';
import {
  HeroSection,
  StatsCounter,
  FeatureCard,
  AppDownloadButtons,
} from '@/components/marketing';

type Props = {
  params: Promise<{ locale: string }>;
};

const featureKeys = [
  { key: 'blood', icon: Droplets },
  { key: 'qr', icon: QrCode },
  { key: 'ai', icon: Brain },
  { key: 'services', icon: Briefcase },
] as const;

const stepIcons = [UserPlus, Tag, Heart];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('homepage');

  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Live Stats */}
      <section className="py-16 bg-white dark:bg-surface-100">
        <div className="mx-auto max-w-6xl px-4">
          <StatsCounter />
        </div>
      </section>

      {/* 3. Features Grid */}
      <section className="py-20 bg-slate-50 dark:bg-surface-50">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {featureKeys.map(({ key, icon }) => (
              <FeatureCard
                key={key}
                icon={icon}
                title={t(`features.${key}.title`)}
                description={t(`features.${key}.description`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-20 bg-white dark:bg-surface-100">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-16 text-center text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            {t('howItWorks.title')}
          </h2>

          <div className="relative grid gap-12 sm:grid-cols-3 sm:gap-8">
            {/* Connecting line (visible on sm+) */}
            <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-hero-400 dark:from-primary-800 dark:via-primary-600 dark:to-hero-600 sm:block" />

            {[1, 2, 3].map((step) => {
              const StepIcon = stepIcons[step - 1];
              return (
                <div key={step} className="relative flex flex-col items-center text-center">
                  {/* Numbered circle */}
                  <div className="relative z-10 mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-hero-600 shadow-lg">
                    <StepIcon className="h-8 w-8 text-white" />
                  </div>

                  {/* Step number badge */}
                  <div className="absolute -top-1 left-1/2 z-20 flex h-7 w-7 -translate-x-[calc(50%-24px)] items-center justify-center rounded-full bg-white text-xs font-bold text-primary-600 shadow-md dark:bg-surface-200 dark:text-primary-400">
                    {step}
                  </div>

                  <p className="max-w-xs text-base font-medium text-slate-700 dark:text-slate-300">
                    {t(`howItWorks.step${step}` as
                      | 'howItWorks.step1'
                      | 'howItWorks.step2'
                      | 'howItWorks.step3')}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-hero-600 py-20">
        {/* Decorative circles */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t('ctaTitle')}</h2>
          <p className="mt-4 text-lg text-white/90">{t('ctaSubtitle')}</p>
          <div className="mt-10 flex justify-center">
            <AppDownloadButtons variant="outline" />
          </div>
        </div>
      </section>
    </>
  );
}
