import Link from "next/link";
import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { founders, team } from "@/content/about";

/**
 * People — text-led, and text-led on purpose.
 *
 * No portrait photographs have been supplied for anyone at Vidyanjali. That is
 * not a reason to reach for stock headshots or to draw avatars; it is a reason
 * to let the names and the credentials carry the section, which at this scale
 * they do perfectly well. If real portraits arrive, they belong above each
 * name, so the column rhythm below is untouched.
 *
 * WHAT CHANGED, AND WHY IT WAS NEEDED. This section was reading as a staff
 * directory: an eyebrow and heading alone in the top-left corner, two founder
 * blocks, then five identical stacked cells of name / credentials / role. Every
 * person was presented as the same object at the same size, which is what makes
 * a directory a directory. Three changes, all typographic — no photographs, no
 * new copy, no invented detail:
 *
 * 1. THE MASTHEAD is the same one the programme index and the vision use, so
 *    the heading crosses the page instead of leaving the right half empty.
 * 2. THE FOUNDERS LEAD WITH THEIR NAMES at h1, with role and credentials
 *    demoted to a single 11px byline underneath, separated by a short rule.
 *    A name set large with its qualifications set small is how a masthead
 *    credits somebody; a role label sitting above the name in the same weight
 *    is how a directory lists them.
 * 3. THE TEAM IS AN INDEX, not a grid of cells. Each person is one ruled row
 *    carrying name, credentials and role across three columns — the same
 *    object as a programme row, which is already the site's language for "a
 *    list of things worth reading". Three rows also give the foot of the
 *    section a horizontal rhythm to answer the founders' vertical one.
 *
 * Founders get the first line of their biography here; the full biographies
 * live on /about. The wider team gets name, credentials and role only — five
 * full biographies on a homepage is a page in itself.
 */
export default function People() {
  return (
    <Section spacing="lg">
      <Reveal>
        <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-12">
          <Eyebrow className="lg:col-span-4">People</Eyebrow>

          <h2 className="max-w-[22ch] text-h1 lg:col-span-7 lg:col-start-6">
            The people children work with.
          </h2>
        </div>
      </Reveal>

      {/* Founders */}
      <div className="mt-10 grid gap-x-14 gap-y-11 sm:mt-12 lg:grid-cols-2">
        {founders.map((person, index) => (
          <Reveal key={person.name} delay={index * 100}>
            <div className="border-t-[3px] border-gold pt-6">
              <h3 className="text-h1">{person.name}</h3>

              {/* One byline rather than two stacked labels: the role, a short
                  rule, then the qualifications. */}
              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-eyebrow uppercase">
                <span className="text-purple-mid">{person.role}</span>
                <span aria-hidden="true" className="h-px w-4 bg-rule-strong" />
                <span className="text-ink-soft">{person.credentials}</span>
              </p>

              <p className="mt-5 max-w-measure text-body-sm text-ink-body">
                {person.bio[0]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Team */}
      <Reveal className="mt-16">
        <h3 className="font-sans text-eyebrow uppercase text-teal">Team</h3>
      </Reveal>

      <ol className="mt-6">
        {team.map((person, index) => (
          <Reveal
            as="li"
            key={person.name}
            delay={index * 80}
            className="grid gap-x-10 gap-y-1 border-t border-rule py-6 sm:grid-cols-12 sm:items-baseline"
          >
            {/* 4 / 3 / 5. The name column was 5 wide against names that set
                at about 215px, which left a 245px hole before the credentials
                in every row. */}
            <p className="font-display text-h2 text-ink sm:col-span-4">
              {person.name}
            </p>

            <p className="font-sans text-caption text-ink-soft sm:col-span-3">
              {person.credentials}
            </p>

            <p className="text-body-sm text-ink-body sm:col-span-5">
              {person.role}
            </p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={160}>
        <Link
          href="/about#people"
          className="group mt-12 inline-flex items-center gap-2 text-body-sm font-semibold text-purple-mid no-underline"
        >
          Read the full biographies
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </Reveal>
    </Section>
  );
}
