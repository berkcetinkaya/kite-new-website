import Image from "next/image";

interface HeroArtworkProps {
  agencyLine: string;
  locationLine: string;
  coordinates: string[];
  stampLines: string[];
}

/**
 * The Galata Tower editorial plate — framed like a mounted archival image
 * (thin border + ivory mat), not a full-bleed background. Sized to the
 * source asset's own 4:3 aspect so the whole photo is always visible
 * (object-contain — no cropping of the tower's roof or body). The asset
 * already carries its own yellow sun and screenprinted light-ray, so only
 * the technical label, a small hand-drawn kite + string kept clear of the
 * tower, and the "move brands forward" stamp are added on top.
 */
export function HeroArtwork({ agencyLine, locationLine, coordinates, stampLines }: HeroArtworkProps) {
  return (
    <div className="hero-artwork-reveal border border-ink p-2xs xl:p-sm">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src="/brand/galata2.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1280px) 44vw, 92vw"
          className="object-contain"
        />

        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
        >
          <path
            d="M 10 52 C 24 40, 36 28, 52 16"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth={0.35}
            vectorEffect="non-scaling-stroke"
          />
          <g transform="translate(52 16) rotate(20)">
            <rect x={-4} y={-4} width={8} height={8} fill="none" stroke="var(--color-ink)" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
            <line x1={-4} y1={0} x2={4} y2={0} stroke="var(--color-ink)" strokeWidth={0.35} vectorEffect="non-scaling-stroke" />
            <line x1={0} y1={-4} x2={0} y2={4} stroke="var(--color-ink)" strokeWidth={0.35} vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <div
          aria-hidden
          className="absolute left-[4%] top-[4%] max-w-[46%] border border-ink bg-paper/90 px-2xs py-3xs font-body text-eyebrow font-semibold uppercase leading-snug tracking-wide text-ink sm:max-w-[42%]"
        >
          <p>{agencyLine}</p>
          <p>{locationLine}</p>
          {coordinates.map((c) => (
            <p key={c}>{c}</p>
          ))}
        </div>

        <div
          aria-hidden
          className="absolute bottom-[4%] right-[4%] flex h-16 w-16 shrink-0 items-center justify-center border border-dashed border-kite-dark bg-paper/85 text-center font-body text-[9px] font-bold uppercase leading-tight tracking-wide text-kite-dark sm:h-20 sm:w-20"
          style={{ borderRadius: "9999px" }}
        >
          <span>
            {stampLines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
