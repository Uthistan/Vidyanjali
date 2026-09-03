import Container from "@/components/layout/Container";
import Reveal from "@/components/ui/Reveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Eyebrow from "@/components/ui/Eyebrow";
import { photos } from "@/content/photos";
import { programmes } from "@/content/programmes";

/**
 * Large image and story, on the page's second dark band.
 *
 * THE COMPOSITION IS ASYMMETRIC AND IT BLEEDS. The story holds five columns on
 * the left of a deep teal field; the photograph takes the rest and runs off the
 * right edge of the screen, taller than the text beside it. Nothing is centred
 * and nothing is boxed. After the programme index — seven ruled rows, very
 * even, very ordered — the page needs a section with no grid showing, and this
 * is it.
 *
 * WHY TEAL. The mission band is deep purple; this is the other brand colour at
 * full strength. Two saturated bands, a long way apart, with light sections
 * between them, is what stops a page this long reading as one continuous
 * scroll. Using teal here is also the only place on the site the second brand
 * colour becomes a surface rather than a link colour.
 *
 * PARALLAX LIVES HERE, and only here. It cannot go in the hero: that image
 * carries the statement, and the 12% overscale the effect needs would shift
 * the photograph under the type and break the contrast the layout was measured
 * against. This frame has nothing over it, so it is the one place on the page
 * the drift is free. About 30px across a full screen — felt, not seen.
 *
 * COPY. Every line is the client's own programme description, quoted and
 * attributed to the programme it belongs to. "Encountering nature helps
 * children to meet the world" is Park day; "An organic active sensory therapy"
 * is Beach walk. Nothing is asserted about outcomes or therapeutic effect
 * beyond those two sentences, because nothing else was supplied.
 *
 * PHOTOGRAPH. park-day — the only genuinely landscape frame in the supplied
 * set, which is why it gets the one place on the page that wants a wide image.
 * The train-carriage frame that would have suited this section is deliberately
 * absent: it shows members of the public who cannot have consented, one of
 * them filming. See `rejected` in content/photos.js.
 */

/* Pulled by name so the quotes stay tied to their source. If a programme is
   renamed in content/programmes.js this returns undefined and the line simply
   does not render, rather than silently attaching to the wrong programme. */
const find = (name) => programmes.find((programme) => programme.name === name);

export default function BeyondClassroom() {
  const parkDay = find("Park day");
  const beachWalk = find("Beach walk");

  return (
    <section className="on-dark relative overflow-hidden bg-teal-deep py-20 text-ink-invert sm:py-24 lg:py-28">
      <div className="page-bleed-right lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-12 lg:pr-0">
        <Container className="lg:col-span-5 lg:mx-0 lg:max-w-none lg:px-0 lg:pl-10">
          <Reveal>
            <Eyebrow tone="gold-bright" className="mb-5">
              Beyond the classroom
            </Eyebrow>
            <h2 className="max-w-[13ch] text-h1">Learning happens outside too.</h2>
          </Reveal>

          <div className="mt-10 flex flex-col gap-8">
            {[parkDay, beachWalk].filter(Boolean).map((programme, index) => (
              <Reveal key={programme.name} delay={100 + index * 90}>
                <figure className="border-t-[3px] border-gold pt-5">
                  <blockquote className="max-w-measure text-lede text-ink-invert">
                    {programme.description}
                  </blockquote>
                  <figcaption className="mt-2 font-sans text-caption text-ink-invert/70">
                    {programme.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>

        {/* Off the right edge of the screen. Its own 3:2 crop, set once via
            `ratio` — passing a second aspect-* class through frameClassName
            put two arbitrary aspect utilities on the same element, and which
            one won came down to Tailwind's own class ordering rather than to
            anything in this file. */}
        <div className="mt-12 lg:col-span-7 lg:mt-0">
          <ParallaxImage
            photo={photos.parkDay}
            strength={30}
            ratio="aspect-[3/2]"
            sizes="(min-width: 1024px) 58vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
