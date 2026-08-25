import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { ManifestoBody } from "./ManifestoBody";

/**
 * Capabilities' own bottom hint ("004 / MANİFESTO") is this section's
 * opening marker. A small folio number still appears near the top here —
 * unlike Phase 4→5, this is a genuine break to a black surface, so a quiet
 * page-folio mark (not a repeat of the hint's title) reads as a new spread
 * rather than a duplicated intro.
 */
export async function Manifesto() {
  const dict = await getDictionary();
  const { manifesto, brand } = dict;

  return (
    <section className="paper-texture-dark relative bg-ink pt-xl xl:pt-2xl">
      <SiteContainer>
        <span className="font-body text-eyebrow font-semibold uppercase tracking-widest text-paper-soft">
          {manifesto.folioNumber}
        </span>

        <div className="mt-lg xl:mt-2xl">
          <ManifestoBody statement1={manifesto.statement1} statement2={manifesto.statement2} />
        </div>

        <div className="mt-2xl border-t border-line-inverse pt-xl xl:mt-3xl xl:flex xl:items-end xl:justify-between xl:pt-2xl">
          <div>
            <p className="max-w-[26ch] font-body text-label font-semibold uppercase tracking-wide text-paper-soft">
              {manifesto.secondaryStatement.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p lang="en" className="mt-md max-w-[24ch] font-display text-display-sm leading-tight text-paper">
              {brand.statement}
            </p>
          </div>

          <div className="mt-xl flex flex-wrap items-center gap-x-sm gap-y-2xs font-body text-label font-semibold uppercase tracking-wide text-paper-soft xl:mt-0">
            {manifesto.microAnnotations.map((annotation, i) => (
              <span key={annotation} className="flex items-center gap-2xs">
                {i > 0 && (
                  <span aria-hidden className="text-line-inverse">
                    /
                  </span>
                )}
                {annotation}
              </span>
            ))}
          </div>
        </div>
      </SiteContainer>

      <div className="mt-2xl border-t border-line-inverse xl:mt-3xl">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-paper-soft">
            {manifesto.nextSectionHint.number} / {manifesto.nextSectionHint.title}
          </span>
          <span aria-hidden className="text-paper-soft">
            ↓
          </span>
        </SiteContainer>
      </div>
    </section>
  );
}
