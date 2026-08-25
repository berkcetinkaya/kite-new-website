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
 * sitemap: one brand block, one flat nav row, one metadata row (location /
 * social / language), one bottom line. No addresses, phone numbers or
 * fabricated stats.
 */
export async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { brand, header, footer } = dict;

  const navItems = [
    { label: header.nav.work, href: "#work" },
    { label: header.nav.services, href: "#services" },
    { label: header.nav.about, href: "#about" },
    { label: header.nav.thinking, href: "#thinking" },
    { label: header.mobileMenu.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="paper-texture-dark relative bg-ink pt-2xl pb-lg xl:pt-3xl xl:pb-xl">
      <SiteContainer>
        <div className="flex flex-col gap-2xl xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="font-display text-display-md font-black uppercase leading-none text-paper xl:text-display-lg">
              {brand.name} {brand.agencyType}
            </p>
            <p lang="en" className="mt-sm max-w-[26ch] font-display text-display-sm leading-tight text-paper-soft">
              {brand.statement}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-xs xl:items-end">
            {navItems.map((item) => (
              <FooterNavLink key={item.label} href={item.href}>
                {item.label}
              </FooterNavLink>
            ))}
          </nav>
        </div>

        <div className="mt-2xl flex flex-col gap-md border-t border-line-inverse pt-xl xl:mt-3xl xl:flex-row xl:items-center xl:justify-between xl:pt-2xl">
          <div className="flex items-center gap-2xs font-body text-label font-semibold uppercase tracking-wide text-paper-soft">
            <span>{header.locationShort}</span>
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-kite" />
            <span>{brand.globalNote}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-sm gap-y-2xs font-body text-label font-semibold uppercase tracking-wide text-paper-soft">
            <span lang="en">{header.mobileMenu.social.instagram}</span>
            <span lang="en">{header.mobileMenu.social.linkedin}</span>
            <span lang="en">{header.mobileMenu.social.behance}</span>
          </div>

          <LanguageSwitcher currentLocale={locale} variant="dark" />
        </div>

        <div className="mt-xl flex flex-col gap-xs border-t border-line-inverse pt-md font-body text-label font-semibold uppercase tracking-wide text-paper-soft xl:mt-2xl xl:flex-row xl:items-center xl:justify-between">
          <span>{footer.copyright}</span>
          <div className="flex items-center gap-sm">
            <span lang="en">{footer.privacy}</span>
            <span lang="en">{footer.terms}</span>
          </div>
        </div>
      </SiteContainer>
    </footer>
  );
}
