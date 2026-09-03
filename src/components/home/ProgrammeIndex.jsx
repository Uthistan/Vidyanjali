import Link from "next/link";
import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { programmes } from "@/content/programmes";

/**
 * The programmes, as seven chapters.
 *
 * IT IS PURELY TYPOGRAPHIC. An earlier pass hung the two available programme
 * photographs at the end of their rows — Individual therapy and Park day, the
 * only two the client has supplied a picture for. They have been taken out.
 * Two thumbnails across seven rows read as an inconsistency rather than as a
 * feature, and the eye stopped at the pictures instead of running down the
 * list. Both photographs are still on their own detail pages, at a size worth
 * looking at. The page is not short of photography: it has a full-bleed hero,
 * a wide frame on the teal band and a five-frame mosaic.
 *
 * THE HOVER IS TYPOGRAPHIC TOO. An earlier pass wiped a sand band the full
 * width of the screen behind the hovered row. It worked, but it read as a UI
 * affordance — a menu item highlighting — rather than as an index responding
 * to a reader. Now the row's hairline turns gold, the name goes teal, the
 * numeral moves from teal to the deep gold and the arrow travels. Four small
 * changes, no coloured rectangle, and the page stays still.
 *
 * THE NAMES ALL START ON THE SAME EDGE. Every other row used to step in by a
 * column, which read as a zigzag rather than as a rhythm and made the list
 * harder to scan — the eye had to find the start of each name instead of
 * running down one edge.
 *
 * ROW HEIGHT IS UNEVEN ON PURPOSE, and the unevenness is the client's, not the
 * designer's: a row is set taller when there is something to say in it. Four
 * of the seven carry a description, one carries its event names, and two —
 * Individual therapy and Dance — carry nothing at all, because the client has
 * supplied no words for them. NOTHING IS WRITTEN HERE TO FILL THOSE TWO IN.
 * See `contentGaps` at the foot of content/programmes.js, which is the standing
 * list to hand back; the moment a line arrives for either, it appears in the
 * row with no code change.
 *
 * THE BULLET POINTS ARE A FALLBACK, NOT A SECOND LIST. Where a programme has a
 * description, only the description shows — Group therapy's four phrases and
 * Park day's "Grounding" would put a list inside a list. Where there is no
 * description but there are points, they are shown instead, under the entry's
 * own `pointsHeading`. In practice that is One day events, which was otherwise
 * a title and an arrow.
 *
 * THE MASTHEAD IS CENTRED and the rows are not. That split is the section's
 * whole idea: the announcement is a brand statement, the seven entries beneath
 * it are a catalogue, and they should not be set the same way.
 *
 * NOT SHARING ProgrammeRow. That component still sets /programmes and the foot
 * of every detail page. Fold the two back together once this direction is
 * signed off.
 */
export default function ProgrammeIndex() {
  const last = programmes[programmes.length - 1];

  return (
    <Section spacing="none" className="py-20 sm:py-24 lg:py-32">
      {/* CENTRED, LIKE THE HERO AND THE MISSION. These seven are the offer —
          the equivalent of a brand's pillars — and announcing them from the
          centre of the page says so in a way a label on the left rail cannot.
          The rows underneath return to the left rail, because a list of seven
          things is a list and wants an edge to align on. */}
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow className="mb-5">Programmes</Eyebrow>

          <h2 className="mx-auto max-w-[20ch] text-display text-ink">
            Therapy, learning, and the world outside.
          </h2>

          <p className="mt-5 font-sans text-eyebrow uppercase tabular-nums text-ink-soft">
            {programmes[0].number} &ndash; {last.number} &middot; Seven programmes
          </p>
        </div>
      </Reveal>

      <ol className="mt-14 sm:mt-16">
        {programmes.map((programme, index) => (
          <Chapter
            key={programme.slug}
            programme={programme}
            delay={index < 3 ? index * 80 : 0}
          />
        ))}
      </ol>

      {/* An eighth row rather than a button: a pill at the foot of seven
          hairline rows is the one piece of furniture the section does not
          need, and closing the list with a quieter row of the same shape reads
          as the end of the chapter list. */}
      <Reveal delay={100}>
        <Link
          href="/programmes"
          className="group flex items-center justify-between gap-6 border-y border-rule py-6 font-sans text-body-sm font-semibold text-ink-body no-underline transition-colors duration-500 ease-out-soft hover:border-gold hover:text-teal"
        >
          All seven, in full
          <Arrow />
        </Link>
      </Reveal>
    </Section>
  );
}

function Chapter({ programme, delay }) {
  /* Where the client wrote no description but did write the programme's own
     bullet phrases, those are shown instead. It is the client's content either
     way — nothing is composed here to fill a gap. In practice this is what
     puts "The events: Ula, Baking" against One day events, which until now was
     a title and an arrow. */
  const detail =
    programme.description ??
    (programme.points?.length > 0 ? programme.points.join(", ") : null);

  return (
    <Reveal as="li" delay={delay}>
      {/* The hairline lives on the LINK, not on the list item, so that hovering
          the row can turn it gold without needing :has() or a wrapper group. */}
      <Link
        href={`/programmes/${programme.slug}`}
        className={`group flex items-start gap-5 border-t border-rule no-underline transition-colors duration-500 ease-out-soft hover:border-gold sm:gap-8 lg:items-center ${
          detail ? "py-9 sm:py-10" : "py-7 sm:py-8"
        }`}
      >
        {/* Fixed rail, so the numerals and the names each hold one straight
            edge down the page. Teal rather than a grey tint of the
            heading purple: it puts the second brand colour into the page's
            largest section, and it is a colour rather than an absence of one. */}
        <span
          aria-hidden="true"
          className="w-9 shrink-0 pt-1.5 font-display text-h2 tabular-nums text-teal transition-colors duration-500 ease-out-soft group-hover:text-gold-deep sm:w-14 sm:pt-2 lg:pt-0"
        >
          {programme.number}
        </span>

        {/* Name and detail sit side by side from `lg` up and stack below it —
            one DOM node either way, so the text is never duplicated for a
            screen reader. Setting the detail OPPOSITE the name rather than
            under it is what keeps the right-hand half of these rows occupied:
            five of the seven now carry something there, and on a 1440px screen
            those rows run edge to edge instead of trailing four hundred empty
            pixels before the arrow. */}
        <div className="min-w-0 flex-1 lg:flex lg:items-baseline lg:gap-10">
          <h3 className="text-title text-ink transition-colors duration-500 ease-out-soft group-hover:text-teal lg:flex-1">
            {programme.name}
          </h3>

          {detail && (
            <p className="mt-4 max-w-measure text-body-sm text-ink-body lg:mt-0 lg:w-72 lg:shrink-0">
              {!programme.description && (
                <span className="text-ink-soft">
                  {programme.pointsHeading}:{" "}
                </span>
              )}
              {detail}
            </p>
          )}
        </div>

        <Arrow className="mt-2 self-center sm:mt-0" />
      </Link>
    </Reveal>
  );
}

/**
 * Deliberately slight: 20px on a 1.25px stroke. Against a 50px name, anything
 * heavier stops being a cue and starts being a button.
 */
function Arrow({ className = "" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-ink-soft transition-[transform,color] duration-500 ease-out-soft group-hover:translate-x-2 group-hover:text-teal ${className}`}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
