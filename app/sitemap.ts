import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/seo/site";

/**
 * Every public, indexable route — relative to a locale segment. The
 * internal `/design-system` and `/header-preview` QA routes are
 * deliberately not listed here (they also 404 outside `next dev` now,
 * see their own pages), so there's nothing to additionally exclude.
 */
const PATHS = ["", "/technology", "/privacy", "/terms"];

/**
 * `lastModified` is deliberately omitted rather than set. There's no
 * reliable per-page modification date available — each locale's content
 * lives in one shared file alongside everything else (so a git-log
 * timestamp would date-stamp every page identically regardless of which
 * one actually changed), and `new Date()` evaluated per request would
 * just report "now" on every fetch, which Google's own documentation
 * says it will learn to discount anyway. An absent date is preferable to
 * a misleading one; add this back only once genuine per-page dates exist
 * (e.g. when content moves to per-page source files with real commit
 * history, or a CMS supplies one).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]));

    return locales.map((locale) => ({
      url: languages[locale] as string,
      alternates: {
        languages: { ...languages, "x-default": `${SITE_URL}/${defaultLocale}${path}` },
      },
    }));
  });
}
