import type { Metadata } from 'next';
import { inter } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://unipaws.gr'),
  title: {
    default: 'UniPaws',
    template: '%s | UniPaws',
  },
  description: 'The first pet blood donation network in Greece. Save lives with a single tap.',
  openGraph: {
    type: 'website',
    locale: 'el_GR',
    alternateLocale: 'en_US',
    siteName: 'UniPaws',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-[family-name:var(--font-inter)] antialiased">
        {children}
      </body>
    </html>
  );
}
