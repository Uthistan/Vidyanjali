import Section from "@/components/layout/Section";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Pill from "@/components/ui/Pill";
import Eyebrow from "@/components/ui/Eyebrow";
import Prose from "@/components/ui/Prose";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ContentPending from "@/components/ui/ContentPending";
import Logo from "@/components/brand/Logo";
import InfinityMotif from "@/components/brand/InfinityMotif";
import ImageReveal from "@/components/ui/ImageReveal";
import ParallaxImage from "@/components/ui/ParallaxImage";
import PhotoCarousel from "@/components/ui/PhotoCarousel";
import { gaps, photos, rejected } from "@/content/photos";

/**
 * Internal design reference.
 *
 * This is the page to review: it shows every token, type size, component and
 * motion primitive in one place, so the FourCups-inspired feel can be approved
 * before any Vidyanjali copy exists. Excluded from the sitemap and robots.
 *
 * Delete this route before the site goes live, or leave it — it is harmless
 * and useful during content population.
 */

export const metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const SWATCHES = [
  { name: "canvas", hex: "#FBF6EC", note: "The paper. Warm cream, never white." },
  { name: "canvas-warm", hex: "#F3E8D6", note: "Sand. The second band — hero field, interior mastheads, row hover." },
  { name: "canvas-deep", hex: "#331A52", note: "Deep purple band. Mission, closing CTA." },
  { name: "teal-deep", hex: "#154C57", note: "Deep teal band. Beyond the classroom." },
  { name: "canvas-lift", hex: "#FFFFFF", note: "Form fields and raised cards only." },
  { name: "ink", hex: "#42206E", note: "Wordmark purple. Headings. 11.7:1 on canvas." },
  { name: "ink-body", hex: "#4E4557", note: "Body copy. 8.4:1 on canvas." },
  { name: "ink-soft", hex: "#6A6275", note: "Captions and meta. 5.4:1 canvas, 4.8:1 sand." },
  { name: "ink-invert", hex: "#FBF6EC", note: "On the dark bands. 13.8:1 on purple, 8.9:1 on teal." },
  { name: "purple", hex: "#42206E", note: "Wordmark. Brand primary." },
  { name: "purple-mid", hex: "#5C2D91", note: "Left loop. Links, accents. 8.7:1." },
  { name: "teal", hex: "#1D5F6B", note: "Right loop + tagline. 6.7:1. Index numerals." },
  { name: "gold", hex: "#F5A623", note: "Arc + top circle. Rules and fills; as text only on the dark bands (7.4:1 / 4.7:1)." },
  { name: "gold-deep", hex: "#8A5A0A", note: "Gold burnt down until it reads as text on a light surface. 5.5:1 canvas, 4.9:1 sand." },
  { name: "purple-soft", hex: "#F3ECF8", note: "Pale tint. Interior card fill." },
  { name: "teal-soft", hex: "#E8F1F2", note: "Pale tint. Interior card fill." },
  { name: "gold-soft", hex: "#FAEFD9", note: "Pale tint. Interior card fill." },
  { name: "danger", hex: "#9A2C2C", note: "Form validation only. 7.0:1." },
];

/* The carousel demo. Ten photographs survived the audit; these are the six
   that hold up at carousel size — see src/content/photos.js. */
const CAROUSEL = [
  { photo: photos.handsMirroring, caption: "Individual session" },
  { photo: photos.walkingTogether, caption: "Walking together" },
  { photo: photos.atTheWindow, caption: "A quiet moment" },
  { photo: photos.clayWork, caption: "Working with clay" },
  { photo: photos.parkDay, caption: "Park day" },
  { photo: photos.clayInHand, caption: "A finished piece" },
];

const TYPE_SPECS = [
  { cls: "text-display", label: "display", spec: "40 → 60px · 1.05 · -0.03em" },
  { cls: "text-h1", label: "h1", spec: "36 → 47px · 1.1 · -0.025em" },
  { cls: "text-h2", label: "h2", spec: "32 → 40px · 1.1 · -0.02em" },
  { cls: "text-h3", label: "h3", spec: "21 → 24px · 1.25 · -0.02em" },
  { cls: "text-lede", label: "lede", spec: "19 → 23px · 1.55" },
  { cls: "text-body", label: "body", spec: "21px · 1.6 — the signature size" },
  { cls: "text-body-sm", label: "body-sm", spec: "17px · 1.6" },
  { cls: "text-caption", label: "caption", spec: "15px · 1.55" },
];

const MARQUEE_ITEMS = [
  "Placeholder phrase",
  "Second phrase",
  "Third phrase",
  "Fourth phrase",
  "Fifth phrase",
  "Sixth phrase",
];

const PILL_TONES = ["purple", "teal", "gold", "outline"];

function Block({ title, note, children }) {
  return (
    <div className="border-t border-rule pt-12">
      <Eyebrow className="mb-3">{title}</Eyebrow>
      {note && <p className="mb-8 max-w-measure text-body-sm text-ink-soft">{note}</p>}
      {children}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <>
      <PageHeader
        eyebrow="Internal"
        title="Design system"
        lede="Every token, type size, component and motion primitive in one place. Review this to approve the look and feel — no Vidyanjali copy is required to judge it."
      />

      <Section className="flex flex-col gap-20">
        {/* ---------------------------------------------------- Colour */}
        <Block
          title="Colour"
          note="Placeholder values in the right register. Replace them in the @theme block of globals.css with hexes sampled from the supplied logo — every colour on the site resolves through those tokens."
        >
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {SWATCHES.map((s) => (
              <li key={s.name}>
                <div
                  className="h-20 rounded-card border border-rule"
                  style={{ backgroundColor: s.hex }}
                />
                <p className="mt-3 text-body-sm font-semibold text-ink">{s.name}</p>
                <p className="font-mono text-caption text-ink-soft">{s.hex}</p>
                <p className="mt-1 text-caption text-ink-soft">{s.note}</p>
              </li>
            ))}
          </ul>
        </Block>

        {/* ------------------------------------------------ Typography */}
        <Block
          title="Typography"
          note="Playfair Display (headings) over Plus Jakarta Sans (body). Playfair sits in the same high-contrast serif register as the logo wordmark, so headings read as an extension of the mark. The scale mirrors the audited hierarchy: tight leading and negative tracking on headings, generous 21px body at 1.6."
        >
          <div className="flex flex-col gap-8">
            {TYPE_SPECS.map((t) => (
              <div key={t.cls} className="border-b border-rule pb-8 last:border-0">
                <p className="mb-3 font-mono text-caption text-ink-soft">
                  .{t.cls} — {t.spec}
                </p>
                <p className={`${t.cls} text-ink`}>Building bridges</p>
              </div>
            ))}

            <div>
              <p className="mb-3 font-mono text-caption text-ink-soft">
                .text-eyebrow — 12px · 2 · +0.16em · uppercase
              </p>
              <Eyebrow>Section label</Eyebrow>
            </div>
          </div>
        </Block>

        {/* ---------------------------------------------------- Logo */}
        <Block
          title="Brand"
          note="The real mark paired with live type. The supplied stacked lockup is shown on the right — it is used only where there is vertical room, because at header size its tagline renders about 4px tall and turns to mush."
        >
          <div className="flex flex-wrap items-end gap-x-16 gap-y-10">
            <Logo variant="full" size="lg" />
            <Logo variant="full" size="md" />
            <Logo variant="compact" size="sm" />
            <Logo variant="mark" size="lg" />
            <Logo variant="lockup" size="md" />
          </div>
        </Block>

        <Block
          title="Ornament"
          note="A vector interpretation of the mark, for oversized low-opacity flourishes behind sections. Not a substitute for the logo — it exists because it tints to any brand colour and scales to any size for a fraction of the raster's weight. The figure-less variant is the one used for large backgrounds."
        >
          <div className="flex flex-wrap items-center gap-12">
            <InfinityMotif multicolor className="h-20 w-auto" />
            {["purple", "teal", "gold"].map((tone) => (
              <InfinityMotif key={tone} tone={tone} className="h-16 w-auto" />
            ))}
            <InfinityMotif tone="purple" figures={false} className="h-16 w-auto" />
          </div>
        </Block>

        {/* -------------------------------------------------- Buttons */}
        <Block
          title="Buttons"
          note="Hover or focus each one: a colour fill sweeps upward from the bottom edge while the label swaps colour — the signature CTA interaction from the reference."
        >
          <div className="flex flex-wrap items-center gap-5">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="primary" size="lg">
              Large primary
            </Button>
          </div>

          <div className="mt-8 rounded-card bg-canvas-deep p-10">
            <Button variant="invert">On the dark band</Button>
          </div>
        </Block>

        {/* ---------------------------------------------------- Pills */}
        <Block title="Pills" note="Accents as small confetti, never large flat blocks.">
          <div className="flex flex-wrap gap-3">
            {PILL_TONES.map((tone) => (
              <Pill key={tone} tone={tone}>
                {tone}
              </Pill>
            ))}
          </div>
        </Block>

        {/* ---------------------------------------------------- Cards */}
        <Block
          title="Cards"
          note="Borderless and shadowless — colour and spacing do the separating. Each card keys to a different accent so a row reads as a set."
        >
          <div className="grid gap-6 md:grid-cols-3">
            {["purple", "teal", "gold"].map((tone) => (
              <Card
                key={tone}
                tone={tone}
                title="Programme name"
                href="/programmes"
                cta="Learn more"
              >
                Two or three lines describing what happens, who it is for, and
                what a family can expect. Placeholder text.
              </Card>
            ))}
          </div>
        </Block>

        {/* ------------------------------------------- Section heading */}
        <Block title="Section heading" note="Eyebrow, heading and optional lede.">
          <SectionHeading
            eyebrow="Eyebrow"
            title="A section heading runs wide"
            lede="The lede is capped to the paragraph measure while the heading is not. That contrast in line length is a large part of the page rhythm."
          />
        </Block>

        {/* -------------------------------------------------- Marquee */}
        <Block
          title="Marquee"
          note="Pure CSS, seamless loop, pauses on hover, and halts entirely under prefers-reduced-motion. This is where the outcome phrases will go."
        >
          <Marquee
            items={MARQUEE_ITEMS}
            renderItem={(item) => <Pill tone="teal">{item}</Pill>}
          />
        </Block>

        {/* --------------------------------------------------- Reveal */}
        <Block
          title="Scroll reveal"
          note="Each block below rises into view on scroll, staggered by 120ms. Turn on Reduce Motion in your OS and reload — they appear instantly instead."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            {[0, 120, 240].map((delay) => (
              <Reveal
                key={delay}
                delay={delay}
                className="rounded-card bg-purple-soft p-8"
              >
                <p className="text-body-sm text-ink">delay: {delay}ms</p>
              </Reveal>
            ))}
          </div>
        </Block>

        {/* ---------------------------------------------------- Prose */}
        <Block title="Prose" note="Long-form text at the body rhythm, capped to measure.">
          <Prose>
            <p>
              Body copy sits at 21px with 1.6 line-height. Oversized body text
              with airy leading is what makes the reference feel expensive —
              more than the typeface does.
            </p>
            <p>
              A second paragraph, to show the rhythm between blocks and an{" "}
              <a href="#main">inline link</a> alongside{" "}
              <strong>emphasised text</strong>.
            </p>
            <ul>
              <li>List items keep the same measure</li>
              <li>And the same leading</li>
            </ul>
          </Prose>
        </Block>

        {/* --------------------------------------------- Photography */}
        <Block
          title="Photography"
          note="Ten masters survived the audit of seventeen supplied originals. Every one is a WhatsApp re-encode, portrait, and no wider than 1600px — so the framing below is portrait and squarish by necessity. There is no source here that can fill a full-bleed banner. Placements read from src/content/photos.js; no component hardcodes a path or an alt string."
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(photos).map(([key, photo], index) => (
              <ImageReveal
                key={key}
                photo={photo}
                ratio="portrait"
                frame="hairline"
                delay={index * 60}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                caption={`${key} — ${photo.width}×${photo.height} · ${photo.quality}`}
              />
            ))}
          </div>
        </Block>

        {/* ------------------------------------------ Image framing */}
        <Block
          title="Image framing"
          note="The four ratios, plus the hairline frame. A thin rule rather than a shadow: it holds an image against the cream canvas without adding weight."
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <ImageReveal
              photo={photos.oneToOneSession}
              ratio="landscape"
              frame="hairline"
              sizes="(min-width: 640px) 50vw, 100vw"
              caption="ratio: landscape · frame: hairline"
            />
            <ImageReveal
              photo={photos.clayInHand}
              ratio="square"
              sizes="(min-width: 640px) 50vw, 100vw"
              caption="ratio: square · frame: none"
            />
            <ImageReveal
              photo={photos.atTheWindow}
              ratio="tall"
              sizes="(min-width: 640px) 50vw, 100vw"
              caption="ratio: tall"
            />
            <ImageReveal
              photo={photos.festivalRangoli}
              ratio="portrait"
              frame="hairline"
              sizes="(min-width: 640px) 50vw, 100vw"
              caption="ratio: portrait — a 600px master, so small placements only"
            />
          </div>
        </Block>

        {/* ---------------------------------------------- Parallax */}
        <Block
          title="Parallax"
          note="The image drifts about 40px against the scroll across a full screen — felt more than seen. One per page at most. Scroll past it slowly; then turn on Reduce Motion and reload, and it holds still."
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <ParallaxImage
              photo={photos.walkingTogether}
              sizes="(min-width: 640px) 50vw, 100vw"
            />
            <div className="flex items-center">
              <p className="max-w-measure text-body-sm text-ink-soft">
                The frame is fixed; the photograph inside it moves. The media is
                overscaled by 12% so the travel never exposes an edge, and the
                animation loop only runs while the frame is on screen.
              </p>
            </div>
          </div>
        </Block>

        {/* ---------------------------------------------- Carousel */}
        <Block
          title="Photo carousel"
          note="A real scroll container with CSS scroll-snap, not a transform carousel — so swipe, trackpad, keyboard and screen readers all work natively, and with JS off it stays a scrollable row. Slides never fill the width: the next one is always partly visible."
        >
          <PhotoCarousel items={CAROUSEL} label="Life at Vidyanjali" />
        </Block>

        {/* --------------------------------------- Motion variants */}
        <Block
          title="Reveal variants"
          note="One primitive, four variants, one IntersectionObserver. The visual states live in globals.css so prefers-reduced-motion is enforced in CSS and cannot be defeated by a component forgetting to check."
        >
          <div className="grid gap-8 sm:grid-cols-2">
            <ImageReveal
              photo={photos.clayWorkDetail}
              ratio="portrait"
              sizes="(min-width: 640px) 50vw, 100vw"
              caption="mask — a wipe up from the bottom edge, media settling out of a 4% overscale"
            />
            <div className="flex flex-col justify-center gap-5">
              <Reveal variant="fade" className="rounded-card bg-teal-soft p-8">
                <p className="text-body-sm text-ink">variant: fade</p>
              </Reveal>
              <Reveal className="rounded-card bg-purple-soft p-8">
                <p className="text-body-sm text-ink">variant: rise (default)</p>
              </Reveal>
              <Reveal variant="scale" className="rounded-card bg-gold-soft p-8">
                <p className="text-body-sm text-ink">variant: scale</p>
              </Reveal>
            </div>
          </div>
        </Block>

        {/* --------------------------------------------- Photo audit */}
        <Block
          title="Photo audit — rejected"
          note="Kept in the repo so the next person to open the client's folder does not re-litigate it."
        >
          <ul className="flex flex-col">
            {rejected.map((item) => (
              <li key={item.source} className="border-t border-rule py-6">
                <p className="font-mono text-caption text-ink">{item.source}</p>
                <p className="mt-2 max-w-measure text-body-sm text-ink-soft">
                  {item.reason}
                </p>
              </li>
            ))}
          </ul>
        </Block>

        <Block
          title="Photo audit — gaps"
          note="Photographs the site will want and the client has not supplied. A shot list, not a problem to solve with stock."
        >
          <ul className="flex flex-col gap-3">
            {gaps.map((gap) => (
              <li key={gap} className="flex gap-3 text-body-sm text-ink-body">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-pill bg-gold"
                />
                {gap}
              </li>
            ))}
          </ul>
        </Block>

        {/* ------------------------------------------ Content pending */}
        <Block
          title="Content pending"
          note="The placeholder every unbuilt region uses. Deliberately conspicuous — if this reaches production, it should be obvious."
        >
          <ContentPending
            label="What belongs here"
            note="A note describing exactly what copy the client needs to supply."
          />
        </Block>
      </Section>

      {/* -------------------------------------------- Section tones */}
      <Section tone="purple" spacing="sm">
        <Eyebrow tone="purple">Section tone — purple</Eyebrow>
      </Section>
      <Section tone="teal" spacing="sm">
        <Eyebrow>Section tone — teal</Eyebrow>
      </Section>
      <Section tone="gold" spacing="sm">
        <Eyebrow tone="gold">Section tone — gold</Eyebrow>
      </Section>
    </>
  );
}
