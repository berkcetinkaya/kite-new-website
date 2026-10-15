import { locales, defaultLocale, type Locale } from "@/lib/i18n/locales";

/**
 * The canonical production domain (with `www`, per the live redirect
 * configuration). Every canonical tag, hreflang alternate, sitemap entry,
 * robots.txt reference, and absolute OG/Twitter image URL on the site is
 * derived from this one constant — if the production redirect ever flips
 * (e.g. to the apex domain), this is the only place that needs to change.
 */
export const SITE_URL = "https://www.kitegrowth.com";

/**
 * Self-referencing canonical plus reciprocal hreflang alternates (and an
 * `x-default` pointing at the default locale) for one localized path, e.g.
 * `localizedAlternates("tr", "/technology")`. `path` is the part after the
 * locale segment — "" for the homepage, "/technology" for that page, etc.
 */
export function localizedAlternates(locale: Locale, path: string = "") {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])) as Record<Locale, string>;

  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      ...languages,
      "x-default": `${SITE_URL}/${defaultLocale}${path}`,
    },
  };
}
