"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo, LanguageSwitcher } from "@/components/ui";
import type { Locale } from "@/lib/i18n/locales";

interface NavLabels {
  work: string;
  services: string;
  about: string;
  thinking: string;
  contact: string;
}

interface SocialLabels {
  instagram: string;
  linkedin: string;
  behance: string;
  email: string;
}

interface MobileNavProps {
  homeHref: string;
  brandName: string;
  brandType: string;
  locationShort: string;
  locationFull: string;
  globalNote: string;
  statement: string;
  currentLocale: Locale;
  nav: NavLabels;
  social: SocialLabels;
  menuEyebrow: string;
  openLabel: string;
  closeLabel: string;
  ariaLabel: string;
}

const PANEL_ID = "mobile-menu-panel";

export function MobileNav({
  homeHref,
  brandName,
  brandType,
  locationShort,
  locationFull,
  globalNote,
  statement,
  currentLocale,
  nav,
  social,
  menuEyebrow,
  openLabel,
  closeLabel,
  ariaLabel,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const navItems: Array<{ num: string; label: string; href: string }> = [
    { num: "01", label: nav.work, href: "#work" },
    { num: "02", label: nav.services, href: "#services" },
    { num: "03", label: nav.about, href: "#about" },
    { num: "04", label: nav.thinking, href: "#thinking" },
    { num: "05", label: nav.contact, href: "#contact" },
  ];

  const lineBase = "absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-paper transition-editorial";

  return (
    <>
      <div className="flex items-center justify-between py-sm">
        <span inert={open}>
          <Logo href={homeHref} size={40} alt={`${brandName} ${brandType}`} />
        </span>

        <span
          inert={open}
          className="flex items-center gap-2xs font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft"
        >
          <span>{locationShort}</span>
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
        </span>

        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls={PANEL_ID}
          aria-label={open ? closeLabel : openLabel}
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center bg-ink"
        >
          <span
            aria-hidden
            className={`${lineBase} ${open ? "translate-y-0 rotate-45" : "-translate-y-1.5"}`}
          />
          <span aria-hidden className={`${lineBase} ${open ? "opacity-0" : "opacity-100"}`} />
          <span
            aria-hidden
            className={`${lineBase} ${open ? "translate-y-0 -rotate-45" : "translate-y-1.5"}`}
          />
        </button>
      </div>

      <div
        id={PANEL_ID}
        inert={!open}
        className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-kite px-gutter py-sm"
        style={{
          clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition: "clip-path 420ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="flex items-center justify-between">
          <Logo href={homeHref} size={40} alt={`${brandName} ${brandType}`} />
          <span className="h-11 w-11 shrink-0" aria-hidden />
        </div>

        <div className="mt-md border-t border-line pt-2xs">
          <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink">
            {menuEyebrow}
          </span>
        </div>

        <nav aria-label={ariaLabel} className="mt-xs">
          <ol>
            {navItems.map(({ num, label, href }, i) => (
              <li key={label} className="border-b border-line">
                <Link
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-sm py-3xs"
                  style={{
                    transitionProperty: "opacity, transform",
                    transitionDuration: "280ms",
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                    transitionDelay: open ? `${90 + i * 45}ms` : "0ms",
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(10px)",
                  }}
                >
                  <span className="font-display text-display-sm font-extrabold tabular-nums leading-none text-ink">
                    {num}
                  </span>
                  <span className="font-display text-display-md leading-none text-ink transition-editorial group-hover:text-paper sm:text-display-lg">
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-auto border-t border-line pt-sm">
          <div className="flex items-center gap-2xs font-body text-label font-semibold uppercase tracking-wide text-ink">
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
            <span>{locationFull}</span>
          </div>
          <p className="mt-3xs font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
            {globalNote}
          </p>

          <p lang="en" className="mt-sm max-w-[26ch] font-display text-display-sm leading-tight text-ink">
            {statement}
          </p>

          <div className="mt-sm border-t border-line pt-2xs">
            <LanguageSwitcher currentLocale={currentLocale} />
          </div>
          <div className="mt-2xs flex flex-wrap items-center gap-x-sm gap-y-3xs pb-2xs font-body text-eyebrow font-semibold uppercase tracking-widest text-ink">
            <span lang="en">{social.instagram}</span>
            <span lang="en">{social.linkedin}</span>
            <span lang="en">{social.behance}</span>
            <span>{social.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}
