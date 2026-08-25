"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/cn";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  segments[1] = target;
  return segments.join("/") || `/${target}`;
}

/**
 * TR / EN toggle. Swaps only the leading locale segment so it keeps the
 * viewer on the equivalent path once localized routes beyond "/" exist.
 */
export function LanguageSwitcher({ currentLocale, className }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Language"
      className={cn(
        "flex items-center gap-2xs font-body text-label font-semibold uppercase tracking-wide",
        className,
      )}
    >
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-2xs">
          {index > 0 && (
            <span aria-hidden className="text-ink-soft">
              /
            </span>
          )}
          <Link
            href={swapLocale(pathname, locale)}
            aria-current={locale === currentLocale ? "page" : undefined}
            className={cn(
              "transition-editorial",
              locale === currentLocale ? "text-ink" : "text-ink-soft hover:text-ink",
            )}
          >
            {localeLabels[locale]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
