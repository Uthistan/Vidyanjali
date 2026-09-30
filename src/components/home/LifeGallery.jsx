"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * The interactive half of Life at Vidyanjali: filter chips, the bento grid
 * and a lightbox. The data and the copy live in LifeAtVidyanjali.jsx.
 *
 * THE GRID. Four columns on desktop, two below, fixed row heights, and
 * `grid-flow-dense` so tiles of different sizes pack without holes whatever
 * the filter leaves behind. Sizes rotate through PATTERN by position, so any
 * subset — six festival frames or all twenty-six — still reads as composed
 * rather than as a list of equal squares.
 *
 * THE LIGHTBOX is a native <dialog> opened with showModal(): focus trapping,
 * Escape to close, the inert page behind it and focus returning to the tile
 * that opened it all come from the platform rather than from code here.
 * Arrow keys step through whatever the current filter shows.
 */

const SHAPES = {
  big: "col-span-2 row-span-2",
  /* Tall only from 640px: on a two-column phone grid a lone tall tile leaves
     a hole beside it that dense packing cannot always fill. */
  tall: "sm:row-span-2",
  wide: "col-span-2",
  std: "",
};

/* Where the programmes tile is slotted into "All", counted in photographs. */
const PROGRAMMES_AT = 3;

const PATTERN = ["big", "std", "tall", "std", "wide", "tall", "std", "std", "tall", "std", "wide", "std"];

/* Rough sizes per shape, so a 1x1 tile does not download a 2x2 image. */
const SIZES = {
  big: "(min-width: 1024px) 50vw, 100vw",
  wide: "(min-width: 1024px) 50vw, 100vw",
  tall: "(min-width: 1024px) 25vw, 50vw",
  std: "(min-width: 1024px) 25vw, 50vw",
};

export default function LifeGallery({ items, categories, programmes }) {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const dialogRef = useRef(null);

  const byId = Object.fromEntries(categories.map((category) => [category.id, category]));

  const visible =
    filter === "all"
      ? items.filter((item) => expanded || item.featured)
      : items.filter((item) => item.category === filter);

  const hiddenCount = items.length - items.filter((item) => item.featured).length;
  const showProgrammesTile = filter === "all";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();
  }, [openIndex]);

  const step = (direction) =>
    setOpenIndex((index) =>
      index === null ? null : (index + direction + visible.length) % visible.length,
    );

  const chooseFilter = (id) => {
    setFilter(id);
    setOpenIndex(null);
  };

  const current = openIndex !== null ? visible[openIndex] : null;

  /* On the two-column phone grid, `std` and `tall` tiles take half a row. If
     there is an odd number of them the last one is left alone beside a hole,
     so that one runs the full width below 640px instead. */
  const shapeOf = (item, index) => item.shape ?? PATTERN[index % PATTERN.length];
  const halves = visible
    .map((item, index) => ({ index, shape: shapeOf(item, index) }))
    .filter(({ shape }) => shape === "std" || shape === "tall");
  const widenOnPhone = halves.length % 2 === 1 ? halves[halves.length - 1].index : -1;

  return (
    <>
      {/* Filters. A scrolling row on phones rather than a wrap, so the grid
          starts at the same height whichever chip is chosen. */}
      <div
        role="group"
        aria-label="Filter photographs"
        className="snap-track -mx-6 mt-10 flex gap-2 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:px-0 lg:mt-12"
      >
        <FilterChip active={filter === "all"} onClick={() => chooseFilter("all")} count={items.length}>
          All
        </FilterChip>
        {categories.map((category) => (
          <FilterChip
            key={category.id}
            active={filter === category.id}
            onClick={() => chooseFilter(category.id)}
            count={items.filter((item) => item.category === category.id).length}
            dot={category.dot}
          >
            {category.label}
          </FilterChip>
        ))}
      </div>

      {/* `key` remounts the grid on a filter change so the tiles replay their
          entrance; the global reduced-motion rule flattens it to an instant. */}
      <ul
        key={filter}
        className="mt-8 grid grid-flow-row-dense auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[220px] sm:gap-4 lg:auto-rows-[240px] lg:grid-cols-4"
      >
        {visible.map((item, index) => {
          const shape = shapeOf(item, index);
          const category = byId[item.category];
          const phoneWide = index === widenOnPhone ? "col-span-2 sm:col-span-1" : "";

          const tile = (
            <li
              key={item.photo.src}
              className={`${SHAPES[shape]} ${phoneWide} animate-[loader-in_0.6s_var(--ease-out-soft)_both]`}
              style={{ animationDelay: `${Math.min(index, 10) * 45}ms` }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                aria-label={`Open photograph: ${item.caption}`}
                className="group relative block h-full w-full overflow-hidden rounded-[1.5rem] bg-canvas-warm text-left"
              >
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  fill
                  sizes={SIZES[shape]}
                  style={{ objectPosition: item.photo.focal ?? "50% 50%" }}
                  className="object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
                />
                <span className="absolute bottom-3 left-3 right-3 flex sm:bottom-4 sm:left-4">
                  <span className="inline-flex max-w-full items-center gap-2 rounded-xl bg-canvas/95 px-3 py-1.5 sm:rounded-pill font-sans text-[0.8125rem] font-medium leading-tight text-ink shadow-sm">
                    <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${category?.dot ?? "bg-teal"}`} />
                    <span className="line-clamp-2 sm:truncate">{item.caption}</span>
                  </span>
                </span>
              </button>
            </li>
          );

          /* The programmes tile sits fourth in reading order, so on a phone
             it arrives early rather than after every photograph. */
          if (showProgrammesTile && index === PROGRAMMES_AT) {
            return [
              <li
                key="programmes"
                className="col-span-2 row-span-2 animate-[loader-in_0.6s_var(--ease-out-soft)_both] lg:col-span-1"
                style={{ animationDelay: `${PROGRAMMES_AT * 45}ms` }}
              >
                <ProgrammesTile programmes={programmes} />
              </li>,
              tile,
            ];
          }

          return tile;
        })}
      </ul>

      {filter === "all" && hiddenCount > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="rounded-pill border border-rule-strong px-6 py-3 font-sans text-body-sm font-medium text-ink transition-colors duration-300 ease-out-soft hover:border-teal hover:bg-teal hover:text-ink-invert"
          >
            {expanded ? "Show fewer photos" : `Show all ${items.length} photos`}
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label={current ? current.caption : "Photograph"}
        onClose={() => setOpenIndex(null)}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === event.currentTarget) setOpenIndex(null);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-canvas-deep/85 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="flex w-[min(92vw,70rem)] flex-col items-center">
            <div className="relative">
              <Image
                key={current.photo.src}
                src={current.photo.src}
                alt={current.photo.alt}
                width={current.photo.width}
                height={current.photo.height}
                sizes="92vw"
                className="h-auto max-h-[78vh] w-auto rounded-[1.25rem] object-contain"
              />
            </div>

            <figcaption className="mt-5 flex w-full max-w-2xl items-center justify-between gap-4 text-ink-invert">
              <span className="flex items-center gap-2 font-sans text-body-sm">
                <span aria-hidden="true" className={`h-2 w-2 rounded-full ${byId[current.category]?.dot ?? "bg-teal"}`} />
                {current.caption}
                <span className="ml-2 tabular-nums text-ink-invert/60">
                  {openIndex + 1} / {visible.length}
                </span>
              </span>

              <span className="flex gap-2">
                <RoundButton label="Previous photograph" onClick={() => step(-1)} path="M15 5l-7 7 7 7" />
                <RoundButton label="Next photograph" onClick={() => step(1)} path="M9 5l7 7-7 7" />
                <RoundButton label="Close" onClick={() => setOpenIndex(null)} path="M6 6l12 12M18 6L6 18" />
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

function FilterChip({ active, onClick, count, dot, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center gap-2 rounded-pill border px-4 py-2.5 font-sans text-body-sm font-medium transition-colors duration-300 ease-out-soft ${
        active
          ? "border-purple bg-purple text-ink-invert"
          : "border-rule-strong bg-canvas-lift text-ink hover:border-purple-mid"
      }`}
    >
      {dot && <span aria-hidden="true" className={`h-2 w-2 rounded-full ${dot}`} />}
      {children}
      <span className={`tabular-nums text-caption ${active ? "text-ink-invert/70" : "text-ink-soft"}`}>
        {count}
      </span>
    </button>
  );
}

/**
 * The one tile that is not a photograph: a way from "what do they do?" to the
 * programme that does it. The names are the client's, from content/programmes.
 */
function ProgrammesTile({ programmes }) {
  return (
    <div className="on-dark flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] bg-canvas-deep p-6 text-ink-invert sm:p-7">
      <div>
        <p className="font-sans text-eyebrow uppercase text-gold">Programmes</p>
        <p className="mt-3 font-display text-h2 text-ink-invert">Find the one that fits.</p>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {programmes.map((programme) => (
          <li key={programme.slug}>
            <Link
              href={`/programmes/${programme.slug}`}
              className="inline-block rounded-pill border border-rule-invert px-3 py-1.5 font-sans text-[0.8125rem] font-medium text-ink-invert no-underline transition-colors duration-300 ease-out-soft hover:border-gold hover:bg-gold hover:text-purple"
            >
              {programme.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoundButton({ label, onClick, path }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-pill border border-rule-invert text-ink-invert transition-colors duration-300 ease-out-soft hover:border-gold hover:text-gold"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
