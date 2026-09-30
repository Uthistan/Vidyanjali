import Section from "@/components/layout/Section";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import LifeGallery from "@/components/home/LifeGallery";
import { photos } from "@/content/photos";
import { programmes } from "@/content/programmes";

/**
 * The page's photographic chapter, as a filterable bento grid.
 *
 * WHY A GRID YOU CAN SORT. With two deliveries there are now twenty-odd
 * usable photographs, and a parent looking at this section is usually asking
 * one specific question: what do they actually do all day? The filter chips
 * answer that directly — learning, outdoors, out and about, dance, festivals —
 * and the counts beside them show how much there is before a click.
 *
 * ROUNDED, SOFT, AND BRIGHT. Tiles are generously rounded and captions sit on
 * a cream pill ON the photograph rather than in a line of grey type beneath
 * it — warm and legible, the register families expect from a children's
 * centre. The pill is opaque cream, so the caption's contrast never depends
 * on the picture behind it.
 *
 * "ALL" IS CURATED, NOT EVERYTHING. It opens on the `featured` frames plus a
 * programmes tile, and "Show all photos" appends the rest. A category shows
 * its whole set. The hero frame (`beachSlide`) is left out so it is not
 * repeated a screen later; `sharedTable` and `clayWorkDetail` stay out as the
 * photo audit asks.
 *
 * CAPTIONS state what is in the picture and nothing else. No child is named,
 * no activity is claimed that the frame does not show, and none of them
 * asserts a therapeutic outcome. See the ALT TEXT RULE in content/photos.js.
 */

const CATEGORIES = [
  { id: "learning", label: "Learning", dot: "bg-purple-mid" },
  { id: "outdoors", label: "Outdoors", dot: "bg-teal" },
  { id: "out", label: "Out & about", dot: "bg-gold" },
  { id: "dance", label: "Dance", dot: "bg-purple" },
  { id: "festivals", label: "Festivals", dot: "bg-gold-deep" },
];

/* Order is the order "All" shows them in. `shape` overrides the grid's
   rotating pattern where a frame's own proportions demand it — the two
   landscape masters must run wide or they lose their subject. */
const ITEMS = [
  { photo: photos.walkingTogether, category: "out", caption: "Walking up together", featured: true },
  { photo: photos.danceClass, category: "dance", caption: "Arms up in the studio", featured: true },
  { photo: photos.atTheWindow, category: "learning", caption: "A window onto the trees", featured: true },
  { photo: photos.clayInHand, category: "learning", caption: "A finished clay piece", featured: true },
  { photo: photos.parkDay, category: "outdoors", caption: "Park day", featured: true, shape: "wide" },
  { photo: photos.festivalPair, category: "festivals", caption: "Dressed for a festival", featured: true },
  { photo: photos.sandAndSky, category: "outdoors", caption: "Lying in the sand", featured: true },
  { photo: photos.oneToOneSession, category: "learning", caption: "Working one to one", featured: true, shape: "wide" },
  { photo: photos.busWindow, category: "out", caption: "Watching from the bus", featured: true },
  { photo: photos.beachClimbing, category: "outdoors", caption: "Up the climbing wall", featured: true },

  { photo: photos.clayWork, category: "learning", caption: "Shaping clay on the floor" },
  { photo: photos.sensoryBlocks, category: "learning", caption: "Reaching for wooden blocks" },
  { photo: photos.festivalPookalam, category: "festivals", caption: "A pookalam for the festival" },
  { photo: photos.danceStudio, category: "dance", caption: "At the barre" },
  { photo: photos.beachShelter, category: "outdoors", caption: "Looking out from the shelter" },
  { photo: photos.festivalAltar, category: "festivals", caption: "Pots and peacock feathers" },
  { photo: photos.busRide, category: "out", caption: "On the bus" },
  { photo: photos.parkTree, category: "outdoors", caption: "Up in a tree" },
  { photo: photos.danceBarre, category: "dance", caption: "A rest on the barre" },
  { photo: photos.beachSwing, category: "outdoors", caption: "On the swings by the sea" },
  { photo: photos.festivalRangoli, category: "festivals", caption: "A floral rangoli" },
  { photo: photos.parkPath, category: "outdoors", caption: "A shaded path" },
  { photo: photos.parkRest, category: "outdoors", caption: "A pause on the rocks" },
  { photo: photos.beachSitting, category: "outdoors", caption: "Hands in the sand" },
  { photo: photos.beachSmile, category: "outdoors", caption: "On the sand" },
  { photo: photos.parkYellowDress, category: "outdoors", caption: "Sitting in the shade" },
];

export default function LifeAtVidyanjali() {
  const programmeLinks = programmes.map(({ slug, name }) => ({ slug, name }));

  return (
    <Section spacing="lg">
      <Reveal>
        <Eyebrow className="mb-5">Life at Vidyanjali</Eyebrow>
        <h2 className="max-w-[16ch] text-h1">Ordinary days, closely held.</h2>
      </Reveal>

      <LifeGallery
        items={ITEMS}
        categories={CATEGORIES}
        programmes={programmeLinks}
      />
    </Section>
  );
}
