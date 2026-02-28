import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Shield, FileText, Cookie, Download } from 'lucide-react';

export const runtime = 'edge';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'trustCenter' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function TrustCenterPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const cards = [
    {
      href: `/${locale}/trust-center/privacy-policy`,
      icon: Shield,
      title: t('privacy.title'),
      description: t('privacy.description'),
    },
    {
      href: `/${locale}/trust-center/terms-of-service`,
      icon: FileText,
      title: t('terms.title'),
      description: t('terms.description'),
    },
    {
      href: `/${locale}/trust-center/cookie-policy`,
      icon: Cookie,
      title: t('cookies.title'),
      description: t('cookies.description'),
    },
    {
      href: `/${locale}/trust-center/data-request`,
      icon: Download,
      title: t('dsar.title'),
      description: t('dsar.description'),
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {t('trustCenter.title')}
      </h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
        {t('trustCenter.subtitle')}
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href}>
              <div className="rounded-xl bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover dark:bg-surface-100 dark:shadow-card-dark dark:hover:shadow-card-hover-dark">
                <Icon className="h-6 w-6 text-primary-500" />
                <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {card.title}
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
