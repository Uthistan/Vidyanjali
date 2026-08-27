import Link from "next/link";
import Section from "@/components/layout/Section";
import SplitBlock from "@/components/layout/SplitBlock";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Prose from "@/components/ui/Prose";
import Reveal from "@/components/ui/Reveal";
import InfinityMotif from "@/components/brand/InfinityMotif";
import { site } from "@/content/site";
import { founders, journey, mission } from "@/content/about";
import { programmeNames } from "@/content/programmes";

/**
 * Home.
 *
 * The arc is: who Vidyanjali is (hero) → why it exists (mission) → what it
 * offers (programmes) → who does the work (founders). Every line is the
 * client's own; see the source notes in src/content/.
 *
 * Two sections from the original skeleton are gone rather than filled with
 * invention: the outcome marquee ("what families begin to notice") and the
 * problem statement ("why this matters"). Neither has supplied copy. Restore
 * them from git history the day the client writes them.
 */
export default function Home() {
  return (
    <>
      {/* Hero — type is the hero; no background image, no overlay. */}
      <Section spacing="lg" className="overflow-hidden">
        <InfinityMotif
          tone="gold"
          figures={false}
          className="pointer-events-none absolute -top-20 -right-32 h-112 w-auto opacity-[0.07]"
        />

        <Reveal className="relative">
          <Eyebrow className="mb-6">{site.tagline}</Eyebrow>

          {/* Trimmed from the opening clause of the client's mission — the one
              sentence that says what the centre is for. Swap it wholesale if
              they write a dedicated headline. */}
          <h1 className="max-w-[20ch] text-display">
            Empowering children with special needs to become independent,
            confident and valued individuals.
          </h1>
        </Reveal>

        <Reveal delay={120} className="relative">
          <p className="mt-10 max-w-measure text-lede text-ink-body">
            {journey[0]}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button href="/programmes" variant="primary" size="lg">
              Our programmes
            </Button>
            <Button href="/about" variant="secondary" size="lg">
              About Vidyanjali
            </Button>
          </div>
        </Reveal>
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

      {/* Programmes — the full list of names; descriptions live on
          /programmes. Deliberately a static list rather than the Marquee:
          the programmes are the offering, not decoration, and a ticker of
          seven short names visibly repeats itself across a desktop width. */}
      <Section tone="teal">
        <Reveal>
          <SectionHeading eyebrow="Programmes" title="Programmes offered" />
        </Reveal>

        <ul className="mt-14 grid sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
          {programmeNames.map((name, index) => (
            <Reveal
              as="li"
              key={name}
              delay={index * 70}
              className="border-t border-rule py-6"
            >
              <p className="text-h3 text-ink">{name}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200} className="mt-14">
          <Button href="/programmes" variant="accent">
            See all programmes
          </Button>
        </Reveal>
      </Section>

      {/* Founders — names and roles only. Full biographies are on /about. */}
      <Section>
        <Reveal>
          <SectionHeading eyebrow="People" title="Our founders" />
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {founders.map((person, index) => (
            <Reveal key={person.name} delay={index * 100}>
              <div className="border-t border-rule pt-8">
                <Eyebrow className="mb-4">{person.role}</Eyebrow>
                <h3 className="text-h3">{person.name}</h3>
                <p className="mt-2 font-sans text-caption text-ink-soft">
                  {person.credentials}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12">
          <Link
            href="/about#people"
            className="inline-flex items-center gap-2 text-body-sm font-semibold text-purple-mid no-underline transition-[gap] duration-300 ease-out-soft hover:gap-3"
          >
            Meet the founders and team
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </Section>

      {/* Invitation — handled by the footer CTA band. */}
    </>
  );
}
