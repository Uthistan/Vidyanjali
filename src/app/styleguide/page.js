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
  { name: "canvas", hex: "#FFFDF5", note: "Page surface. Never pure white." },
  { name: "canvas-lift", hex: "#FFFFFF", note: "Raised cards only." },
  { name: "canvas-deep", hex: "#2B1547", note: "Footer / closing CTA band." },
  { name: "ink", hex: "#42206E", note: "Wordmark purple. Headings. 12.4:1." },
  { name: "ink-body", hex: "#574F61", note: "Body copy. 7.4:1." },
  { name: "ink-soft", hex: "#877F92", note: "Captions and meta." },
  { name: "purple", hex: "#42206E", note: "Wordmark. Brand primary." },
  { name: "purple-mid", hex: "#5C2D91", note: "Left loop. Links, accents. 9.2:1." },
  { name: "teal", hex: "#1D5F6B", note: "Right loop + tagline. 7.1:1." },
  { name: "gold", hex: "#F5A623", note: "Arc + top circle. Fills only — fails AA as text." },
  { name: "purple-soft", hex: "#F4EEFA", note: "Tint band / card fill." },
  { name: "teal-soft", hex: "#EBF4F5", note: "Tint band / card fill." },
  { name: "gold-soft", hex: "#FDF4E4", note: "Tint band / card fill." },
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
