import { DM_Sans, Fraunces } from "next/font/google";
import Header from "@/components/layout/Header";
import SiteLoader from "@/components/brand/SiteLoader";
import Footer from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Display face — Fraunces.
 *
 * A soft-serif with round bowls and low stroke contrast, chosen by setting
 * the real copy against five other candidates and looking at the results.
 * The full reasoning, and what it was compared with, is in globals.css under
 * "Type families".
 *
 * THREE AXES ARE REQUESTED BEYOND WEIGHT, and each one is load-bearing:
 *
 *   opsz  the optical size. Left to `font-optical-sizing: auto` in CSS, which
 *         reads the rendered font-size and picks the matching cut — so the
 *         84px hero gets fine, open strokes and the 18px credential line gets
 *         sturdy ones, with no per-tier declaration anywhere.
 *   SOFT  terminal softness, set to 60. This is the axis that makes the face
 *         read warm rather than merely competent, and it is why this pairing
 *         sits with the round logo mark when the outgoing Didone did not.
 *   WONK  the alternate angled forms, on for the large tiers and off below
 *         h3. It is where the face gets its character.
 *
 * The weight range is the other half of the point. The previous display face
 * had exactly one weight, which meant the only way to make a heading feel
 * important was to make it enormous — the single biggest cause of the type
 * problem this redesign is fixing.
 */
/* `weight` is deliberately absent. This loader rejects a range string for a
   Google variable font — "Unknown weight 300 700 for font Fraunces" — and
   omitting the key is what asks for the whole variable axis, which is exactly
   what the scale in globals.css draws on. */
const display = Fraunces({
  variable: "--font-vidyanjali-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

/**
 * Text face. The variable file, so the 11px letterspaced caps can sit at 600
 * and body copy at 400 out of one download — and so the optical-size axis
 * thickens the small sizes rather than leaving them to fill in.
 */
const sans = DM_Sans({
  variable: "--font-vidyanjali-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  /* Assembled only from the client's own JOURNEY paragraph — see site.js. */
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport = {
  themeColor: "#FBF6EC",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      /* Next 16 no longer overrides scroll-behavior on navigation unless this
         attribute is present. Without it, route changes animate-scroll to the
         top instead of jumping. See node_modules/next/dist/docs → version-16. */
      data-scroll-behavior="smooth"
      /* The inline script below adds data-js before hydration, which React
         would otherwise flag as a server/client attribute mismatch. Scoped to
         this element's own attributes, so it hides nothing else. */
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas">
        {/* Parser-blocking, so it runs before any content paints. Gates the
            scroll-reveal start state on JS being available — see globals.css. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.js="true"`,
          }}
        />

        {/* Above everything, but it blocks nothing — see SiteLoader.jsx. */}
        <SiteLoader />

        <a
          href="#main"
          className="sr-only rounded-pill bg-purple px-5 py-3 text-body-sm text-ink-invert focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
