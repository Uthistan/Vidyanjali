import { getImageProps } from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { heroStatement } from "@/content/about";

/**
 * The opening: the statement set ON the photograph.
 *
 * WHY THIS IS NOW POSSIBLE. Until the client supplied this frame, every
 * photograph in the set was a portrait WhatsApp re-encode, and the hero had to
 * upscale one about 1.5x and crop it to its middle third just to run across
 * the top of the page. This master is a real landscape photograph — 1536×1024,
 * sharp — and, more usefully, it is COMPOSED with a large field of plain wall
 * to the left of the pair. The type goes in that field.
 *
 * NO SCRIM, AND NONE NEEDED. Setting type over a photograph normally means
 * darkening it first, which this project's constraints rule out and which
 * would have dulled the one good picture on the site. Instead the safe area
 * was measured off the master's own pixels: everything from the left edge to
 * 34% across, and from the top down to 60%, sits between 8.0:1 and 10.8:1
 * against the heading purple. The text column below is sized to stay inside
 * that rectangle at every width — `w-[30%]` off the screen gutter puts its
 * right edge at about 33% of the frame from 1024px up to 2560px. The numbers
 * are recorded on the entry in content/photos.js; if the photograph is ever
 * swapped, re-measure before trusting this layout.
 *
 * THE TYPE IS LEFT-HUNG OFF THE SCREEN EDGE, not off the 1120px content
 * column. The content column's gutter would have pushed the block a further
 * 200px right at 1440 — straight onto the boy's head, and out of the only part
 * of the frame that can carry text. It is the one element on the site that
 * ignores the container, and the photograph is the reason.
 *
 * THE OVERLAY STARTS AT 1280px, NOT 1024. The wall is about 31% of the frame,
 * so at 1024 the text column is only ~277px once the gutter is taken off — too
 * narrow to hold the two links on one line. They wrapped, the second line
 * dropped onto the granite skirting, and it measured 1.03:1 there. Rather than
 * shrink the type until it fitted, the overlay simply waits for a frame wide
 * enough to carry it; 1024–1279 gets the stacked composition below, which is
 * on cream and safe by construction.
 *
 * BELOW THAT IT IS A DIFFERENT COMPOSITION AND A DIFFERENT CROP. Cropped to a
 * phone, the landscape frame keeps roughly 40% of its width — enough for the
 * wall or enough for the two people, never both. So narrow viewports get the
 * client's portrait recrop of the same moment instead, at its native 3:4 with
 * nothing trimmed, and the statement sits centred on cream above it rather
 * than over it. The flex order puts the statement first and the picture
 * second.
 *
 * THE BLOCK IS ANCHORED TO THE TOP, NOT CENTRED, and that is the second thing
 * the measurement caught. Vertically centred, the block's lower edge landed on
 * the granite skirting at the foot of the wall, and the two links measured
 * 1.39:1 there — invisible. The safe band is the TOP of the frame, so the
 * block hangs from it: `items-start` with a 9vh drop puts the last link about
 * 85px clear of the skirting at every width tested.
 *
 * VERIFIED BY SAMPLING THE RENDERED PAGE, not the master — the text block is
 * set to opacity 0 and the photograph beneath each element is read pixel by
 * pixel. Current worst cases: statement 7.9:1, tagline 5.7:1, date 4.6:1,
 * links 6.9:1, from 1024px to 2560px. Re-run that check if this composition,
 * the type sizes or the photograph change.
 */
export default function Hero() {
  const hero = photos.handsMirroring;
  const shared = { alt: hero.alt, sizes: "100vw", quality: 80, priority: true };

  const { props: wide } = getImageProps({
    ...shared,
    src: hero.src,
    width: hero.width,
    height: hero.height,
  });

  const { props: tall } = getImageProps({
    ...shared,
    src: hero.mobile.src,
    width: hero.mobile.width,
    height: hero.mobile.height,
  });

  return (
    <section className="relative flex flex-col bg-canvas xl:min-h-[86vh] xl:flex-row xl:items-start">
      {/* TWO CROPS OF THE SAME PHOTOGRAPH, ONE DOWNLOAD.

          `getImageProps` rather than two <Image> elements hidden with CSS: a
          `display:none` image is not reliably skipped by every browser, and
          preloading a priority image twice would be worse than the problem it
          solves. A <picture> with a media-qualified <source> lets the browser
          pick before it fetches, so a phone downloads only the portrait crop
          and a desktop only the landscape one. This is the pattern Next
          documents for art direction — see next/image, "Art direction".

          A PLAIN <img>, NOT ParallaxImage, AND THAT IS A CORRECTNESS FIX.
          ParallaxImage overscales its media by 12% so the drift never exposes
          an edge, which crops about 6% off each side. Invisible on a
          photograph with nothing over it, but here it dragged the boy's head
          6% left, straight under the last two words of the second line. The
          safe area was measured on the master's own pixels; any transform on
          top of the image invalidates that measurement. The drift moved to the
          park-day frame in Beyond the classroom, which has no type over it. */}
      <Reveal
        variant="fade"
        className="relative order-2 aspect-3/4 w-full overflow-hidden bg-canvas-warm sm:aspect-4/3 xl:absolute xl:inset-0 xl:order-none xl:aspect-auto"
      >
        <picture>
          <source media="(min-width: 1280px)" srcSet={wide.srcSet} sizes={wide.sizes} />
          <img
            {...tall}
            /* `tall` already carries the alt, but stated again so it is
               visible at the call site and statically checkable. */
            alt={hero.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photos.handsMirroring.focal }}
          />
        </picture>
      </Reveal>

      {/* z-10 so the block sits above the photograph on desktop; on mobile the
          two never overlap. */}
      <div className="relative z-10 order-1 w-full px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:pt-[9vh] xl:pb-0">
        <div className="mx-auto max-w-2xl text-center xl:mx-0 xl:w-[26%] xl:max-w-none xl:text-left">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 font-sans text-eyebrow uppercase xl:justify-start">
              <span className="text-teal">{site.tagline}</span>
              {/* The overlay column is only ~26% of the screen, so these two
                  facts always wrap onto separate lines there and the separator
                  would dangle at the end of the first one. */}
              <span
                aria-hidden="true"
                className="hidden text-ink-soft sm:inline xl:hidden"
              >
                &middot;
              </span>
              <span className="tabular-nums text-ink-soft">Established 2003</span>
            </div>
          </Reveal>

          {/* Smaller than it was on the cream, and deliberately so: a statement
              carried by a photograph does not have to be the largest thing on
              the page to dominate it. The size is also what keeps the block
              inside the measured safe area — see the note above. */}
          <Reveal delay={110}>
            <h1 className="mt-7 text-hero text-ink xl:mt-6 xl:text-[clamp(1.75rem,2.5vw,2.25rem)] xl:leading-[1.08]">
              {heroStatement}
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:mt-8 xl:justify-start">
              <HeroLink href="/programmes">Explore the programmes</HeroLink>
              <HeroLink href="/contact">Get in touch</HeroLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * A text link whose rule draws itself in from the left on hover — the site's
 * quietest interaction, and the same gesture the programme index makes when
 * its hairline turns gold.
 */
function HeroLink({ href, children }) {
  return (
    <Link
      href={href}
      className="group relative py-2 font-sans text-[1.125rem] font-medium text-ink no-underline transition-colors duration-300 ease-out-soft hover:text-teal"
    >
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-out-soft group-hover:origin-left group-hover:scale-x-100"
      />
    </Link>
  );
}
