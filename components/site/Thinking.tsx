import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SiteContainer, ArrowIcon } from "@/components/ui";
import { TopicIndex } from "./TopicIndex";

/**
 * "013 / Thinking" — Kite's own point of view, not a blog. Three topic
 * teasers stand in for a future insights space; deliberately no dates,
 * authors or reading times, since nothing here is actually published yet.
 */
export async function Thinking() {
  const dict = await getDictionary();
  const { thinking } = dict;

  return (
    <section id="thinking" className="relative scroll-mt-[var(--header-h)] bg-paper pt-xl xl:pt-2xl">
      <SiteContainer>
        <div className="flex items-baseline gap-sm">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {thinking.folioNumber}
          </span>
          <span className="font-body text-label font-semibold uppercase tracking-widest text-ink-soft">
            {thinking.title}
          </span>
        </div>

        <h2 className="mt-md max-w-[20ch] font-display text-display-lg font-black uppercase leading-[0.97] text-ink xl:mt-lg xl:text-display-xl">
          {thinking.mainStatement.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-2xl xl:mt-3xl">
          <TopicIndex topics={thinking.topics} />
        </div>
      </SiteContainer>

      <div className="mt-xl border-t border-line xl:mt-2xl">
        <SiteContainer className="flex items-center justify-between py-xs">
          <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft">
            {thinking.nextSectionHint.number} / {thinking.nextSectionHint.title}
          </span>
          <span aria-hidden className="text-ink-soft">
            <ArrowIcon direction="down" />
          </span>
        </SiteContainer>
      </div>
    </section>
  );
}
