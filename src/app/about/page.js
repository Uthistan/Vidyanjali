import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/layout/Section";
import SplitBlock from "@/components/layout/SplitBlock";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Person from "@/components/ui/Person";
import Prose from "@/components/ui/Prose";
import Reveal from "@/components/ui/Reveal";
import { founders, journey, mission, team, vision } from "@/content/about";
import ClosingCTA from "@/components/layout/ClosingCTA";

export const metadata = {
  title: "About",
};

/**
 * About — the whole of Vidyanjali's story in one place: journey, mission,
 * vision, and the people. Founders and team share a single `#people` section
 * so the home page and any future link can point at one anchor.
 *
 * All copy comes from src/content/about.js and is the client's own.
 */
export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title="About Vidyanjali" motifTone="purple" />

      {/* Journey */}
      <Section>
        <SplitBlock
          heading={
            <Reveal>
              <SectionHeading eyebrow="Journey" title="Our journey" />
            </Reveal>
          }
        >
          <Reveal delay={100}>
            <Prose>
              {journey.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </Reveal>
        </SplitBlock>
      </Section>

      {/* Mission */}
      <Section tone="purple">
        <SplitBlock
          heading={
            <Reveal>
              <SectionHeading
                eyebrow="Mission"
                eyebrowTone="purple"
                title="Our mission"
              />
            </Reveal>
          }
        >
          <Reveal delay={100}>
            <Prose>
              {mission.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Prose>
          </Reveal>
        </SplitBlock>
      </Section>

      {/* Vision — four parallel statements, set large. Not a paragraph and
          not a bulleted list; the repetition of "To ..." is the form. */}
      <Section tone="teal">
        <Reveal>
          <SectionHeading eyebrow="Vision" title="Our vision" />
        </Reveal>

        <ul className="mt-14 grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {vision.map((statement, index) => (
            <Reveal
              as="li"
              key={statement}
              delay={index * 90}
              className="border-t border-rule pt-7"
            >
              <p className="max-w-measure text-lede text-ink">{statement}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* People — founders, then the wider team. */}
      <Section id="people" className="scroll-mt-16">
        <Reveal>
          <SectionHeading eyebrow="People" title="Our founders" />
        </Reveal>

        <div className="mt-14 grid gap-x-14 gap-y-14 lg:grid-cols-2">
          {founders.map((person, index) => (
            <Reveal key={person.name} delay={index * 100}>
              <Person size="lg" {...person} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-24">
          <Eyebrow className="mb-4">Team</Eyebrow>
          <h2 className="max-w-[20ch] text-h2">Our team</h2>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-3">
          {team.map((person, index) => (
            <Reveal key={person.name} delay={index * 100}>
              <Person {...person} />
            </Reveal>
          ))}
        </div>
      </Section>

      <ClosingCTA />
    </>
  );
}
