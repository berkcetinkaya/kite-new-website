import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { DiagnosisRow, type DiagnosisRowVariant } from "./DiagnosisRow";

const ROW_VARIANTS: DiagnosisRowVariant[] = ["classic", "stages", "funnel", "scaled", "technical", "finale"];

/**
 * "005 / Teşhis" — the perspective shift after Soruşturma: 003 explains what
 * Kite does, 004 shows how Kite thinks, and this section names the six
 * business problems that actually bring a brand in the door. Back on the
 * paper surface after 004's black interruption — a genuine background
 * change, so this section renders its own inline "005" label the same way
 * Soruşturma renders its own "004" (see InvestigationBoard.tsx): there's no
 * bottom hint bar left over from 004 to open this section for it.
 *
 * Six editorial diagnosis rows (DiagnosisRow), each carrying its own variant
 * so the section reads as six distinct case files rather than six repeats of
 * one template — see that component for the per-row treatment. Row 06 is
 * the section's deliberate culmination: a full-bleed kite-yellow band around
 * its conclusion, closing on the exact line that sets up the next,
 * not-yet-built section (006 / Kite Growth System).
 */
export async function Diagnosis() {
  const dict = await getDictionary();
  const { diagnosis } = dict;

  return (
    <section className="relative bg-paper">
      <SiteContainer>
        <div className="pt-2xl xl:pt-3xl">
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {diagnosis.folioNumber}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
              {diagnosis.title}
            </span>
          </div>

          <h2 className="mt-md max-w-[24ch] font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-xl xl:leading-[1.08]">
            {diagnosis.introLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-md max-w-[52ch] font-body text-body-md text-ink-soft xl:mt-lg">{diagnosis.introSupport}</p>
        </div>
      </SiteContainer>

      <div className="mt-lg xl:mt-xl">
        {diagnosis.problems.map((problem, i) => (
          <DiagnosisRow key={problem.number} problem={problem} variant={ROW_VARIANTS[i] ?? "classic"} />
        ))}
      </div>
    </section>
  );
}
