import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary, getLocale } from "@/lib/i18n/get-dictionary";
import { SiteContainer, LanguageSwitcher } from "@/components/ui";

function FooterNavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative font-display text-display-sm font-black uppercase leading-none text-paper transition-editorial hover:text-paper-soft xl:text-display-md"
    >
      {children}
    </Link>
  );
}

/**
 * Closing black surface — editorial, not a corporate multi-column
 * sitemap, and not a decorative one either: one brand block, one flat nav
 * row, then a single dense bottom bar carrying everything else (location,
 * social, language, copyright, legal) instead of three stacked rows each
 * with their own border and gap. That's the entire compactness strategy —
 * alignment doing the work empty vertical space used to, no oversized
 * wordmark standing in for content.
 */
export async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { brand, header, footer } = dict;

  const navItems = [
    { label: header.nav.work, href: "#work" },
    { label: header.nav.services, href: "#services" },
    { label: header.nav.about, href: "#about" },
    { label: header.mobileMenu.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="paper-texture-dark relative bg-ink pt-md pb-sm xl:pt-lg xl:pb-md">
      <SiteContainer>
        <div className="flex flex-col gap-sm xl:flex-row xl:items-baseline xl:justify-between">
          <p className="font-display text-display-md font-black uppercase leading-none text-paper xl:text-display-lg">
            {brand.name} {brand.agencyType}
          </p>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-md gap-y-2xs xl:items-baseline">
            {navItems.map((item) => (
              <FooterNavLink key={item.label} href={item.href}>
                {item.label}
              </FooterNavLink>
            ))}
          </nav>
        </div>

        <div className="mt-md flex flex-col gap-xs border-t border-line-inverse pt-sm font-body text-label font-semibold uppercase tracking-wide text-paper-soft xl:mt-lg xl:flex-row xl:flex-wrap xl:items-center xl:justify-between xl:pt-sm">
          <div className="flex flex-wrap items-center gap-x-sm gap-y-2xs">
            <span className="flex items-center gap-2xs">
              <span>{header.locationShort}</span>
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
              <span>{brand.globalNote}</span>
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-line-inverse xl:block" />
            <span lang="en">{header.mobileMenu.social.instagram}</span>
            <span lang="en">{header.mobileMenu.social.linkedin}</span>
            <span lang="en">{header.mobileMenu.social.behance}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-sm gap-y-2xs">
            <span>{footer.copyright}</span>
            <span lang="en">{footer.privacy}</span>
            <span lang="en">{footer.terms}</span>
            <LanguageSwitcher currentLocale={locale} variant="dark" />
          </div>
        </div>
      </SiteContainer>
    </footer>
  );
}
