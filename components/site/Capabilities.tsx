import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { InvestigationBoard } from "./InvestigationBoard";

/**
 * Selected Work's own bottom hint ("003 / NELER YAPIYORUZ") is this
 * section's opening marker — see SelectedWork.tsx. Same reasoning as
 * Phase 4: no repeated SectionLabel here.
 *
 * The capability index is a quick scan, not five editorial chapters
 * anymore: each discipline gets its number, its title, and the one
 * sentence it already had as its `statement` — no service-list grid, no
 * secondary "what we measure" layer, no per-row layout variants or dark
 * interruption. That fuller detail (`groups`, `secondary`, `supportingCopy`)
 * stays intact in the content dictionary and in CapabilityRow.tsx, just
 * unused by this lighter homepage view — nothing was deleted, only
 * un-rendered. This file owns the transition in from Selected Work (intro
 * + system index bar) and out into "004 / Soruşturma" — the interactive
 * interrogation board (InvestigationBoard), which is now the page's one
 * and only Section 004: it replaced the old closing manifesto statement +
 * system diagram, and the standalone Manifesto section that used to follow
 * it is gone from the homepage entirely. Soruşturma is the true close of
 * this section, so there's no bottom hint bar here — the section after it
 * picks up its own numbering in a later phase.
 */

export async function Capabilities() {
  const dict = await getDictionary();
  const { capabilities, investigation } = dict;

  return (
    <section id="services" className="relative scroll-mt-[var(--header-h)] bg-paper pt-lg xl:pt-xl">
      <SiteContainer>
        <div className="grid grid-cols-1 gap-sm xl:grid-cols-12 xl:gap-x-lg">
          <h2 className="font-display text-display-lg font-black uppercase leading-[1.0] text-ink xl:col-span-8 xl:text-display-2xl xl:leading-[1.03]">
            {capabilities.introStatement}
          </h2>
          <p className="font-body text-body-md text-ink-soft xl:col-span-4 xl:col-start-9 xl:self-start xl:pt-2xs">
            {capabilities.introSupport}
          </p>
        </div>

        {/* The intro's own signal: a fixed black baseline carries the six
            disciplines; a short yellow segment reads as Kite's active
            signal moving through the system, and advances the full width
            on hover — restrained, and already complete at rest. */}
        <div className="group/signal relative mt-lg pb-sm xl:mt-xl xl:pb-md">
          <div className="flex flex-wrap items-center gap-x-lg gap-y-xs xl:flex-nowrap xl:justify-between">
            {capabilities.systemLine.map((token, i) => (
              <div key={token} className="flex items-baseline gap-2xs">
                <span className="font-body text-[11px] font-semibold tabular-nums text-kite">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-body text-label font-semibold uppercase tracking-[0.2em] text-ink">
                  {token}
                </span>
              </div>
            ))}
          </div>
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-line" />
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-[2px] w-[30%] bg-kite transition-editorial group-hover/signal:w-full"
          />
        </div>
      </SiteContainer>

      <div className="mt-md border-t border-line xl:mt-lg">
        {capabilities.items.map((item) => (
          <div key={item.number} className="border-b border-line">
            <SiteContainer>
              <div className="flex flex-col gap-2xs py-md xl:flex-row xl:items-baseline xl:gap-x-lg xl:py-lg">
                <div className="flex items-baseline gap-sm xl:w-[32%] xl:shrink-0">
                  <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-kite-dark">
                    {item.number}
                  </span>
                  <h3 className="font-display text-display-sm font-black uppercase leading-none text-ink">
                    {item.title}
                  </h3>
                </div>
                <p className="font-body text-body-md text-ink-soft xl:max-w-[56ch]">
                  {item.statement.map((segment, i) => (
                    <span key={i} className={segment.accent ? "text-kite-dark" : undefined}>
                      {segment.text}
                    </span>
                  ))}
                </p>
              </div>
            </SiteContainer>
          </div>
        ))}
      </div>

      {/* Chapter-ending signal: marks the close of the five-discipline
          system before the investigation board, the same way a printed
          index closes a section — not a content band, just a signal. */}
      <div className="bg-kite py-[3px]">
        <SiteContainer>
          <p className="text-center font-body text-[8px] font-bold uppercase leading-none tracking-[0.35em] text-ink">
            {capabilities.systemLine.join(" · ")}
          </p>
        </SiteContainer>
      </div>

      <InvestigationBoard
        folioNumber={investigation.folioNumber}
        title={investigation.title}
        introLines={investigation.introLines}
        investigationDetails={investigation.investigationDetails}
        questions={investigation.questions}
        ending={investigation.ending}
        endingNote={investigation.endingNote}
      />
    </section>
  );
}
