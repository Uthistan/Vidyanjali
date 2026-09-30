import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { photos } from "@/content/photos";
import { site } from "@/content/site";
import { heroStatement } from "@/content/about";

/**
 * The opening: the statement beside the photograph.
 *
 * A SPLIT, NOT AN OVERLAY. The previous hero set the statement ON a landscape
 * photograph, in a field of plain wall whose contrast had been measured pixel
 * by pixel. The current hero frame, `beachSlide`, is portrait like every
 * other photograph in the second delivery, and has no measured safe area — so
 * the type sits on cream, where it is safe by construction, and the
 * photograph takes the right half of the screen, full height, flush to the
 * edge.
 *
 * BELOW 1280px it stacks: statement first, then the photograph at 3:4 on
 * phones (the master's own ratio, nothing trimmed) and square from 640px. The
 * square crop and the desktop column both trim vertically, and the entry's
 * focal point is set to keep the sun and the child in frame for both.
 *
 * To change the picture, point `hero` at another entry in content/photos.js
 * and check its `focal` at a desktop width.
 */
export default function Hero() {
  const hero = photos.beachSlide;

  return (
    <section className="relative flex flex-col bg-canvas xl:grid xl:min-h-[86vh] xl:grid-cols-2">
      <div className="relative z-10 w-full px-6 py-14 sm:px-8 sm:py-16 lg:px-10 xl:flex xl:items-center xl:py-20 xl:pr-16 xl:pl-[max(2.5rem,calc((100vw-70rem)/2))]">
        <div className="mx-auto max-w-2xl text-center xl:mx-0 xl:max-w-xl xl:text-left">
          <Reveal>
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 font-sans text-eyebrow uppercase xl:justify-start">
              <span className="text-teal">{site.tagline}</span>
              <span aria-hidden="true" className="hidden text-ink-soft sm:inline">
                &middot;
              </span>
              <span className="tabular-nums text-ink-soft">Established 2003</span>
            </div>
          </Reveal>

          <Reveal delay={110}>
            <h1 className="mt-7 text-hero text-ink xl:text-[clamp(2.5rem,3.4vw,3.5rem)] xl:leading-[1.06]">{heroStatement}</h1>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:mt-10 xl:justify-start">
              <HeroLink href="/programmes">Explore the programmes</HeroLink>
              <HeroLink href="/contact">Get in touch</HeroLink>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal
        variant="fade"
        className="relative aspect-3/4 w-full overflow-hidden bg-canvas-warm sm:aspect-square xl:aspect-auto xl:h-full"
      >
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          quality={80}
          sizes="(min-width: 1280px) 50vw, 100vw"
          className="object-cover"
          style={{ objectPosition: hero.focal }}
        />
      </Reveal>
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
