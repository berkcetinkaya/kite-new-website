import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { WindPath } from "./WindPath";

/**
 * Thinking's own bottom hint ("007 / LET'S WORK TOGETHER") is this
 * section's opening marker. A quiet folio number still appears at the top
 * — same reasoning as Manifesto and Kite: paper → yellow is a genuine
 * surface change, so a small page-folio reads as a new spread rather than
 * a duplicated intro. This is the closing chapter of the page, so there is
 * no bottom "next section" hint here — the Footer follows directly.
 */
export async function FinalCta() {
  const dict = await getDictionary();
  const { finalCta } = dict;

  return (
    <section id="contact" className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-kite py-2xl xl:py-4xl">
      <WindPath
        variant="desktop"
        className="pointer-events-none absolute inset-0 hidden opacity-30 xl:block"
      />

      <SiteContainer className="relative">
        <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-ink-soft">
          {finalCta.folioNumber}
        </span>

        <h2 className="mt-lg max-w-[16ch] font-display text-display-2xl font-black uppercase leading-[0.92] text-ink xl:mt-xl">
          {finalCta.mainStatement.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="mt-lg max-w-[36ch] font-body text-body-lg text-ink-soft xl:mt-xl">
          {finalCta.secondaryLine.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-xl xl:mt-2xl">
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
