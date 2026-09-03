import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { vision } from "@/content/about";

/**
 * Vision — four statements, and the repetition is the design.
 *
 * The client wrote four parallel "To …" clauses, not a paragraph. Set as four
 * full-width lines, one under another, every one of them opening on the same
 * word, the repetition becomes the rhythm of the section — a litany. That only
 * works LEFT-ALIGNED and at one measure: centred, or split into a 2×2 grid as
 * an earlier version had it, the four openings no longer line up and the
 * device disappears entirely.
 *
 * THE STATEMENTS ARE LARGE. They were 19px body copy in a two-column grid,
 * which made the section the quietest thing on the page and reduced four
 * commitments to a list of features. At h2 against an 11px numeral they read
 * as things Vidyanjali is prepared to say out loud, which is what they are.
 *
 * THE FIGURES ARE DECORATIVE AND MARKED SO. The ordered list already tells a
 * screen reader this is item three of four; hearing "03" as well is hearing
 * the same fact twice.
 */
export default function Vision() {
  return (
    <Section tone="warm" spacing="lg">
      <Reveal>
        <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-12">
          <Eyebrow className="lg:col-span-4">Vision</Eyebrow>
          <h2 className="max-w-[22ch] text-h1 lg:col-span-7 lg:col-start-6">
            What we are working towards.
          </h2>
        </div>
      </Reveal>

      <ol className="mt-12 sm:mt-14">
        {vision.map((statement, index) => (
          <Reveal
            as="li"
            key={statement}
            delay={index < 3 ? index * 80 : 0}
            className="flex items-baseline gap-6 border-t border-rule py-8 sm:gap-10 sm:py-9"
          >
            <span
              aria-hidden="true"
              className="w-8 shrink-0 font-sans text-eyebrow tabular-nums text-teal sm:w-12"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="max-w-[30ch] text-h2 text-ink sm:max-w-[36ch]">
              {statement}
            </p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
