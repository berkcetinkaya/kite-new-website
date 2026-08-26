import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { WorkGrid } from "./WorkGrid";

/**
 * The hero's own bottom hint ("002 / SEÇİLİ İŞLER ... TÜM PROJELERİ GÖR")
 * is this section's heading row — see Hero.tsx's #next-section-hint. The
 * grid sits immediately beneath it with minimal top padding, matching the
 * master reference's dense, no-gap transition rather than a separate
 * intro block.
 */
export async function SelectedWork() {
  const dict = await getDictionary();
  const { work } = dict;

  return (
    <section id="work" className="relative scroll-mt-[var(--header-h)] bg-paper pt-lg xl:pt-xl">
      <SiteContainer>
        <WorkGrid
          projects={work.projects}
          featuredLabel={work.featuredLabel}
          statusOngoing={work.statusOngoing}
        />
      </SiteContainer>

      <div className="border-t border-line">
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
