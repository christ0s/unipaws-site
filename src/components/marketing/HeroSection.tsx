import { getTranslations } from 'next-intl/server';
import { Heart } from 'lucide-react';
import { AppDownloadButtons } from './AppDownloadButtons';

export async function HeroSection() {
  const t = await getTranslations('homepage');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-hero-600 dark:from-primary-700 dark:via-hero-700 dark:to-hero-700">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white" />
        <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white" />
        <div className="absolute left-1/2 top-1/3 h-48 w-48 -translate-x-1/2 rounded-full bg-white" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32 lg:py-40">
        <div className="flex flex-col items-center text-center">
          {/* Paw badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <Heart className="h-4 w-4" />
            <span>UniPaws</span>
          </div>

          {/* Title */}
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="mt-10">
            <AppDownloadButtons variant="primary" />
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full text-white dark:text-surface-100"
          preserveAspectRatio="none"
        >
          <path
            d="M0 56h1440V28C1320 4 1200 0 1080 12c-120 12-240 28-360 28S480 20 360 12C240 4 120 8 0 28v28z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
