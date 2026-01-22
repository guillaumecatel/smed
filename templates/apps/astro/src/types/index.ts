import type { Locale } from '@/i18n/runtime'

export type AlternativeHrefLang = {
  locale: Locale
  href: string
}

export type SiteMapChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'
