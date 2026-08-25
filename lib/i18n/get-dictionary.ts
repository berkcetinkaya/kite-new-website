import { locale as localeParam } from "next/root-params";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "./locales";
import type { SiteDictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<SiteDictionary>> = {
  tr: () => import("@/content/tr").then((mod) => mod.default),
  en: () => import("@/content/en").then((mod) => mod.default),
};

/**
 * Resolves the active locale from the root `[locale]` segment. Uses
 * next/root-params so any Server Component or server utility can call this
 * without prop-drilling `params` down from the page.
 */
export async function getLocale(): Promise<Locale> {
  const raw = await localeParam();
  if (!isLocale(raw)) notFound();
  return raw;
}

export async function getDictionary(): Promise<SiteDictionary> {
  const locale = await getLocale();
  return dictionaries[locale]();
}
