"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n/locales";
import { cn } from "@/lib/cn";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  /** "light" (default) is tuned for the paper surface; "dark" swaps in the paper-on-ink tokens for use on black sections like the footer. */
  variant?: "light" | "dark";
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
export function LanguageSwitcher({ currentLocale, className, variant = "light" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const dividerClass = variant === "dark" ? "text-line-inverse" : "text-ink-soft";
  const activeClass = variant === "dark" ? "text-paper" : "text-ink";
  const inactiveClass = variant === "dark" ? "text-paper-soft hover:text-paper" : "text-ink-soft hover:text-ink";

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
            <span aria-hidden className={dividerClass}>
              /
            </span>
          )}
          <Link
            href={swapLocale(pathname, locale)}
            aria-current={locale === currentLocale ? "page" : undefined}
            className={cn("transition-editorial", locale === currentLocale ? activeClass : inactiveClass)}
          >
            {localeLabels[locale]}
          </Link>
        </span>
      ))}
    </nav>
  );
}
