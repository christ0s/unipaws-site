import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-surface-50">
      <div className="text-center px-6">
        <p className="text-6xl font-bold text-primary-500">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-slate-900 dark:text-white">
          Page not found
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/el"
          className="mt-6 inline-block rounded-lg bg-primary-500 px-6 py-3 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
