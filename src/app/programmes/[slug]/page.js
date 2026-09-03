import { notFound } from "next/navigation";
import ClosingCTA from "@/components/layout/ClosingCTA";
import ProgrammeHero from "@/components/programmes/ProgrammeHero";
import ProgrammeFacts from "@/components/programmes/ProgrammeFacts";
import ProgrammePoints from "@/components/programmes/ProgrammePoints";
import ProgrammeGallery from "@/components/programmes/ProgrammeGallery";
import MoreProgrammes from "@/components/programmes/MoreProgrammes";
import { getProgramme, programmeSlugs } from "@/content/programmes";
import { site } from "@/content/site";

/**
 * One programme.
 *
 * ONE ROUTE FOR ALL SEVEN. Everything below comes from the entry in
 * content/programmes.js — the title, the number, the copy, the photograph, the
 * figures, the neighbours in the navigation, the metadata and the sitemap row.
 * An eighth programme is an eighth object in that file and nothing else.
 *
 * THE TEMPLATE RENDERS WHAT EXISTS AND NOTHING ELSE. Each block below is
 * responsible for returning null when its data is absent, so the page composes
 * itself from what the client actually supplied:
 *
 *   Group therapy      masthead + figures + four statements
 *   Park day           masthead with a wide photograph + one statement
 *   Individual therapy masthead with an upright photograph, and that is all
 *   Dance              masthead, and that is all
 *
 * Dance being three lines long is the correct outcome, not a bug to design
 * around. The client supplied a name for it and nothing more, and the page
 * says a name and nothing more. There is no "coming soon", no placeholder
 * panel and no generic paragraph about the benefits of movement — the
 * whitespace and the way out at the foot are the design.
 *
 * TONES alternate cream → purple → teal → deep down the page, so that on the
 * sparse programmes, where the middle bands drop out, the masthead still hands
 * over to a tinted band rather than to more of the same cream.
 */

export function generateStaticParams() {
  return programmeSlugs.map((slug) => ({ slug }));
}

/**
 * Anything not in `generateStaticParams` is a 404 at the routing layer.
 *
 * Without this, /programmes/does-not-exist matches the segment, renders, and
 * throws notFound() part-way through — which still returns a 404 status, but
 * streams a shell and leaves the actual "we couldn't find that page" markup to
 * arrive with the client bundle. Measured: 1.7KB of body HTML against the
 * 11KB a top-level miss serves. There are seven programmes and no source of
 * an eighth at runtime, so refusing unknown slugs outright is both correct and
 * the only way this route serves the same fully-rendered 404 as every other
 * bad URL on the site. The notFound() call below is kept as the guard for dev,
 * where this flag does not apply.
 */
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const programme = getProgramme(slug);

  /* Unknown slug: the page itself calls notFound(), and returning bare
     metadata here keeps the 404 from being titled with the bad segment. */
  if (!programme) return {};

  const path = `/programmes/${programme.slug}`;

  /* The description is the client's own sentence or it is absent — in which
     case the root layout's description stands. Nothing is written to fill the
     tag, and nothing claims the programme is specialist, leading, proven or
     evidence-based, because none of that was supplied. */
  const description = programme.description;

  return {
    title: programme.name,
    ...(description && { description }),
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: `${programme.name} — ${site.name}`,
      description: description ?? site.description,
      url: path,
    },
  };
}

export default async function ProgrammePage({ params }) {
  const { slug } = await params;
  const programme = getProgramme(slug);

  if (!programme) notFound();

  return (
    <>
      <ProgrammeHero programme={programme} />

      <ProgrammeFacts facts={programme.facts} />

      <ProgrammePoints
        heading={programme.pointsHeading}
        points={programme.points}
        tone="purple"
      />

      <ProgrammeGallery programme={programme} />

      <MoreProgrammes slug={programme.slug} />

      <ClosingCTA />
    </>
  );
}
