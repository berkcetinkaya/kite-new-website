import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/locales";

const BASE_URL = "https://kitegrowth.com";

/** Every public, indexable route — relative to a locale segment. */
const PATHS = ["", "/technology", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.flatMap((path) => {
    const languages = Object.fromEntries(locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`]));

    return locales.map((locale) => ({
      url: languages[locale] as string,
      lastModified,
      alternates: { languages },
    }));
  });
}
