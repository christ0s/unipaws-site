'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Sun, Moon, Menu, ChevronDown, Globe } from 'lucide-react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';
import type { Locale } from '@/i18n/config';

export function Header() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Initialise dark mode from localStorage / system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLocaleSwitch() {
    const newLocale: Locale = locale === 'el' ? 'en' : 'el';
    router.replace(pathname, { locale: newLocale });
  }

  const trustCenterLinks = [
    { href: '/trust-center/privacy-policy' as const, label: t('nav.privacyPolicy') },
    { href: '/trust-center/terms-of-service' as const, label: t('nav.termsOfService') },
    { href: '/trust-center/cookie-policy' as const, label: t('nav.cookiePolicy') },
    { href: '/trust-center/data-request' as const, label: t('nav.dataRequest') },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur dark:bg-surface-50/80 border-b border-slate-200 dark:border-surface-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Left — Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl" role="img" aria-label="paw">
              🐾
            </span>
            <span className="text-primary-500 font-bold text-xl">UniPaws</span>
          </Link>

          {/* Center — Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === '/'
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
              )}
            >
              {t('nav.home')}
            </Link>

            <Link
              href="/providers"
              className={cn(
                'text-sm font-medium transition-colors',
                pathname.startsWith('/providers')
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
              )}
            >
              {t('nav.providers')}
            </Link>

            {/* Trust Center dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className={cn(
                  'flex items-center gap-1 text-sm font-medium transition-colors',
                  pathname.startsWith('/trust-center')
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white',
                )}
              >
                {t('nav.trustCenter')}
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', dropdownOpen && 'rotate-180')}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-surface-100 rounded-lg shadow-lg border border-slate-200 dark:border-surface-300 p-2">
                  {trustCenterLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setDropdownOpen(false)}
                      className={cn(
                        'block px-3 py-2 rounded-md text-sm transition-colors',
                        pathname === link.href
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400'
                          : 'text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-surface-200',
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right — Actions */}
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={handleLocaleSwitch}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-200 transition-colors"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">{locale.toUpperCase()}</span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-200 transition-colors"
              aria-label={isDark ? t('common.lightMode') : t('common.darkMode')}
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-surface-200 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isDark={isDark}
        onToggleDark={toggleDark}
      />
    </>
  );
}
