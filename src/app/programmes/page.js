import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import ClosingCTA from "@/components/layout/ClosingCTA";
import ProgrammeRow from "@/components/programmes/ProgrammeRow";
import { programmes } from "@/content/programmes";

export const metadata = {
  title: "Programmes",
  alternates: { canonical: "/programmes" },
};

/**
 * Programmes — the catalogue.
 *
 * A NUMBERED EDITORIAL LIST, NOT A GRID OF SEVEN CARDS. The argument for the
 * list is the content: two of these programmes have no description at all and
 * three have a single sentence. In a card, a name on its own looks like a card
 * that failed to load; in a ruled index it is simply a complete entry, which
 * is what it is. The list also lets the seven titles run at display size and
 * share one rhythm down the page, and it scales to an eighth programme without
 * anyone thinking about a row of three.
 *
 * Each row is a whole link to its detail page — see ProgrammeRow. The homepage
 * carries the same index one size down and without the bodies; this is the
 * full reading of it.
 *
 * ALTERNATE ROWS STEP IN by one column on desktop, so the eye travels down a
 * shifting left edge rather than a ruler. The right edge, where the arrows
 * are, stays put.
 *
 * NO INTRODUCTION under the page title, and no "how to join" block. The client
 * supplied no overview of the programme as a whole and no joining process —
 * not an enquiry route, not an assessment, not a waiting list — so the page
 * says nothing about either. (This is where a `ContentPending` placeholder for
 * admissions used to sit. It was the right marker while the page was a draft
 * and the wrong thing to ship: a page that advertises its own gaps reads worse
 * than a page that is simply short.) The closing band already gives the reader
 * a way to ask.
 */
export default function ProgrammesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programmes"
        title="Programmes offered"
        motifTone="teal"
      />

      <Section spacing="md">
        {/* Rows carry their own top rule; the list closes itself. */}
        <ol className="border-b border-rule">
          {programmes.map((programme, index) => (
            <ProgrammeRow
              key={programme.slug}
              programme={programme}
              showBody
              /* Only the first few stagger. Below the fold the observer fires
                 them one at a time anyway, and a delay there just holds an
                 already-visible row back. */
              delay={index < 3 ? index * 90 : 0}
            />
          ))}
        </ol>
      </Section>

      <ClosingCTA />
    </>
  );
}
