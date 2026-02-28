'use client';

export const runtime = 'edge';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { AlertTriangle, CheckCircle, Download, Trash2 } from 'lucide-react';

type RequestType = 'export' | 'delete';

export default function DataRequestPage() {
  const t = useTranslations('dsar');

  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState<RequestType>('export');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay; Supabase integration comes later
    await new Promise((resolve) => setTimeout(resolve, 600));

    setSubmitted(true);
    setLoading(false);
  }

  if (submitted) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {t('title')}
        </h1>

        <div
          role="alert"
          className="mt-8 flex items-start gap-3 rounded-xl border border-success-200 bg-success-50 p-4 dark:border-success-700 dark:bg-dark-success-bg"
        >
          <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success-600 dark:text-success-500" />
          <p className="text-sm text-success-700 dark:text-success-200">
            {t('success')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {t('title')}
      </h1>
      <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">
        {t('subtitle')}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Email field */}
        <div>
          <label
            htmlFor="dsar-email"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {t('email')}
          </label>
          <input
            id="dsar-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-surface-300 dark:bg-surface-100 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-primary-400"
          />
        </div>

        {/* Request type */}
        <fieldset>
          <legend className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            {t('requestType')}
          </legend>

          <div className="mt-3 space-y-3">
            {/* Export option */}
            <label
              htmlFor="type-export"
              className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-colors ${
                requestType === 'export'
                  ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500 dark:border-primary-400 dark:bg-primary-500/10 dark:ring-primary-400'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-surface-300 dark:bg-surface-100 dark:hover:border-surface-400'
              }`}
            >
              <input
                id="type-export"
                type="radio"
                name="requestType"
                value="export"
                checked={requestType === 'export'}
                onChange={() => setRequestType('export')}
                className="sr-only"
              />
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  requestType === 'export'
                    ? 'border-primary-500 dark:border-primary-400'
                    : 'border-slate-300 dark:border-surface-400'
                }`}
              >
                {requestType === 'export' && (
                  <div className="h-2.5 w-2.5 rounded-full bg-primary-500 dark:bg-primary-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4 text-primary-500" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {t('exportData')}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t('exportDescription')}
                </p>
              </div>
            </label>

            {/* Delete option */}
            <label
              htmlFor="type-delete"
              className={`flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-colors ${
                requestType === 'delete'
                  ? 'border-danger-500 bg-danger-50 ring-1 ring-danger-500 dark:border-danger-400 dark:bg-dark-danger-bg dark:ring-danger-400'
                  : 'border-slate-200 bg-white hover:border-slate-300 dark:border-surface-300 dark:bg-surface-100 dark:hover:border-surface-400'
              }`}
            >
              <input
                id="type-delete"
                type="radio"
                name="requestType"
                value="delete"
                checked={requestType === 'delete'}
                onChange={() => setRequestType('delete')}
                className="sr-only"
              />
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                  requestType === 'delete'
                    ? 'border-danger-500 dark:border-danger-400'
                    : 'border-slate-300 dark:border-surface-400'
                }`}
              >
                {requestType === 'delete' && (
                  <div className="h-2.5 w-2.5 rounded-full bg-danger-500 dark:bg-danger-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4 text-danger-500" />
                  <span className="text-sm font-medium text-slate-900 dark:text-white">
                    {t('deleteAccount')}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {t('deleteDescription')}
                </p>
              </div>
            </label>
          </div>
        </fieldset>

        {/* Warning for delete */}
        {requestType === 'delete' && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-warning-200 bg-warning-50 p-4 dark:border-warning-700 dark:bg-dark-warning-bg"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning-600 dark:text-warning-500" />
            <p className="text-sm text-warning-700 dark:text-warning-200">
              {t('warning')}
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-600 focus:ring-2 focus:ring-primary-500/20 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-offset-surface-50"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {t('submitRequest')}
            </span>
          ) : (
            t('submitRequest')
          )}
        </button>
      </form>
    </div>
  );
}
