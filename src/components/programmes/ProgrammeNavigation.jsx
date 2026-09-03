import Link from "next/link";

/**
 * Step to the programme either side of this one, with the reader's position in
 * the set.
 *
 * WRAPS at both ends rather than dropping a link, so the bar is the same shape
 * on all seven pages. A "Previous" that disappears on the first page leaves a
 * lopsided row and, worse, makes the set feel like it has an edge — these are
 * seven peers, not chapters. Both slots come from `programmeNeighbours` in the
 * programme data, so adding an eighth programme changes nothing here.
 *
 * Deliberately thin: one hairline, small type, no buttons. The editorial
 * "More programmes" block below it is where the browsing happens; this is
 * wayfinding, and it should not compete.
 */
export default function ProgrammeNavigation({ neighbours }) {
  if (!neighbours) return null;

  const { previous, next, position, total } = neighbours;

  return (
    <nav
      aria-label="Programme"
      /* One column on a phone. Side by side, two long programme names — and
         "Individual therapy" is three words in a 40%-wide cell — wrap into
         stacked fragments that read as one collided sentence. Each gets its
         own full-width row instead, and only widens into three columns once
         there is room for the names to sit on one line. */
      className="grid items-center gap-y-7 border-t border-rule pt-8 sm:grid-cols-3 sm:gap-y-8"
    >
      <NavLink
        programme={previous}
        label="Previous"
        direction="previous"
        className="order-2 justify-self-start sm:order-1"
      />

      <p className="order-1 text-center font-sans text-caption text-ink-soft tabular-nums sm:order-2">
        {String(position).padStart(2, "0")}
        <span className="mx-2 text-ink-soft">/</span>
        {String(total).padStart(2, "0")}
      </p>

      <NavLink
        programme={next}
        label="Next"
        direction="next"
        className="order-3 justify-self-end text-right"
      />
    </nav>
  );
}

function NavLink({ programme, label, direction, className }) {
  const isNext = direction === "next";

  return (
    <Link
      href={`/programmes/${programme.slug}`}
      /* py-2 rather than none: the two lines of text alone come to about 40px,
         and the target has to clear 44. */
      className={`group flex max-w-full flex-col gap-1 py-2 no-underline ${className}`}
    >
      <span className="font-sans text-eyebrow uppercase text-ink-soft">
        {label}
      </span>

      <span
        className={`flex items-center gap-2 text-body-sm font-semibold text-ink transition-colors duration-300 ease-out-soft group-hover:text-teal ${
          isNext ? "flex-row-reverse" : ""
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-500 ease-out-soft ${
            isNext ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
          }`}
        >
          <path
            d={isNext ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 6l-6 6 6 6"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {programme.name}
      </span>
    </Link>
  );
}
