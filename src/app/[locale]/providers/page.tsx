import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  UtensilsCrossed,
  Scissors,
  Dog,
  GraduationCap,
  ClipboardList,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

export const runtime = 'edge';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'providers' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function ProvidersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('providers');

  const features = [
    {
      icon: UtensilsCrossed,
      title: t('features.restaurants.title'),
      description: t('features.restaurants.description'),
    },
    {
      icon: Scissors,
      title: t('features.grooming.title'),
      description: t('features.grooming.description'),
    },
    {
      icon: Dog,
      title: t('features.sitting.title'),
      description: t('features.sitting.description'),
    },
    {
      icon: GraduationCap,
      title: t('features.training.title'),
      description: t('features.training.description'),
    },
  ];

  const steps = [
    {
      number: 1,
      icon: ClipboardList,
      title: t('process.step1.title'),
      description: t('process.step1.description'),
    },
    {
      number: 2,
      icon: ShieldCheck,
      title: t('process.step2.title'),
      description: t('process.step2.description'),
    },
    {
      number: 3,
      icon: CheckCircle,
      title: t('process.step3.title'),
      description: t('process.step3.description'),
    },
  ];

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 to-hero-600 dark:from-primary-700 dark:to-hero-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white" />
          <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white" />
          <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-white" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-24 sm:py-32 lg:py-40">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Search className="h-4 w-4" />
              <span>{t('badge')}</span>
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t('heroTitle')}
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
              {t('heroSubtitle')}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full text-white dark:text-surface-50"
            preserveAspectRatio="none"
          >
            <path
              d="M0 56h1440V28C1320 4 1200 0 1080 12c-120 12-240 28-360 28S480 20 360 12C240 4 120 8 0 28v28z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="bg-white py-20 dark:bg-surface-50 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover dark:bg-surface-100 dark:shadow-card-dark dark:hover:shadow-card-hover-dark"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-500/10">
                    <Icon className="h-6 w-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROCESS / HOW TO GET LISTED ===== */}
      <section className="bg-slate-50 py-20 dark:bg-surface-100 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {t('process.title')}
          </h2>

          <div className="relative mt-16">
            <div className="absolute left-1/2 top-6 hidden h-[calc(100%-48px)] w-0.5 -translate-x-1/2 bg-primary-200 dark:bg-primary-500/30 md:block" />

            <div className="space-y-12 md:space-y-16">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="relative flex flex-col items-center md:flex-row md:gap-8">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-lg font-bold text-white shadow-lg md:mx-auto">
                      {step.number}
                    </div>
                    <div className="mt-4 w-full rounded-xl bg-white p-6 shadow-card dark:bg-surface-200 dark:shadow-card-dark md:mt-0 md:max-w-sm">
                      <div className="mb-2 flex items-center gap-2">
                        <Icon className="h-5 w-5 text-primary-500" />
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t('ctaTitle')}
          </h2>
          <p className="mt-4 text-lg text-white/90">
            {t('ctaSubtitle')}
          </p>

          <div className="mt-10">
            <Link
              href="/providers/register"
              className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105"
            >
              {t('ctaButton')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
