'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations();

  const quickLinks = [
    { href: '/' as const, label: t('nav.home') },
    { href: '/heroes' as const, label: t('nav.heroes') },
    { href: '/providers' as const, label: t('nav.providers') },
  ];

  const legalLinks = [
    { href: '/trust-center/privacy-policy' as const, label: t('nav.privacyPolicy') },
    { href: '/trust-center/terms-of-service' as const, label: t('nav.termsOfService') },
    { href: '/trust-center/cookie-policy' as const, label: t('nav.cookiePolicy') },
    { href: '/trust-center/data-request' as const, label: t('nav.dataRequest') },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-surface-100 border-t border-slate-200 dark:border-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl" role="img" aria-label="paw">
                🐾
              </span>
              <span className="text-primary-500 font-bold text-xl">UniPaws</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {t('footer.brand')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              {t('footer.legal')}
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
              Social
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-slate-500 dark:text-slate-400">Facebook</span>
              </li>
              <li>
                <span className="text-sm text-slate-500 dark:text-slate-400">Instagram</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-surface-300 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {t('footer.copyright', { year: new Date().getFullYear().toString() })}
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            {t('common.madeInGreece')}
          </p>
        </div>
      </div>
    </footer>
  );
}
