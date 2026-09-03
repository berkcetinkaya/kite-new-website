import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, ArrowIcon, LoopIcon } from "@/components/ui";
import { FirstMonthPhase } from "./FirstMonthPhase";
import { cn } from "@/lib/cn";

/**
 * "007 / İlk 30 Gün" — the natural next question after 006 explained the
 * system: what actually happens once we start. One continuous editorial
 * timeline (FirstMonthPhase × 3) carries a single kite-yellow rail through
 * phases 01–03; phase 04 ("Döngü Başlıyor") breaks from that rail onto a
 * black surface — the section's one deliberate interruption, since it marks
 * the moment setup ends and continuous operation begins. Off-white intro
 * and closing bracket it, same paper → black → paper rhythm as 004–006, so
 * there's no hint bar left over to open this section — it renders its own
 * inline "007" label, same reasoning as every black-interrupted section
 * before it.
 */
export async function FirstMonth() {
  const dict = await getDictionary();
  const { firstMonth } = dict;
  const [phase01, phase02, phase03, phase04] = firstMonth.phases;

  return (
    <section className="relative bg-paper">
      <SiteContainer>
        <div className="pt-2xl xl:pt-3xl">
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {firstMonth.folioNumber}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
              {firstMonth.title}
            </span>
          </div>

          <h2 className="mt-md max-w-[22ch] font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-xl xl:leading-[1.08]">
            {firstMonth.introLines.map((segments, i) => (
              <span key={i} className="block">
                {segments.map((segment, j) => (
                  <span key={j} className={segment.accent ? "text-kite" : undefined}>
                    {segment.text}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="mt-md max-w-[52ch] font-body text-body-md text-ink-soft xl:mt-lg">{firstMonth.introSupport}</p>
        </div>
      </SiteContainer>

      {/* The master timeline: one continuous kite-yellow rail behind phases
          01–03, shared by every FirstMonthPhase's own marker (see that
          component — both sit at the same -left-lg offset within this
          wrapper's own pl-lg gutter, so the line reads as unbroken). */}
      <SiteContainer>
        <div className="relative mt-xl pl-lg xl:mt-2xl">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-[2px] bg-kite" />
          {[phase01, phase02, phase03].map(
            (phase, i) => phase && <FirstMonthPhase key={phase.number} phase={phase} isLast={i === 2} />,
          )}
        </div>
      </SiteContainer>

      {/* Phase 04 — the one deliberate black interruption: setup ends, the
          learning loop begins. */}
      {phase04 && (
        <div className="relative bg-ink">
          <SiteContainer>
            <div className="relative pl-lg py-2xl xl:py-3xl">
              <span aria-hidden className="absolute -left-lg top-xl h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-kite" />

              <div className="grid grid-cols-1 gap-y-lg xl:grid-cols-12 xl:gap-x-lg">
                <div className="xl:col-span-3">
                  <span className="font-body text-[11px] font-semibold uppercase tracking-widest text-kite">
                    {phase04.timeLabel}
                  </span>
                  <div className="mt-2xs flex items-baseline gap-sm">
                    <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-paper-soft">
                      {phase04.number}
                    </span>
                    {phase04.microLabel && (
                      <span className="font-body text-[9px] font-semibold uppercase tracking-widest text-[rgba(242,238,228,0.4)]">
                        {phase04.microLabel}
                      </span>
                    )}
                  </div>
                </div>

                <div className="xl:col-span-9 xl:border-l xl:border-[rgba(242,238,228,0.16)] xl:pl-lg">
                  <h3 className="max-w-[18ch] font-display text-display-md font-black uppercase leading-[1.05] text-paper xl:text-display-lg">
                    {phase04.title}
                  </h3>
                  <p className="mt-sm max-w-[46ch] font-body text-body-md text-paper-soft">{phase04.statement}</p>

                  {phase04.loopSequence && (
                    <div className="mt-xl flex flex-wrap items-baseline gap-x-2xs gap-y-xs border-t border-[rgba(242,238,228,0.16)] pt-lg font-display text-display-sm font-black uppercase leading-none text-paper xl:text-display-md">
                      {phase04.loopSequence.map((step, i, arr) => (
                        <span key={step} className="flex items-baseline gap-2xs">
                          {i > 0 && (
                            <span aria-hidden className="text-body-md text-[rgba(242,238,228,0.4)]">
                              <ArrowIcon direction="right" />
                            </span>
                          )}
                          <span className={i === arr.length - 1 ? "text-kite" : undefined}>{step}</span>
                        </span>
                      ))}
                      <span aria-hidden className="ml-2xs text-display-sm text-kite xl:text-display-md">
                        <LoopIcon />
                      </span>
                    </div>
                  )}

                  {phase04.questions && (
                    <div className="mt-lg grid grid-cols-1 gap-x-lg gap-y-sm sm:grid-cols-2">
                      {phase04.questions.map((question) => (
                        <p
                          key={question}
                          className="border-t border-[rgba(242,238,228,0.16)] pt-sm font-display text-body-lg font-black uppercase leading-[1.1] text-paper"
                        >
                          {question}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SiteContainer>
        </div>
      )}

      <SiteContainer>
        <div className="max-w-[26ch] py-2xl xl:py-3xl">
          <p className="font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-lg">
            {firstMonth.closing.map((segment, i) => (
              <span key={i} className={cn("block", segment.accent && "text-kite")}>
                {segment.text}
              </span>
            ))}
          </p>
        </div>
      </SiteContainer>
    </section>
  );
}
