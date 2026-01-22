import type { APIRoute } from 'astro'

import { baseLocale, locales, localizeHref } from '@/i18n/runtime'
import type { SiteMapChangeFrequency } from '@/types'

const createStaticSitemapEntry = (
  pathname: string,
  changefreq: SiteMapChangeFrequency = 'monthly',
  priority: number = 1.0,
  lastMod?: string,
) => {
  return `
    <url>
      <loc>
        ${localizeHref(pathname, { locale: baseLocale })}
      </loc>
      ${locales
        .filter((locale) => locale !== baseLocale)
        .map(
          (locale) =>
            `<xhtml:link rel="alternate" hreflang="${locale}" href="${localizeHref(pathname, { locale })}" />`,
        )
        .join('\n    ')}
      ${lastMod ? `<lastmod>${lastMod}</lastmod>` : ''}
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `
}

export const GET: APIRoute = async () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${createStaticSitemapEntry('')}
    ${createStaticSitemapEntry('about')}
    ${createStaticSitemapEntry('privacy-policy')}
    ${createStaticSitemapEntry('terms-of-service')}
    ${createStaticSitemapEntry('cookie-policy')}
    ${createStaticSitemapEntry('accessibility')}
  </urlset>`.trim()

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
