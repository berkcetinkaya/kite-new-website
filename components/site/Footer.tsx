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
 *
 * The oversized "KITE" wordmark is a background layer, not extra content:
 * it's a direct child of <footer> (not SiteContainer), absolutely
 * positioned and z-stacked behind the real content, so it costs zero
 * additional footer height and can run edge-to-edge — cropping at the true
 * viewport edge rather than the content gutter is what makes it read as
 * architecture instead of decoration. Sized in vw so mobile and desktop
 * get deliberately different relationships to the word (mobile crops it
 * hard; desktop mostly clears it) rather than one composition scaled down.
 * Outlined, not filled, and at very low contrast against the near-black
 * surface, so it stays behind the paper-colored nav in visual weight.
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
    <footer className="paper-texture-dark relative overflow-hidden bg-ink pt-lg pb-md xl:pt-xl xl:pb-lg">
      <SiteContainer className="relative z-10">
        <div className="flex flex-col gap-md xl:flex-row xl:items-start xl:justify-between">
          <p className="font-display text-display-md font-black uppercase leading-none text-paper xl:text-display-lg">
            {brand.name} {brand.agencyType}
          </p>

          <nav aria-label="Footer" className="flex flex-col gap-xs xl:items-end">
            {navItems.map((item) => (
              <FooterNavLink key={item.label} href={item.href}>
                {item.label}
              </FooterNavLink>
            ))}
          </nav>
        </div>

        <div className="mt-lg flex flex-col gap-sm border-t border-line-inverse pt-md xl:mt-xl xl:flex-row xl:items-center xl:justify-between xl:pt-lg">
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

        <div className="mt-md flex flex-col gap-xs border-t border-line-inverse pt-sm font-body text-label font-semibold uppercase tracking-wide text-paper-soft xl:mt-lg xl:flex-row xl:items-center xl:justify-between">
          <span>{footer.copyright}</span>
          <div className="flex items-center gap-sm">
            <span lang="en">{footer.privacy}</span>
            <span lang="en">{footer.terms}</span>
          </div>
        </div>
      </SiteContainer>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-0.12em] z-0 select-none whitespace-nowrap text-center font-display font-black uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(242,238,228,0.16)] text-[64vw] xl:text-[15vw]"
      >
        {brand.name}
      </span>
    </footer>
  );
}
