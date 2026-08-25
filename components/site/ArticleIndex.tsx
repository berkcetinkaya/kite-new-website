interface Article {
  number: string;
  title: string[];
  dek?: string;
  category: string;
  readTime: string;
  slug: string;
}

interface ArticleIndexProps {
  articles: Article[];
}

/**
 * Editorial index, not a card grid: each entry is a full-width row behind a
 * strong rule, hover only nudges the title and arrow (pure CSS, no JS
 * needed) — so mobile keeps every piece of information visible without
 * relying on a hover state. No detail route exists yet; `slug` is carried
 * on the data now so a real href can be wired in later without a schema
 * change.
 */
export function ArticleIndex({ articles }: ArticleIndexProps) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.number} className="border-t border-line last:border-b">
          <button type="button" className="group block w-full py-lg text-left transition-editorial xl:py-xl">
            <div className="flex items-start justify-between gap-md">
              <div className="flex gap-sm xl:gap-md">
                <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft transition-editorial group-hover:text-ink group-focus-visible:text-ink">
                  {article.number}
                </span>

                <div className="max-w-[24ch] xl:max-w-[42ch]">
                  <span className="block font-display text-display-md font-black uppercase leading-[0.98] text-ink transition-editorial group-hover:translate-x-2 group-focus-visible:translate-x-2 xl:text-display-lg">
                    {article.title.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </span>

                  {article.dek && (
                    <span className="mt-sm block max-w-[38ch] font-body text-body-md text-ink-soft">
                      {article.dek}
                    </span>
                  )}

                  <span className="mt-sm flex flex-wrap items-center gap-x-2xs gap-y-3xs font-body text-label font-semibold uppercase tracking-wide text-ink-soft">
                    {article.category}
                    <span aria-hidden className="text-line">
                      /
                    </span>
                    {article.readTime}
                  </span>
                </div>
              </div>

              <span
                aria-hidden
                className="mt-2xs shrink-0 font-display text-display-sm text-ink transition-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 xl:text-display-md"
              >
                ↗
              </span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
