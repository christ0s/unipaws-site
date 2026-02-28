export const locales = ['el', 'en'] as const;
export const defaultLocale = 'el' as const;

export type Locale = (typeof locales)[number];
