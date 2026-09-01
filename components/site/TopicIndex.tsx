interface Topic {
  number: string;
  category: string;
  statement: string[];
}

interface TopicIndexProps {
  topics: Topic[];
}

/**
 * Editorial index of topic teasers, not article cards — each row states a
 * category and one point of view, nothing else. No dates, authors, or
 * reading times: nothing here is actually published yet, so the row never
 * claims otherwise. Hover only nudges the statement (pure CSS, no arrow —
 * an arrow would imply a real link, and none exists yet).
 */
export function TopicIndex({ topics }: TopicIndexProps) {
  return (
    <ul>
      {topics.map((topic) => (
        <li key={topic.number} className="border-t border-line last:border-b">
          <button
            type="button"
            className="group flex w-full items-start gap-sm py-lg text-left transition-editorial xl:gap-md xl:py-xl"
          >
            <span className="font-display text-display-sm font-extrabold uppercase tabular-nums leading-none text-ink-soft transition-editorial group-hover:text-kite group-focus-visible:text-kite">
              {topic.number}
            </span>

            <div className="max-w-[26ch] xl:max-w-[46ch]">
              <span className="font-body text-label font-semibold uppercase tracking-widest text-kite">
                {topic.category}
              </span>
              <p className="mt-2xs font-display text-display-md font-black uppercase leading-[0.98] text-ink transition-editorial group-hover:translate-x-2 group-focus-visible:translate-x-2 xl:text-display-lg">
                {topic.statement.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
