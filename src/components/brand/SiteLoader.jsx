"use client";

import { useEffect } from "react";
import InfinityMotif from "./InfinityMotif";
import { site } from "@/content/site";

/**
 * The opening moment: the mark draws itself, the name and tagline settle in,
 * and the sheet lifts. About 1.2s in total.
 *
 * NON-BLOCKING BY CONSTRUCTION. The page renders underneath at full size and
 * this is a fixed sheet on top of it. Nothing waits on the loader: the real
 * content is already painted, already laid out, and already crawlable behind
 * it, so there is no layout shift when the sheet goes and no cost to LCP
 * beyond the sheet's own fade.
 *
 * IT SHOWS ONCE PER SESSION. A loader on every route change is a nuisance,
 * and a loader on every return visit is worse. The gate is an attribute on
 * <html> rather than React state, set by the inline script below before the
 * first paint — so a repeat visitor never sees a single frame of it, which is
 * not achievable from an effect.
 *
 * REDUCED MOTION skips it entirely, by the same mechanism.
 *
 * Mounted once in layout.js, above <main>.
 */

/**
 * Runs parser-blocking, before anything paints. Deliberately terse — it is
 * inlined into the document on every request.
 *
 * sessionStorage rather than localStorage: the loader should return for a
 * genuinely new visit, just not for every navigation within one.
 */
const GATE_SCRIPT = `
try {
  var seen = sessionStorage.getItem("vj-loader") === "1";
  var still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (seen || still) document.documentElement.dataset.loader = "done";
  else sessionStorage.setItem("vj-loader", "1");
} catch (e) {
  /* Private mode can throw on sessionStorage. Showing the loader is the safe
     failure: it dismisses itself on a timer regardless. */
}
`;

/** Matches the animation timings in globals.css. */
const HOLD_MS = 1250;

export default function SiteLoader() {
  useEffect(() => {
    const root = document.documentElement;

    // Already gated by the inline script — a repeat view or reduced motion.
    if (root.dataset.loader === "done") return;

    const timer = setTimeout(() => {
      root.dataset.loader = "done";
    }, HOLD_MS);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: GATE_SCRIPT }} />

      {/* aria-hidden and inert: the content behind is already the real page,
          so assistive tech and the keyboard should ignore the sheet entirely
          rather than announce a loading state that is not blocking anything. */}
      {/* `inert` must be passed as a boolean, not as "" — React 19 treats it
          as a boolean attribute and drops the empty string as falsy, which
          leaves the sheet focusable. */}
      <div className="site-loader" aria-hidden="true" inert={true}>
        <InfinityMotif
          tone="purple"
          animated
          strokeWidth={5}
          className="h-16 w-auto sm:h-20"
        />

        <div className="flex flex-col items-center gap-3">
          <p className="site-loader__word font-display text-h2 text-purple">
            {site.name}
          </p>

          <p className="site-loader__tagline font-sans text-eyebrow uppercase text-teal">
            {site.tagline}
          </p>
        </div>
      </div>
    </>
  );
}
