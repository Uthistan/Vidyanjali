import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Display face. The Vidyanjali wordmark is a high-contrast serif with ball
 * terminals and a calligraphic V — Playfair Display sits in that same register,
 * so headings read as an extension of the logo rather than a second voice.
 */
const display = Playfair_Display({
  variable: "--font-vidyanjali-display",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Body face. Geometric enough to echo the logo's letterspaced tagline caps,
 * and highly legible at the 21px body size.
 */
const sans = Plus_Jakarta_Sans({
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
  themeColor: "#FFFDF5",
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
