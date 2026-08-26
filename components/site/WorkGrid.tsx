interface Project {
  number: string;
  name: string;
  category: string;
}

interface WorkGridProps {
  projects: Project[];
}

/**
 * A contact-sheet / portfolio-index grid, not a card grid: zero border
 * radius, no shadow, no card padding — each panel is a flush rectangular
 * frame with the project number in yellow, a large condensed title, its
 * category, and a small yellow arrow tucked in the corner. No real project
 * photography exists yet, so each panel uses a plain dark (ink) field
 * instead of inventing stock imagery.
 */
export function WorkGrid({ projects }: WorkGridProps) {
  return (
    <div className="grid grid-cols-1 gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
      {projects.map((project) => (
        <button
          key={project.number}
          type="button"
          className="group relative flex aspect-[16/10] flex-col justify-end bg-ink p-sm text-left transition-editorial hover:bg-ink/90"
        >
          <span className="font-display text-label font-semibold uppercase tabular-nums leading-none text-kite">
            {project.number}
          </span>
          <span className="mt-2xs block font-display text-display-md font-black uppercase leading-[0.95] text-paper transition-editorial group-hover:translate-x-1">
            {project.name}
          </span>
          <span className="mt-2xs block font-body text-label font-semibold uppercase tracking-wide text-paper-soft">
            {project.category}
          </span>

          <span
            aria-hidden
            className="absolute bottom-sm right-sm flex h-6 w-6 shrink-0 items-center justify-center bg-kite text-ink transition-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </button>
      ))}
    </div>
  );
}
