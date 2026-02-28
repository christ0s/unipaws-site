'use client';

import { useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { X, Sun, Moon, Globe } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export function MobileMenu({ isOpen, onClose, isDark, onToggleDark }: MobileMenuProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navLinks = [
    { href: '/' as const, label: t('nav.home') },
  ];

  const trustCenterLinks = [
    { href: '/trust-center/privacy-policy' as const, label: t('nav.privacyPolicy') },
    { href: '/trust-center/terms-of-service' as const, label: t('nav.termsOfService') },
    { href: '/trust-center/cookie-policy' as const, label: t('nav.cookiePolicy') },
    { href: '/trust-center/data-request' as const, label: t('nav.dataRequest') },
  ];

  function handleLocaleSwitch() {
    const newLocale: Locale = locale === 'el' ? 'en' : 'el';
    router.replace(pathname, { locale: newLocale });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-white dark:bg-surface-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 dark:border-surface-300">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <span className="text-2xl" role="img" aria-label="paw">
            🐾
          </span>
          <span className="text-primary-500 font-bold text-xl">UniPaws</span>
        </Link>
        <button
          onClick={onClose}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-200"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex flex-col p-4 gap-1">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              'block px-4 py-3 rounded-lg text-lg transition-colors',
              pathname === link.href
                ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10'
                : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-surface-200',
            )}
          >
            {link.label}
          </Link>
        ))}

        {/* Trust Center section */}
        <div className="mt-2">
          <span className="block px-4 py-3 text-lg font-medium text-slate-500 dark:text-slate-400">
            {t('nav.trustCenter')}
          </span>
          <div className="ml-4 flex flex-col gap-1">
            {trustCenterLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  'block px-4 py-3 rounded-lg text-base transition-colors',
                  pathname === link.href
                    ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-surface-200',
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-surface-300 space-y-3">
        {/* Language toggle */}
        <button
          onClick={handleLocaleSwitch}
          className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-surface-200 transition-colors"
        >
          <Globe className="h-5 w-5" />
          <span>{locale === 'el' ? 'English' : 'Ελληνικά'}</span>
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={onToggleDark}
          className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-surface-200 transition-colors"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{isDark ? t('common.lightMode') : t('common.darkMode')}</span>
        </button>

        {/* Download App */}
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
        >
          {t('common.downloadApp')}
        </Link>
      </div>
    </div>
  );
}
