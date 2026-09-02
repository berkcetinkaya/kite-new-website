import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { WindPath } from "./WindPath";

/**
 * The page's closing chapter: About Kite's own bottom hint ("007 / LET'S
 * WORK TOGETHER") is this section's opening marker, and the Footer follows
 * directly with no buffer section between them — a strong CTA transitioning
 * straight into a compact footer, not another full-height section. Sized
 * down from the site's largest display step on purpose: this still reads
 * as the boldest statement on the page (nothing else sits on kite yellow),
 * it just no longer needs to out-shout every other headline to do it.
 */
export async function FinalCta() {
  const dict = await getDictionary();
  const { finalCta } = dict;

  return (
    <section id="contact" className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-kite py-lg xl:py-xl">
      <WindPath
        variant="desktop"
        className="pointer-events-none absolute inset-0 hidden opacity-30 xl:block"
      />

      <SiteContainer className="relative">
        <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
          {finalCta.folioNumber}
        </span>

        <h2 className="mt-md max-w-[16ch] font-display text-display-xl font-black uppercase leading-[1.05] text-ink xl:mt-lg">
          {finalCta.mainStatement.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="mt-sm max-w-[36ch] font-body text-body-lg text-ink-soft xl:mt-md">
          {finalCta.secondaryLine.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-lg xl:mt-xl">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-sm border border-ink bg-ink px-xl py-md font-body text-label font-semibold uppercase tracking-wide text-paper transition-editorial hover:bg-paper hover:text-ink"
          >
            <span>{finalCta.ctaLabel}</span>
            <span
              aria-hidden
              className="text-kite transition-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
            >
              ↗
            </span>
          </Link>
        </div>
      </SiteContainer>
    </section>
  );
}
