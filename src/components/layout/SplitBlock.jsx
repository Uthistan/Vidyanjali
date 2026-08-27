/**
 * Heading in a narrow left column, body copy in a wider one to the right.
 *
 * Prose is capped to a ~544px measure, so a heading stacked above it leaves
 * half of the 1120px page empty and the section reads as unfinished rather
 * than airy. This is the editorial answer: the heading holds the left edge
 * while the text sits at its natural measure beside it.
 *
 * Only for sections whose body is a single column of prose — anything that
 * already fills the width with its own grid keeps a full-width heading above.
 *
 * Stacks below `md`.
 */
export default function SplitBlock({ heading, children, className = "" }) {
  return (
    <div className={`grid gap-x-16 gap-y-8 md:grid-cols-12 ${className}`}>
      <div className="md:col-span-4">{heading}</div>
      <div className="md:col-span-7 md:col-start-6">{children}</div>
    </div>
  );
}
