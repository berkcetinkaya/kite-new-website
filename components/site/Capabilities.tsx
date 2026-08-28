import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { CapabilityRow, type CapabilityRowVariant } from "./CapabilityRow";
import { InvestigationBoard } from "./InvestigationBoard";

/**
 * Selected Work's own bottom hint ("003 / NELER YAPIYORUZ") is this
 * section's opening marker — see SelectedWork.tsx. Same reasoning as
 * Phase 4: no repeated SectionLabel here.
 *
 * The capability index itself is five editorial chapters (CapabilityRow),
 * not a grid of cards — see that component for the row structure and its
 * variants. Row 03 (index 2, Creative & Content) is the section's one
 * deliberate black interruption; the others rotate through three layout
 * variants so the index reads as one system with rhythm rather than five
 * repeats of one template. This file owns the transition in from Selected
 * Work (intro + system index bar) and out into "004 / Soruşturma" — the
 * interactive interrogation board (InvestigationBoard), which is now the
 * page's one and only Section 004: it replaced the old closing manifesto
 * statement + system diagram, and the standalone Manifesto section that
 * used to follow it is gone from the homepage entirely. Soruşturma is the
 * true close of this section, so there's no bottom hint bar here — the
 * section after it picks up its own numbering in a later phase.
 */
const DARK_ROW_INDEX = 2;
const ROW_VARIANTS: CapabilityRowVariant[] = ["standard", "technical", "standard", "statement-forward", "data-grid"];

export async function Capabilities() {
  const dict = await getDictionary();
  const { capabilities, investigation } = dict;

  return (
    <section id="services" className="relative scroll-mt-[var(--header-h)] bg-paper pt-lg xl:pt-xl">
      <SiteContainer>
        <div className="grid grid-cols-1 gap-sm xl:grid-cols-12 xl:gap-x-lg">
          <h2 className="font-display text-display-lg font-black uppercase leading-[0.95] text-ink xl:col-span-8 xl:text-display-2xl">
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

      <div className="mt-md xl:mt-lg">
        {capabilities.items.map((item, i) => (
          <CapabilityRow
            key={item.number}
            item={item}
            index={i}
            total={capabilities.items.length}
            dark={i === DARK_ROW_INDEX}
            variant={ROW_VARIANTS[i]}
          />
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
