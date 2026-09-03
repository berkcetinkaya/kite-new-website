import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { WindPath } from "./WindPath";
import { ContactForm } from "./ContactForm";

/**
 * The page's closing chapter and its one real conversion moment: About
 * Kite's own bottom hint ("007 / LET'S WORK TOGETHER") is this section's
 * opening marker, and the Footer follows directly with no buffer section
 * between them. Black, not yellow — Kite yellow reads as an "interaction
 * state" (focus, a checked need, the submit button) precisely because the
 * surface itself isn't already yellow; it also carries the black↔black
 * hand-off straight into the Footer that the bottom-of-site redesign
 * established. Two columns on desktop (statement, then form) rather than
 * one long stack — the statement doesn't need to shrink to make room, and
 * the form doesn't need to wait for it.
 */
export async function FinalCta() {
  const dict = await getDictionary();
  const { finalCta } = dict;

  return (
    <section id="contact" className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-ink py-xl xl:py-2xl">
      <WindPath
        variant="desktop"
        className="pointer-events-none absolute inset-0 hidden opacity-[0.12] xl:block"
      />

      <SiteContainer className="relative">
        <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-paper-soft">
          {finalCta.folioNumber}
        </span>

        <div className="mt-md grid grid-cols-1 gap-2xl xl:mt-lg xl:grid-cols-12 xl:gap-x-xl">
          <div className="xl:col-span-5">
            <h2 className="max-w-[14ch] font-display text-display-xl font-black uppercase leading-[1.05] text-paper">
              {finalCta.mainStatement.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-md max-w-[36ch] font-body text-body-lg text-paper-soft">{finalCta.supportingCopy}</p>
          </div>

          <div className="xl:col-span-7">
            <ContactForm content={finalCta.form} />
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
