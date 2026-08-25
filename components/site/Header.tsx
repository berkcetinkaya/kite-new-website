import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { Logo, LanguageSwitcher } from "@/components/ui";
import { MobileNav } from "./MobileNav";

/**
 * Small, local nav-link treatment: underline reveal on hover AND
 * keyboard focus. Deliberately not the shared TextLink primitive — that
 * component always renders an arrow, which main nav items shouldn't have.
 */
function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative font-body text-label font-semibold uppercase tracking-wide text-ink"
    >
      {children}
      <span
        aria-hidden
        className="absolute -bottom-[3px] left-0 h-px w-full origin-left scale-x-0 bg-kite-dark transition-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}

export async function Header() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const homeHref = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <a
        href="#content"
        className="sr-only font-body text-label font-semibold uppercase tracking-wide text-ink focus:not-sr-only focus:fixed focus:left-gutter focus:top-sm focus:z-[100] focus:bg-kite focus:px-md focus:py-xs"
      >
        {dict.ui.skipToContent}
      </a>
      <div className="mx-auto w-full max-w-container px-gutter">
        {/* Desktop / wide navigation — active from xl (1280px) up. Kept off
            below that so the tablet band (around 1024px) gets the clean
            mobile composition instead of a compressed desktop nav. */}
        <div className="hidden items-stretch justify-between xl:flex">
          <div className="flex items-center gap-xl py-sm">
            <Logo href={homeHref} size={48} alt={`${dict.brand.name} ${dict.brand.agencyType}`} />
            <nav aria-label="Main" className="flex items-center gap-xl">
              <NavLink href="#work">{dict.header.nav.work}</NavLink>
              <NavLink href="#services">{dict.header.nav.services}</NavLink>
              <NavLink href="#about">{dict.header.nav.about}</NavLink>
              <NavLink href="#thinking">{dict.header.nav.thinking}</NavLink>
            </nav>
          </div>

          <div className="flex items-stretch gap-lg">
            <div className="flex items-center gap-2xs py-sm font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
              <span>{dict.header.locationShort}</span>
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
            </div>

            <div className="flex items-center py-sm">
              <LanguageSwitcher currentLocale={locale} />
            </div>

            <Link
              href="#contact"
              className="group relative -my-sm -mr-gutter flex shrink-0 items-center gap-2xs self-stretch bg-ink px-lg font-body text-label font-semibold uppercase tracking-wide text-paper transition-editorial hover:bg-kite hover:text-ink"
            >
              <span>{dict.header.cta}</span>
              <span
                aria-hidden
                className="text-kite transition-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
              >
                ↗
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile / tablet navigation — below xl (1280px). */}
        <div className="xl:hidden">
          <MobileNav
            homeHref={homeHref}
            brandName={dict.brand.name}
            brandType={dict.brand.agencyType}
            locationShort={dict.header.locationShort}
            locationFull={dict.brand.location}
            globalNote={dict.brand.globalNote}
            statement={dict.brand.statement}
            currentLocale={locale}
            nav={dict.header.mobileMenu.nav}
            social={dict.header.mobileMenu.social}
            menuEyebrow={dict.header.mobileMenu.menuEyebrow}
            openLabel={dict.header.mobileMenu.openLabel}
            closeLabel={dict.header.mobileMenu.closeLabel}
            ariaLabel={dict.header.mobileMenu.ariaLabel}
          />
        </div>
      </div>
    </header>
  );
}
