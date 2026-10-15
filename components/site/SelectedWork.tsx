import fs from "node:fs";
import path from "node:path";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, ArrowIcon } from "@/components/ui";
import { WorkGrid } from "./WorkGrid";
import { EditorialOverlay } from "./EditorialOverlay";
import { CaseStudies } from "./CaseStudies";

const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

/**
 * Looks for a real project image at /public/brand/{slug}.{ext} (the brand
 * asset roster lives there, not /public/work). Until artwork is supplied
 * for a given project, this resolves to undefined and WorkGrid renders its
 * dark editorial placeholder instead — dropping a file in later needs no
 * code change on either side.
 */
function resolveWorkImage(name: string): string | undefined {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const ext of IMAGE_EXTENSIONS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "brand", `${slug}.${ext}`))) {
      return `/brand/${slug}.${ext}`;
    }
  }
  return undefined;
}

/**
 * The hero's own bottom hint ("002 / SEÇİLİ İŞLER ... TÜM PROJELERİ GÖR")
 * is this section's heading row — see Hero.tsx's #next-section-hint. The
 * grid sits immediately beneath it with minimal top padding, matching the
 * master reference's dense, no-gap transition rather than a separate
 * intro block.
 */
export async function SelectedWork() {
  const dict = await getDictionary();
  const { work, ui, caseStudies } = dict;

  const projects = work.projects.map((project) => ({
    ...project,
    image: resolveWorkImage(project.name),
  }));

  return (
    <section id="work" className="relative scroll-mt-[var(--header-h)] bg-paper pt-[48px] xl:pt-[65px]">
      <SiteContainer>
        <WorkGrid projects={projects} featuredLabel={work.featuredLabel} statusOngoing={work.statusOngoing} cta={work.cta} />

        {/* Deep-dive access, not another homepage section: the same real
            engagements (CaseStudies, unchanged) that used to run as a full
            sequential section now open only on request — overview here,
            detail only if asked for. Sits inside the grid's own container as
            that grid's closing row rather than a separate bordered strip: a
            single top divider (the same restrained "row" language
            CapabilityRow/PrincipleRow use elsewhere — never a boxed top+bottom
            rule), a two-line title+support block, a generous click/tap
            target, and a subtle hover wash. */}
        <div className="mt-lg border-t border-line xl:mt-xl">
          <EditorialOverlay
            label={caseStudies.title}
            closeLabel={ui.closeLabel}
            topics={[]}
            panels={[<CaseStudies key="caseStudies" />]}
            actionLabel={caseStudies.exploreLabel}
            description={caseStudies.exploreSupport}
            triggerClassName="flex w-full items-center justify-between gap-md py-md text-left font-display text-display-sm font-black uppercase leading-none text-ink transition-editorial hover:bg-ink/[0.02] hover:text-kite-dark xl:py-lg xl:text-display-md"
            arrowClassName="text-kite-dark"
          />
        </div>
      </SiteContainer>

      <div className="mt-[24px] border-t border-line xl:mt-[26px]">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {work.nextSectionHint.number} / {work.nextSectionHint.title}
          </span>
          <span aria-hidden className="text-ink-soft">
            <ArrowIcon direction="down" />
          </span>
        </SiteContainer>
      </div>
    </section>
  );
}
