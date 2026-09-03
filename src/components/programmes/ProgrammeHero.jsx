import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import ImageReveal from "@/components/ui/ImageReveal";
import InfinityMotif from "@/components/brand/InfinityMotif";

/**
 * The masthead of a programme detail page.
 *
 * CONTENT-AWARE, in two ways.
 *
 * First, it renders what exists. Dance has a number and a name; Group therapy
 * has a number, a name and a sentence; Park day has all three and a
 * photograph. All three get the same masthead, and the one with least in it
 * is not padded to match — the spacing below is generous enough that a title
 * alone reads as a deliberate opening rather than a page that failed to load.
 *
 * Second, the composition follows the PHOTOGRAPH, not the programme. Every
 * original supplied is a different shape, so a single fixed slot would crop
 * one of them badly:
 *
 *   wide frames   (park-day, 16:9)   run full width beneath the title, indented
 *                                    from the left so the block sits off-axis
 *   upright frames (one-to-one, 6:5) sit beside the title, dropped down the
 *                                    page so the two columns interlock, and
 *                                    given a column more where there is no
 *                                    description to sit opposite
 *
 * The threshold is the image's own aspect ratio, so a photograph added later
 * places itself. Both paths use ImageReveal's `natural` ratio: the frame takes
 * the source's proportions instead of cropping to a house shape, which is the
 * only way to place ten photographs of ten different sizes without either
 * distortion or a lost subject.
 *
 * WHERE THE IMAGE ISN'T. A programme with two or more photographs sends all of
 * them to the gallery instead, so the reader meets them as a set rather than
 * one promoted frame followed by the rest. See ProgrammeGallery.
 */

/* Above this, a frame is wide enough that a side-by-side column would shrink
   it to a stripe. 1.4 sits between the 1.22 of the one-to-one frame and the
   1.78 of park day, which are the two real cases in the set. */
const WIDE_ASPECT = 1.4;

export default function ProgrammeHero({ programme }) {
  /* One image belongs to the hero. Zero and two-or-more do not — see above. */
  const feature = programme.images.length === 1 ? programme.images[0] : null;
  const isWide =
    feature && feature.photo.width / feature.photo.height >= WIDE_ASPECT;

  const text = (
    <>
      <Reveal>
        <div className="border-t-[3px] border-gold pt-5">
          <Eyebrow>Programme {programme.number}</Eyebrow>
        </div>
      </Reveal>

      <Reveal delay={90}>
        <h1 className="mt-7 max-w-[14ch] text-display">{programme.name}</h1>
      </Reveal>

      {programme.description && (
        <Reveal delay={180}>
          <p className="mt-6 max-w-measure text-lede text-ink-body">
            {programme.description}
          </p>
        </Reveal>
      )}
    </>
  );

  /* With no description the text column has nothing to hold but a title, so
     the photograph takes the extra column rather than leaving a void beside
     it — which is exactly the case on Individual therapy, where the
     photograph is the only content the page has. */
  const roomy = !programme.description;

  const image = feature && (
    <ImageReveal
      photo={feature.photo}
      caption={feature.caption}
      ratio="natural"
      frame="none"
      delay={270}
      priority
      sizes={
        isWide
          ? "(min-width: 1024px) 66vw, 100vw"
          : `(min-width: 1024px) ${roomy ? "50vw" : "40vw"}, (min-width: 640px) 70vw, 100vw`
      }
    />
  );

  return (
    /* Sand rather than cream, and about a third shorter than it was. Every
       interior page now opens on this surface — see PageHeader, which this
       deliberately mirrors — so a programme reads as a chapter of the same
       publication rather than as a differently-built page. */
    <Section
      tone="warm"
      spacing="none"
      className="overflow-hidden pt-14 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <InfinityMotif
        tone="teal"
        figures={false}
        strokeWidth={3}
        className="pointer-events-none absolute -top-20 -right-24 h-72 w-auto opacity-[0.1] sm:h-96"
      />

      <div className="relative">
        {!feature && text}

        {feature && isWide && (
          <>
            {text}
            {/* Indented rather than centred: an off-axis block keeps the
                composition editorial where a centred one would read as a
                banner. Flush on mobile, where an indent only costs width. */}
            <div className="mt-12 lg:mt-14 lg:pl-[16.666%]">{image}</div>
          </>
        )}

        {feature && !isWide && (
          <div className="grid items-start gap-y-10 lg:grid-cols-12 lg:gap-x-12">
            <div className={roomy ? "lg:col-span-5" : "lg:col-span-6"}>
              {text}
            </div>
            {/* Dropped down so the photograph's top edge lands against the
                body copy rather than against the title — and less far when
                there is no body copy for it to land against. */}
            <div
              className={
                roomy
                  ? "lg:col-span-6 lg:col-start-7 lg:mt-10"
                  : "lg:col-span-5 lg:col-start-8 lg:mt-14"
              }
            >
              {image}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
