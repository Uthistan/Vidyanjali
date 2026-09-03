"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * A horizontal run of photographs.
 *
 * The track is a real scroll container with CSS scroll-snap, not a transform
 * carousel. That choice does most of the accessibility work for free: touch
 * swipe, trackpad, shift-scroll, keyboard and screen-reader navigation all
 * behave natively, the slides stay in the document in order, and with JS off
 * it degrades to a scrollable row rather than to a single stuck frame.
 *
 * The JS here therefore does only two things the platform will not: move the
 * scroll position when the buttons are pressed, and track which slide is
 * currently centred so the position indicator can say so.
 *
 * Slides deliberately do not fill the viewport — the next one is always
 * partly visible, which is what tells the reader there is more without
 * needing an arrow to explain it.
 *
 * @param {object[]} props.items - `{ photo, caption }`, photo from photos.js.
 * @param {string} props.label - accessible name for the region.
 */
export default function PhotoCarousel({ items = [], label = "Photographs" }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [bounds, setBounds] = useState({ start: true, end: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children);

    // Which slide is nearest the centre of the track, and are we at either
    // end? Read once per scroll settle rather than per scroll event.
    const measure = () => {
      const centre = track.scrollLeft + track.clientWidth / 2;

      let nearest = 0;
      let smallest = Infinity;

      slides.forEach((slide, index) => {
        const slideCentre = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(slideCentre - centre);
        if (distance < smallest) {
          smallest = distance;
          nearest = index;
        }
      });

      setActive(nearest);
      setBounds({
        start: track.scrollLeft <= 1,
        // A pixel of tolerance: fractional scroll widths mean the end is
        // rarely reached exactly.
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 1,
      });
    };

    measure();

    // `scrollend` is the right event and is now widely supported; the scroll
    // fallback keeps older Safari in sync, throttled to a frame.
    if ("onscrollend" in window) {
      track.addEventListener("scrollend", measure);
      return () => track.removeEventListener("scrollend", measure);
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        measure();
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const scrollBy = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const slide = track.children[0];
    const step = slide ? slide.offsetWidth + 24 : track.clientWidth * 0.8;

    // `smooth` is ignored automatically by browsers under a reduced-motion
    // setting, so this needs no guard of its own.
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        className="snap-track flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pb-2"
        tabIndex={0}
        aria-label={`${label} — scrollable`}
      >
        {items.map(({ photo, caption }, index) => (
          <figure
            key={photo.src}
            aria-label={`${index + 1} of ${items.length}`}
            className="w-[78%] shrink-0 snap-center sm:w-[52%] lg:w-[38%]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-canvas-warm">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 38vw, (min-width: 640px) 52vw, 78vw"
                style={{ objectPosition: photo.focal ?? "50% 50%" }}
                className="h-full w-full object-cover transition-transform duration-700 ease-out-soft hover:scale-[1.03]"
              />
            </div>

            {caption && (
              <figcaption className="mt-4 text-caption text-ink-soft">
                {caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-6">
        {/* A count rather than a row of dots: with ten photographs dots become
            decoration, and a count is what a reader actually wants to know. */}
        <p className="font-sans text-caption text-ink-soft tabular-nums" aria-live="polite">
          <span className="text-ink">{String(active + 1).padStart(2, "0")}</span>
          <span className="mx-2 text-ink-soft">/</span>
          {String(items.length).padStart(2, "0")}
        </p>

        <div className="flex gap-3">
          <CarouselButton
            label="Previous photograph"
            onClick={() => scrollBy(-1)}
            disabled={bounds.start}
            path="M15 5l-7 7 7 7"
          />
          <CarouselButton
            label="Next photograph"
            onClick={() => scrollBy(1)}
            disabled={bounds.end}
            path="M9 5l7 7-7 7"
          />
        </div>
      </div>
    </section>
  );
}

function CarouselButton({ label, onClick, disabled, path }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-pill border border-rule text-ink transition-colors duration-300 ease-out-soft hover:border-rule-strong hover:text-teal disabled:pointer-events-none disabled:opacity-30"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={path}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
