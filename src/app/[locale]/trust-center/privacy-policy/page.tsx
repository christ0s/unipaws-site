import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('privacy');

  const dataTypes = [
    'account',
    'pet',
    'location',
    'health',
    'ai',
    'push',
  ] as const;

  const legalBases = ['consent', 'contract', 'legitimate'] as const;

  const rights = [
    'access',
    'rectification',
    'erasure',
    'portability',
    'restriction',
    'objection',
  ] as const;

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{t('title')}</h1>
      <p className="lead">{t('description')}</p>

      {/* Section 1: Data Controller */}
      <section>
        <h2>{t('sections.controller.title')}</h2>
        <p>{t('sections.controller.content')}</p>
      </section>

      {/* Section 2: Data Collected */}
      <section>
        <h2>{t('sections.dataCollected.title')}</h2>
        <p>{t('sections.dataCollected.intro')}</p>
        <ul>
          {dataTypes.map((type) => (
            <li key={type}>{t(`sections.dataCollected.${type}`)}</li>
          ))}
        </ul>
      </section>

      {/* Section 3: Legal Basis */}
      <section>
        <h2>{t('sections.legalBasis.title')}</h2>
        <ul>
          {legalBases.map((basis) => (
            <li key={basis}>{t(`sections.legalBasis.${basis}`)}</li>
          ))}
        </ul>
      </section>

      {/* Section 4: Retention */}
      <section>
        <h2>{t('sections.retention.title')}</h2>
        <p>{t('sections.retention.content')}</p>
      </section>

      {/* Section 5: Your Rights */}
      <section>
        <h2>{t('sections.rights.title')}</h2>
        <p>{t('sections.rights.intro')}</p>
        <ul>
          {rights.map((right) => (
            <li key={right}>{t(`sections.rights.${right}`)}</li>
          ))}
        </ul>
        <p>
          {t('sections.rights.cta')}{' '}
          <Link
            href={`/${locale}/trust-center/data-request`}
            className="text-primary-500 hover:text-primary-600"
          >
            {t('sections.rights.cta')}
          </Link>
        </p>
      </section>

      {/* Section 6: Contact */}
      <section>
        <h2>{t('sections.contact.title')}</h2>
        <p>{t('sections.contact.content')}</p>
      </section>
    </article>
  );
}
