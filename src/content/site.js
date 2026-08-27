/**
 * Single source of truth for site-wide structural content.
 *
 * IMPORTANT: this file holds structure only — route names, labels and
 * organisation identity. Descriptive copy about Vidyanjali lives in
 * `about.js` and `programmes.js`, and every word of it is the client's.
 * Do not add invented copy anywhere; wait for the client's words.
 */

import { closingStatement } from "./about";

export const site = {
  name: "Vidyanjali",
  /* From the supplied logo lockup. NOTE: the client's content says the centre
     "has now rebranded into Vidyanjali Learning Centre" — confirm whether the
     site should lead with that name, and whether this tagline still stands. */
  tagline: "Centre for Building Bridges",
  /* Search-result and social-card description. Assembled only from facts in
     the client's JOURNEY paragraph — nothing added. */
  description:
    "Established in 2003, Vidyanjali began as a therapy centre and has now rebranded into Vidyanjali Learning Centre — a school for children with autism and many other neurodevelopmental conditions.",
  /* Update once the production domain is confirmed — used by metadata + sitemap. */
  url: "https://vidyanjali.org",
};

/** Primary navigation. Order matters — this drives header and footer. */
export const navItems = [
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * The closing CTA in the footer. The heading is a verbatim Vidyanjali vision
 * statement — see `vision` in about.js.
 */
export const footerCta = {
  heading: closingStatement,
  action: "Get in touch",
  href: "/contact",
};

/**
 * Contact details — placeholders. Replace with the real details; the footer
 * and contact page read from here, so this is the only edit needed.
 */
export const contact = {
  email: null, // e.g. "hello@vidyanjali.org"
  phone: null,
  address: null,
};
