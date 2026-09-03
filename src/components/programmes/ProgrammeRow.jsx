import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * One entry in the programme catalogue: number, name, an arrow, and — at full
 * size — whatever description and points the client supplied.
 *
 * The whole row is one link. That is what makes the catalogue feel like a
 * catalogue rather than a list with a "read more" bolted onto each item, and
 * it gives every entry a touch target eighty-odd pixels tall without a single
 * button in the design. Nested links would break it, so the body renders as
 * plain text here and never as further links.
 *
 * Shared by the /programmes catalogue and the "More programmes" block at the
 * foot of each detail page: both must read as the same object at two sizes,
 * and they would drift the moment they were written out twice.
 *
 * IT IS TUNED TO MATCH ProgrammeIndex, which the homepage uses instead — same
 * display numerals in the teal, same title tier, same gold hairline on hover. The homepage version additionally carries the inline photographs and
 * puts the description opposite the name; folding the two together is worth
 * doing once this direction is signed off.
 *
 * @param {object} props.programme - an entry from content/programmes.js.
 * @param {"h2"|"h3"} [props.as] - heading level, so the caller keeps a sane
 *   document outline. The index has this under the page h1; the detail page
 *   has it under a section h2.
 * @param {"lg"|"md"|"sm"} [props.size] - lg for /programmes, md for the
 *   homepage index, sm for the foot of a detail page.
 * @param {boolean} [props.showBody] - render description and points.
 */

const SIZES = {
  lg: {
    title: "text-title",
    number: "text-h2 w-10 sm:w-14",
    pad: "py-9 sm:py-11",
    gap: "gap-5 sm:gap-8",
  },
  md: {
    title: "text-h1",
    number: "text-h2 w-10 sm:w-12",
    pad: "py-8 sm:py-10",
    gap: "gap-5",
  },
  sm: {
    title: "text-h2",
    number: "text-h3 w-8",
    pad: "py-6 sm:py-7",
    gap: "gap-4 sm:gap-5",
  },
};

export default function ProgrammeRow({
  programme,
  as: Heading = "h2",
  size = "lg",
  showBody = false,
  delay = 0,
}) {
  const scale = SIZES[size] ?? SIZES.lg;
  const body =
    showBody && (programme.description || programme.points?.length > 0);

  return (
    <Reveal as="li" delay={delay}>
      {/* The hairline lives on the LINK so hover can turn it gold — see the
          note on the interaction in ProgrammeIndex. */}
      <Link
        href={`/programmes/${programme.slug}`}
        className={`group flex items-start gap-6 border-t border-rule no-underline transition-colors duration-500 ease-out-soft hover:border-gold ${scale.pad}`}
      >
        <div className="grid flex-1 gap-y-6 lg:grid-cols-11 lg:gap-x-10">
          <div className={`flex items-baseline ${scale.gap} lg:col-span-6`}>
            {/* Decorative: the position is already carried by the ordered
                list, so a screen reader announcing "01 Individual therapy"
                would be reading the same fact twice.

                Set in the display face at h2 rather than as an 11px sans label.
                The homepage index sets its numerals this way, and when the two
                did not match, /programmes read as a different site's list of
                the same seven things. */}
            <span
              aria-hidden="true"
              className={`shrink-0 font-display tabular-nums text-teal transition-colors duration-500 ease-out-soft group-hover:text-gold-deep ${scale.number}`}
            >
              {programme.number}
            </span>

            <Heading
              className={`${scale.title} transition-colors duration-300 ease-out-soft group-hover:text-teal`}
            >
              {programme.name}
            </Heading>
          </div>

          {body && (
            <div className="lg:col-span-5">
              {programme.description && (
                <p className="max-w-measure text-body text-ink-body">
                  {programme.description}
                </p>
              )}

              {programme.points?.length > 0 && (
                <ul
                  className={`max-w-measure ${programme.description ? "mt-7" : ""} flex flex-col gap-3`}
                >
                  {programme.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-body-sm text-ink-body"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-3 h-px w-4 shrink-0 bg-gold"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* A bare glyph rather than a bordered circle: seven circles down the
            page would read as seven buttons, and the row is already the
            control. Nudged down a line's worth so it sits beside the title
            rather than above it. */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className="mt-1 shrink-0 text-ink-soft transition-[transform,color] duration-500 ease-out-soft group-hover:translate-x-1.5 group-hover:text-teal sm:mt-2"
        >
          <path
            d="M5 12h14M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </Reveal>
  );
}
