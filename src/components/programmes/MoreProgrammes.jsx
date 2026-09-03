import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import ProgrammeNavigation from "./ProgrammeNavigation";
import ProgrammeRow from "./ProgrammeRow";
import { moreProgrammes, programmeNeighbours } from "@/content/programmes";

/**
 * The foot of every programme detail page: where to go next.
 *
 * "MORE PROGRAMMES", NOT "RELATED PROGRAMMES". Nothing in the supplied content
 * links any two of these seven — the client's document lists them and stops —
 * so a heading promising relatedness would be asserting an editorial
 * relationship that does not exist, and the reader would go looking for the
 * connection. The three shown are simply the next three in the set, wrapping,
 * and the heading says so. See `moreProgrammes` in content/programmes.js for
 * where to hang a curated mapping when the client confirms one.
 *
 * The rows are the same ProgrammeRow the /programmes index uses, at the small
 * size and without bodies, so the catalogue reads as one object throughout the
 * site rather than as a list on one page and a set of cards on another.
 */
export default function MoreProgrammes({ slug }) {
  const others = moreProgrammes(slug, 3);
  const neighbours = programmeNeighbours(slug);

  return (
    <Section tone="teal">
      <ProgrammeNavigation neighbours={neighbours} />

      {/* The label IS the heading. An eyebrow plus a written line above it —
          "the rest of the programme", or anything else in that register —
          would be one more sentence on the site that no one at Vidyanjali
          wrote, to introduce three links that need no introduction. */}
      <Reveal className="mt-24 sm:mt-28">
        <h2 className="text-h2">More programmes</h2>
      </Reveal>

      <ol className="mt-14">
        {others.map((programme, index) => (
          <ProgrammeRow
            key={programme.slug}
            programme={programme}
            as="h3"
            size="sm"
            delay={index * 80}
          />
        ))}
      </ol>

      <Reveal delay={120} className="mt-12 border-t border-rule pt-12">
        <Button href="/programmes" variant="secondary">
          All programmes
        </Button>
      </Reveal>
    </Section>
  );
}
