# Vidyanjali — Centre for Building Bridges

Marketing site for Vidyanjali. Next.js 16 (App Router), React 19, Tailwind CSS v4, plain JavaScript.

```bash
npm install
npm run start:dev    # dev server on :3000
npm run build        # production build
npm run lint
```

## Current state

**Home, About and Programmes carry the client's real content. Get Involved and the contact
details do not.**

Every word on the built pages comes from the client's supplied content document and lives in
`src/content/`. Nothing has been invented — no testimonials, statistics, outcomes, locations,
admission process or contact details. The remaining unbuilt regions render a conspicuous
`<ContentPending>` block describing exactly what copy belongs there. Delete each one as the
real content lands.

Still awaiting content: **`/get-involved`**, the **contact details**, and **how to
join** on `/programmes`. Three programmes (`Individual therapy`, `Dance`, `One day events`) have
a name but no description — they render as a name alone, deliberately.

Visit **`/styleguide`** to review the whole design system on one page — tokens, type scale,
components and motion. It is excluded from `sitemap.xml` and disallowed in `robots.txt`; delete
the route before launch if you prefer.

## Content rules

`src/content/` is the only place page copy lives, and it is **the client's words**, not ours.
Mechanical edits are fine — sentence spacing, capitalisation, hyphenation, UK spelling. Writing
new sentences about Vidyanjali is not. Where the source was ambiguous the code says so in a
comment rather than guessing; those comments are open questions for the client, so leave them
until they are answered.

## Design decisions

The visual language follows a client-supplied reference for its restraint and rhythm — warm cream
canvas rather than white, oversized body copy, generous vertical spacing, a tall non-sticky header,
and sparing animation. Notable specifics:

- **Body copy is 21px at 1.6 line-height.** This is deliberate and load-bearing; it is most of
  why the pages feel unhurried. Resist shrinking it.
- **The header does not stick.** It scrolls away. That is intentional.
- **Colour tokens come from the logo** — the wordmark purple, the two loop colours and the gold
  arc. `gold` fails WCAG AA as text and is for fills only; `Pill` uses a darkened gold for its
  label instead.
- **Accents are confetti, not blocks** — pill fills, card tints, small ornaments.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/app/globals.css` | **All design tokens.** Tailwind v4 is CSS-first — there is no `tailwind.config.js`. Colours, type scale, spacing and the two component-level interactions live in `@theme` and `@layer`. |
| `src/content/site.js` | Nav, footer CTA, metadata description and contact details. |
| `src/content/about.js` | Journey, mission, vision, founders and team — the client's words. |
| `src/content/programmes.js` | The programmes offered, in the client's order. |
| `src/components/brand/` | `Logo` (the real artwork) and `InfinityMotif` (vector ornament). |
| `src/components/layout/` | `Header`, `Footer`, `Container`, `Section`, `PageHeader`, `SplitBlock`. |
| `src/components/ui/` | Buttons, cards, pills, headings, prose, and the two motion primitives. |
| `public/brand/` | Logo assets. |

### Brand assets

`public/brand/vidyanjali-logo.png` is the original supplied artwork. Two crops are derived from it:
`vidyanjali-mark.png` (the symbol alone) and `vidyanjali-lockup.png` (the stacked lockup, trimmed).
`src/app/icon.png` and `apple-icon.png` are generated from the mark.

The header and footer pair the **real mark with live type** rather than using the stacked lockup
image: scaled to header height, the artwork's tagline renders about 4px tall and turns to mush.

**An SVG of the logo would be a worthwhile upgrade** — it would stay crisp at every size and save
roughly 350KB. Swapping it is a one-line change in `ASSETS` at the top of `Logo.jsx`.

### Motion

No animation library. `Reveal` uses an `IntersectionObserver` and sets a DOM attribute; `Marquee`
is a pure-CSS duplicated track. Both honour `prefers-reduced-motion`, which is handled globally in
`globals.css` so it holds even mid-transition.

The scroll-reveal start state is gated behind `[data-js="true"]`, set by a parser-blocking inline
script in `layout.js`. Without JS, content renders plainly instead of staying at `opacity: 0`.

## Still to decide

- **The name.** The site leads with "Vidyanjali" and the logo's "Centre for Building Bridges"
  tagline, but the client's content says it "has now rebranded into Vidyanjali Learning Centre".
  Confirm which name the site should lead with, and whether the tagline still stands.
- **Photography.** The people sections are text-led because no portraits were supplied. `Person`
  has a documented slot for them.
- **Blog.** The route and its nav entry have been removed. If writing is wanted later it needs a
  content pipeline decision first: MDX files in the repo (developer edits, simplest) or a CMS
  (client edits, more setup).
- **Contact form** is not built. It needs somewhere for submissions to go and a spam-handling
  approach.
- **`/get-involved`** — confirm which of volunteering, partnerships and donations Vidyanjali
  actually offers. Donations would need payment handling and tax-receipt compliance discussed
  separately.
- **`site.url`** in `src/content/site.js` is a placeholder; set the real domain before launch,
  as metadata and the sitemap derive from it.
