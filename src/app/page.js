import Hero from "@/components/home/Hero";
import Journey from "@/components/home/Journey";
import Mission from "@/components/home/Mission";
import ProgrammeIndex from "@/components/home/ProgrammeIndex";
import BeyondClassroom from "@/components/home/BeyondClassroom";
import LifeAtVidyanjali from "@/components/home/LifeAtVidyanjali";
import Vision from "@/components/home/Vision";
import People from "@/components/home/People";
import ClosingCTA from "@/components/layout/ClosingCTA";

/**
 * Home.
 *
 * THE PAGE IS ONE STORY, NOT NINE SECTIONS. It was reordered around a single
 * arc rather than around a tidy grouping of topics, and the order below is the
 * argument:
 *
 *   1  Hero          say the one thing, then show it. A statement centred on
 *                    cream, and a photograph the full width of the screen.
 *   2  Journey       one sentence of history, small and quiet, deliberately
 *                    the least loud thing on the page — because it follows the
 *                    loudest image on it.
 *   3  Mission       the belief, centred in cream on deep purple. The first
 *                    edge the reader crosses, and the second invitation.
 *   4  Programmes    what that belief actually is, as seven pillars.
 *   5  Beyond        one of them opened out: a large photograph and two quoted
 *                    lines, on deep teal, asymmetric and bleeding right.
 *   6  Life          the photographic chapter — five frames, no two alike.
 *   7  Vision        four parallel commitments, set as four, where the
 *                    repetition of the opening word IS the rhythm.
 *   8  People        who a child actually works with.
 *   9  Closing       the last invitation, centred, back on deep purple.
 *
 * THE RHYTHM IS CARRIED BY SURFACE AND BY WEIGHT, never by a rule between
 * sections: cream, cream, PURPLE, cream, TEAL, cream, sand, cream, PURPLE. No
 * two saturated bands touch, no two quiet sections sit together, and every
 * light run is broken by either a colour field or a photograph.
 *
 * THREE MOMENTS ARE CENTRED and only three — the hero, the mission and the
 * programme masthead. Those are the places Vidyanjali is speaking. Everything
 * that is a list, an index or a catalogue stays on the left rail, so the
 * centred moments keep their weight.
 *
 * FOUR INVITATIONS, spaced through the page rather than saved for the end: the
 * hero's two links, the mission's button, the programme index's closing row,
 * and the final band.
 *
 * Each section is its own component under components/home/. They are all
 * server components; the only client JavaScript on this page comes from the
 * shared Reveal observer, the hero's ParallaxImage, and the header.
 *
 * Every word is the client's, drawn from src/content/. The one exception is
 * `heroStatement`, a rewording of the mission's opening clause, kept in
 * content/about.js with a note saying so. Section headings are structural
 * framing and claim nothing; where a heading risked implying something
 * unsupplied — a schedule, an outcome — it was rewritten.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Journey />
      <Mission />
      <ProgrammeIndex />
      <BeyondClassroom />
      <LifeAtVidyanjali />
      <Vision />
      <People />
      <ClosingCTA />
    </>
  );
}
