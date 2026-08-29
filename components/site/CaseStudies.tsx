import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { CaseStudyFeature } from "./CaseStudyFeature";
import { cn } from "@/lib/cn";

/**
 * "008 / İşin Arkasındaki İş" — Selected Work already shows the projects
 * visually; this section shows what actually happened behind three of
 * them, as full editorial features rather than another portfolio grid.
 * Ecru Atelier (case 02) carries the section's one dark interruption — see
 * CaseStudyFeature's `dark` branch. There's no hint bar left over from 007
 * to open this section with, so it renders its own inline "008" label,
 * same reasoning as every section since Soruşturma.
 */
export async function CaseStudies() {
  const dict = await getDictionary();
  const { caseStudies } = dict;
  const labels = {
    scope: caseStudies.scopeLabel,
    context: caseStudies.contextLabel,
    work: caseStudies.workLabel,
    system: caseStudies.systemLabel,
    ongoing: caseStudies.ongoingLabel,
  };

  return (
    <section className="relative bg-paper">
      <SiteContainer>
        <div className="pt-2xl xl:pt-3xl">
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {caseStudies.folioNumber}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
              {caseStudies.title}
            </span>
          </div>

          <h2 className="mt-md max-w-[22ch] font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-xl xl:leading-[1.08]">
            {caseStudies.introLines.map((segments, i) => (
              <span key={i} className="block">
                {segments.map((segment, j) => (
                  <span key={j} className={segment.accent ? "text-kite" : undefined}>
                    {segment.text}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="mt-md max-w-[52ch] font-body text-body-md text-ink-soft xl:mt-lg">{caseStudies.introSupport}</p>
        </div>
      </SiteContainer>

      <div className="mt-xl xl:mt-2xl">
        {caseStudies.cases.map((study) => (
          <CaseStudyFeature key={study.number} labels={labels} study={study} />
        ))}
      </div>

      <SiteContainer>
        <div className={cn("max-w-[30ch] border-t border-line py-2xl xl:py-3xl")}>
          <p className="font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-lg">
            {caseStudies.closing.map((segment, i) => (
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
