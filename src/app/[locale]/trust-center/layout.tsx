import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Shield, FileText, Cookie, Download } from 'lucide-react';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function TrustCenterLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();

  const navLinks = [
    {
      href: `/${locale}/trust-center`,
      label: t('trustCenter.title'),
      icon: Shield,
    },
    {
      href: `/${locale}/trust-center/privacy-policy`,
      label: t('nav.privacyPolicy'),
      icon: Shield,
    },
    {
      href: `/${locale}/trust-center/terms-of-service`,
      label: t('nav.termsOfService'),
      icon: FileText,
    },
    {
      href: `/${locale}/trust-center/cookie-policy`,
      label: t('nav.cookiePolicy'),
      icon: Cookie,
    },
    {
      href: `/${locale}/trust-center/data-request`,
      label: t('nav.dataRequest'),
      icon: Download,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:flex lg:gap-10">
        {/* Sidebar - desktop only */}
        <aside className="hidden lg:block lg:w-64 lg:shrink-0">
          <nav aria-label="Trust Center navigation" className="sticky top-24">
            <ul className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-surface-200"
                    >
                      <Icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="max-w-3xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
