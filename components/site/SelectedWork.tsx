import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { ProjectIndex } from "./ProjectIndex";

/**
 * The hero's own bottom hint ("002 / SEÇİLİ İŞLER") is this section's
 * opening marker — see Hero.tsx's #next-section-hint. Deliberately no
 * second SectionLabel here: repeating the same number/title immediately
 * below it read as a duplicated intro rather than one continuous chapter.
 */
export async function SelectedWork() {
  const dict = await getDictionary();
  const { work } = dict;

  return (
    <section className="relative bg-paper pt-xl xl:pt-2xl">
      <SiteContainer>
        <p className="max-w-[22ch] font-display text-display-sm font-black uppercase leading-tight text-ink-soft">
          {work.supportingLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-xl xl:mt-2xl">
          <ProjectIndex
            projects={work.projects}
            featuredLabel={work.featuredLabel}
            statusOngoing={work.statusOngoing}
          />
        </div>
      </SiteContainer>

      <div className="mt-xl border-t border-line xl:mt-2xl">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {work.nextSectionHint.number} / {work.nextSectionHint.title}
          </span>
          <span aria-hidden className="text-ink-soft">
            ↓
          </span>
        </SiteContainer>
      </div>
    </section>
  );
}
