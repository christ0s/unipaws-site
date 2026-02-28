'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const COOKIE_CONSENT_KEY = 'cookie_consent';

export function CookieBanner() {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-surface-100 shadow-lg border-t border-slate-200 dark:border-surface-300">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {t('cookies.banner.message')}
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleAccept}
            className="bg-primary-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            {t('cookies.banner.accept')}
          </button>
          <button
            onClick={handleReject}
            className="text-slate-500 dark:text-slate-400 px-4 py-2 text-sm hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            {t('cookies.banner.reject')}
          </button>
        </div>
      </div>
    </div>
  );
}
