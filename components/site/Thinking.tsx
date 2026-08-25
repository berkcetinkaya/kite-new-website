import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer } from "@/components/ui";
import { ArticleIndex } from "./ArticleIndex";

/**
 * KITE's own bottom hint ("006 / THINKING") is this section's opening
 * marker — paper stays paper here (no background change), so same
 * no-repeated-intro convention as Selected Work and Capabilities: no
 * SectionLabel or folio number at the top.
 */
export async function Thinking() {
  const dict = await getDictionary();
  const { thinking } = dict;

  return (
    <section className="relative bg-paper pt-xl xl:pt-2xl">
      <SiteContainer>
        <p className="max-w-[20ch] font-display text-display-lg font-black uppercase leading-[0.97] text-ink xl:text-display-xl">
          {thinking.mainStatement.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>

        <div className="mt-2xl xl:mt-3xl">
          <ArticleIndex articles={thinking.articles} />
        </div>
      </SiteContainer>

      <div className="mt-xl border-t border-line xl:mt-2xl">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {thinking.nextSectionHint.number} / {thinking.nextSectionHint.title}
          </span>
          <span aria-hidden className="text-ink-soft">
            ↓
          </span>
        </SiteContainer>
      </div>
    </section>
  );
}
