import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import ImageReveal from "@/components/ui/ImageReveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { photos } from "@/content/photos";

/**
 * The page's photographic chapter — five frames, no two the same size.
 *
 * NOT A GALLERY AND NOT A GRID OF TILES. Every frame keeps a ratio close to
 * its own source crop, the column spans differ, and three of the five are
 * pushed down so no two tops line up. Matched tiles turn photographs into
 * product shots; these are documentary pictures of real sessions and the
 * layout should not tidy them.
 *
 * IT CARRIES FIVE OF THE TEN USABLE FRAMES, which is the most it can honestly
 * hold. Three of the ten masters are the same clay session and the photo audit
 * is explicit that they must not all appear together — two are here and the
 * third is left out. `sharedTable` is left out too: it is a soft video frame
 * that does not hold above about 450px, and padding a mosaic with a weak image
 * costs more than the extra frame is worth.
 *
 * THE HEADING IS A SHORT ROW, NOT A COLUMN. See the note in the markup: a
 * label set beside the photographs left five-sixths of its rail empty, and no
 * alignment fixed that — the column was simply the wrong shape for two lines
 * of type.
 *
 * CAPTIONS state what is in the picture and nothing else. No child is named,
 * no activity is claimed that the frame does not show, and none of them
 * asserts a therapeutic outcome.
 */

/* The mosaic. `span` is the desktop column span, `push` a top offset so that
   no two frames in a row begin at the same height, and the spans deliberately
   do not add up to a tidy row — the gap left at column nine in the second row
   is what keeps the block from reading as a grid. */
const FRAMES = [
  {
    photo: photos.oneToOneSession,
    ratio: "landscape",
    caption: "Working through a notebook, one to one.",
    span: "lg:col-span-7",
    push: "",
    sizes: "(min-width: 1024px) 56vw, (min-width: 640px) 48vw, 100vw",
  },
  {
    photo: photos.atTheWindow,
    ratio: "tall",
    caption: "A window onto the trees.",
    span: "lg:col-span-4 lg:col-start-9",
    push: "lg:mt-24",
    sizes: "(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw",
  },
  {
    photo: photos.clayWork,
    ratio: "tall",
    caption: "Shaping clay on the floor.",
    span: "lg:col-span-4",
    push: "lg:mt-14",
    sizes: "(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw",
  },
  {
    photo: photos.clayInHand,
    ratio: "portrait",
    caption: "A finished piece, modelled in clay.",
    span: "lg:col-span-3 lg:col-start-6",
    push: "lg:mt-40",
    sizes: "(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw",
  },
  {
    photo: photos.festivalRangoli,
    ratio: "square",
    caption: "A rangoli laid for a festival day.",
    span: "lg:col-span-3 lg:col-start-10",
    push: "lg:mt-4",
    sizes: "(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw",
  },
];

export default function LifeAtVidyanjali() {
  return (
    <Section spacing="lg">
      {/* A compact heading row, then the mosaic across all twelve columns. An
          earlier version put the heading in a three-column rail BESIDE the
          first two frames; because a two-line label is about 120px tall and the
          photographs beside it were 600, that rail was five-sixths empty. A
          short row that the pictures then run underneath costs the same
          vertical space and leaves no hole. */}
      <Reveal>
        <Eyebrow className="mb-5">Life at Vidyanjali</Eyebrow>
        <h2 className="max-w-[16ch] text-h1">Ordinary days, closely held.</h2>
      </Reveal>

      <div className="mt-12 grid gap-y-10 sm:grid-cols-2 sm:gap-x-8 lg:mt-14 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
        {FRAMES.map((frame, index) => (
          <div key={frame.photo.src} className={`${frame.span} ${frame.push}`}>
            <ImageReveal
              photo={frame.photo}
              ratio={frame.ratio}
              caption={frame.caption}
              delay={index < 3 ? index * 80 : 0}
              zoom
              sizes={frame.sizes}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
