import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, PrimaryButton } from "@/components/ui";
import { CollaborationModel } from "./CollaborationModel";
import { cn } from "@/lib/cn";

/**
 * "009 / Bizimle Nasıl Çalışabilirsiniz?" — four collaboration models as an
 * editorial index, not pricing tiers: no price, no tiers, no comparison
 * checkmarks. Growth Partnership (model 01) carries `priority` for its
 * slightly stronger visual weight; Creative Performance (model 02) carries
 * `dark` for the section's one inversion — see CollaborationModel.tsx.
 * There's no hint bar left over from 008 to open this section with, so it
 * renders its own inline "009" label, same reasoning as every section
 * since Soruşturma.
 */
export async function Collaboration() {
  const dict = await getDictionary();
  const { collaboration } = dict;

  return (
    <section className="relative bg-paper">
      <SiteContainer>
        <div className="pt-2xl xl:pt-3xl">
          <div className="flex items-baseline gap-sm">
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
              {collaboration.folioNumber}
            </span>
            <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
              {collaboration.title}
            </span>
          </div>

          <h2 className="mt-md max-w-[22ch] font-display text-display-md font-black uppercase leading-[1.05] text-ink xl:text-display-xl xl:leading-[1.08]">
            {collaboration.introLines.map((segments, i) => (
              <span key={i} className="block">
                {segments.map((segment, j) => (
                  <span key={j} className={segment.accent ? "text-kite" : undefined}>
                    {segment.text}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <p className="mt-md max-w-[52ch] font-body text-body-md text-ink-soft xl:mt-lg">{collaboration.introSupport}</p>
        </div>
      </SiteContainer>

      <div className="mt-xl xl:mt-2xl">
        {collaboration.models.map((model, i) => (
          <CollaborationModel
            key={model.number}
            model={model}
            isLast={i === collaboration.models.length - 1}
            priorityLabel={collaboration.priorityLabel}
            bestForLabel={collaboration.bestForLabel}
            scopeLabel={collaboration.scopeLabel}
            workingModelLabel={collaboration.workingModelLabel}
          />
        ))}
      </div>

      <SiteContainer>
        <div className={cn("max-w-[36ch] py-2xl xl:py-3xl")}>
          <p className="font-display text-display-md font-black uppercase leading-[1.08] text-ink xl:text-display-lg">
            {collaboration.ctaHeadline.map((segment, i) => (
              <span key={i} className={cn("block", segment.accent && "text-kite")}>
                {segment.text}
              </span>
            ))}
          </p>
          <p className="mt-sm max-w-[48ch] font-body text-body-md text-ink-soft">{collaboration.ctaSupport}</p>
          <PrimaryButton href="#contact" className="mt-lg">
            {collaboration.ctaLabel}
          </PrimaryButton>
        </div>
      </SiteContainer>
    </section>
  );
}
