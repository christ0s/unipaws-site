import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'terms' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

const sectionKeys = [
  'acceptance',
  'services',
  'vetDisclaimer',
  'bloodDonation',
  'gamification',
  'liability',
] as const;

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('terms');

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{t('title')}</h1>
      <p className="lead">{t('description')}</p>

      {sectionKeys.map((key) => (
        <section key={key}>
          <h2>{t(`sections.${key}.title`)}</h2>
          <p>{t(`sections.${key}.content`)}</p>
        </section>
      ))}
    </article>
  );
}
