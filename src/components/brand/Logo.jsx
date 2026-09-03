import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/**
 * Brand assets, all derived from the supplied logo in `public/brand/`:
 *
 *   vidyanjali-logo.png    the original, untouched (1536×1024)
 *   vidyanjali-mark.png    the symbol alone, cropped from it
 *   vidyanjali-lockup.png  the full stacked lockup, trimmed of dead space
 *
 * The supplied artwork is a raster with real transparency, so it sits cleanly
 * on the cream canvas. An SVG would still be better — it would stay crisp at
 * every size and cut ~350KB — so ask the client for the vector if one exists.
 * Swapping is a one-line change here.
 */
const ASSETS = {
  mark: { src: "/brand/vidyanjali-mark.png", width: 928, height: 552 },
  lockup: { src: "/brand/vidyanjali-lockup.png", width: 1432, height: 960 },
};

/**
 * Mark heights and type sizes step up at `sm`. Below that the full lockup
 * needs about 400px of width — more than a 390px phone has once the gutters
 * and menu button are accounted for — so the tagline drops out and the rest
 * shrinks. See the `hidden sm:flex` on the tagline in Lockup.
 */
const SIZES = {
  sm: { mark: "h-7", name: "text-[1.125rem]", tagline: "text-[0.5rem]", lockup: 88 },
  md: {
    mark: "h-9 sm:h-11",
    name: "text-[1.5rem] sm:text-[1.75rem]",
    tagline: "text-[0.5625rem]",
    lockup: 120,
  },
  lg: { mark: "h-12 sm:h-16", name: "text-[2.5rem]", tagline: "text-[0.75rem]", lockup: 168 },
};

function Mark({ heightClass, priority }) {
  return (
    <Image
      src={ASSETS.mark.src}
      width={ASSETS.mark.width}
      height={ASSETS.mark.height}
      alt=""
      aria-hidden="true"
      priority={priority}
      className={`w-auto shrink-0 ${heightClass}`}
    />
  );
}

/**
 * Mark + live type.
 *
 * The stacked lockup image is not usable in a header: scaled to fit, its
 * tagline renders around 4px tall and turns to mush. Pairing the real mark
 * with live text keeps the name and tagline crisp, selectable and legible,
 * and lets them respond to the type scale.
 */
function Lockup({ variant, size, priority }) {
  const scale = SIZES[size] ?? SIZES.md;

  return (
    <span className="flex items-center gap-2.5 sm:gap-3">
      <Mark heightClass={scale.mark} priority={priority} />

      <span className="flex flex-col leading-none">
        <span
          /* No weight class: the display face ships only at 400, and asking
             for 500 here made the browser synthesise a fake medium that
             thickened the wordmark unevenly against the real mark beside it. */
          className={`font-display tracking-[-0.01em] text-purple ${scale.name}`}
        >
          {site.name}
        </span>

        {variant !== "compact" && (
          <span className="mt-1.5 hidden items-center gap-1.5 sm:flex">
            <span className="h-px w-2.5 bg-purple-mid" aria-hidden="true" />
            <span
              className={`font-sans font-semibold uppercase tracking-[0.18em] text-teal ${scale.tagline}`}
            >
              {site.tagline}
            </span>
            <span className="h-px w-2.5 bg-gold" aria-hidden="true" />
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * @param {"full"|"compact"|"mark"|"lockup"} [props.variant]
 *   full: mark + name + tagline. compact: mark + name. mark: symbol alone.
 *   lockup: the supplied stacked artwork, for places with vertical room.
 * @param {"sm"|"md"|"lg"} [props.size]
 * @param {boolean} [props.asLink] - wrap in a link to `/`.
 * @param {boolean} [props.priority] - eager-load; use for the header only.
 */
export default function Logo({
  variant = "full",
  size = "md",
  asLink = false,
  priority = false,
  className = "",
}) {
  const scale = SIZES[size] ?? SIZES.md;
  const label = `${site.name} — ${site.tagline}`;

  let content;

  if (variant === "lockup") {
    content = (
      <Image
        src={ASSETS.lockup.src}
        width={ASSETS.lockup.width}
        height={ASSETS.lockup.height}
        alt={label}
        priority={priority}
        className="h-auto w-auto"
        style={{ maxHeight: scale.lockup }}
      />
    );
  } else if (variant === "mark") {
    content = (
      <Image
        src={ASSETS.mark.src}
        width={ASSETS.mark.width}
        height={ASSETS.mark.height}
        alt={site.name}
        priority={priority}
        className={`w-auto ${scale.mark}`}
      />
    );
  } else {
    content = <Lockup variant={variant} size={size} priority={priority} />;
  }

  if (!asLink) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={`${label}, home`}
      className={`inline-flex items-center transition-opacity duration-300 hover:opacity-70 ${className}`}
    >
      {content}
    </Link>
  );
}
