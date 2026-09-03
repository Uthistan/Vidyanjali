import { photos } from "./photos";

/**
 * The programmes Vidyanjali offers — the single source for the programme
 * index, every /programmes/[slug] detail page, their metadata, the sitemap
 * and the homepage index.
 *
 * SOURCE: the "PROGRAMS OFFERED" section of the client's content document, in
 * the order it was written. Every description, point and figure below is the
 * client's own wording. Nothing here was written for the page.
 *
 * WHY THE FILE LOOKS THIN. Four of the seven programmes have one sentence or
 * less, and two have no prose at all. That is the actual state of the supplied
 * content, and it is recorded honestly rather than padded: the detail template
 * renders only the blocks a programme has data for, so a programme with a name
 * and a photograph renders as a name and a photograph and looks deliberate.
 * Do NOT write copy to fill these out — ask the client. `contentGaps` at the
 * foot of this file is the standing list to hand back.
 *
 * ADDING A PROGRAMME. Append an entry to `SOURCE_PROGRAMMES`. The route, the
 * static params, the metadata, the sitemap entry, the index row, the
 * prev/next navigation and the "more programmes" block all follow from it.
 * Nothing else needs editing.
 *
 * FIELDS — all optional except `slug` and `name`.
 *   slug           the URL segment. Permanent once shipped.
 *   name           the client's spelling, sentence case, as written.
 *   description    one sentence, the client's. Doubles as the meta description.
 *   points         the client's own bullet phrases, verbatim.
 *   pointsHeading  structural label above `points`. Claims nothing; override
 *                  where "covers" would misdescribe the list.
 *   facts          figures restated from `description`, for the meta row.
 *                  NEVER a figure the client did not supply.
 *   images         `{ photo, caption }`, photo from content/photos.js. An
 *                  empty array is a real answer and renders no image section.
 *
 * `number` is derived from array position below, not authored, so the order on
 * the page and the numbers on it can never drift apart.
 */
const SOURCE_PROGRAMMES = [
  {
    slug: "individual-therapy",
    name: "Individual therapy",
    /* No description supplied. The page runs on name, number and photograph. */
    images: [
      /* The only frame in the set showing a one-to-one working session, and
         the only one showing older students. Chosen per the photo audit's
         mapping. The alt text describes the frame and does not assert that
         the session pictured is this programme. */
      { photo: photos.oneToOneSession },
    ],
  },
  {
    slug: "group-therapy",
    name: "Group therapy",
    description:
      "A carefully curated 3 hour programme with five children and 2 teachers.",
    /* Restated from the sentence above and from nowhere else. No duration,
       ratio or group size beyond these three numbers was supplied. */
    facts: [
      { value: "3", label: "hours" },
      { value: "5", label: "children" },
      { value: "2", label: "teachers" },
    ],
    points: [
      "Supports children’s various sensory needs and therapy",
      "Enhances functional ability to handle day to day living",
      "Socialisation",
      "Independence in daily skills",
    ],
    /* No photograph in the supplied set shows this programme. The clay and
       painting frames show children working alongside each other, but nothing
       identifies them as the three-hour group programme, so attaching one
       would be a claim the picture does not make. Left empty deliberately. */
    images: [],
  },
  {
    slug: "baking",
    name: "Baking",
    /* The source also carries the fragment "Program professional baker", which
       is too ambiguous to publish as written — left out pending clarification. */
    description:
      "Curates baking classes based on children’s ability with money concepts and exchanges.",
    /* No baking photograph exists in the supplied set. The rangoli frame is a
       festival activity and is NOT baking — see the note on `festivalRangoli`
       in content/photos.js. */
    images: [],
  },
  {
    slug: "park-day",
    name: "Park day",
    /* Source reads "meet the word" — corrected to "world". */
    description: "Encountering nature helps children to meet the world.",
    points: ["Grounding"],
    images: [
      /* The audit's one unambiguous programme match, and the only genuinely
         landscape frame supplied. */
      { photo: photos.parkDay },
    ],
  },
  {
    slug: "beach-walk",
    name: "Beach walk",
    description: "An organic active sensory therapy.",
    images: [],
  },
  {
    slug: "dance",
    name: "Dance",
    /* NOTHING was supplied for this programme — no description, no points, no
       photograph. The detail page is therefore a number, a title and a way
       onward, and that is the finished design, not an unfinished one. */
    images: [],
  },
  {
    slug: "one-day-events",
    name: "One day events",
    /* The source lists these two beneath the heading with no further detail;
       reading them as the events themselves is an inference to confirm. */
    points: ["Ula", "Baking"],
    /* "covers" would misread a list of event names. */
    pointsHeading: "The events",
    /* The rangoli photograph is a festival activity and has NOT been confirmed
       as part of Ula or of any one-day event. It stays off this page until the
       client says otherwise. */
    images: [],
  },
];

/** Structural label above `points` where the entry does not override it. */
const DEFAULT_POINTS_HEADING = "What the programme covers";

/**
 * The programmes, each with its derived display number and normalised
 * optional fields, so no consumer has to guard against a missing array.
 */
export const programmes = SOURCE_PROGRAMMES.map((programme, index) => ({
  ...programme,
  number: String(index + 1).padStart(2, "0"),
  images: programme.images ?? [],
  pointsHeading: programme.pointsHeading ?? DEFAULT_POINTS_HEADING,
}));

/** Every slug, for `generateStaticParams` and the sitemap. */
export const programmeSlugs = programmes.map((programme) => programme.slug);

/** One programme by slug, or undefined — the detail route's 404 gate. */
export function getProgramme(slug) {
  return programmes.find((programme) => programme.slug === slug);
}

/**
 * The previous and next programme in reading order, wrapping at both ends, so
 * the first and last pages have a complete navigation bar rather than a gap.
 */
export function programmeNeighbours(slug) {
  const index = programmes.findIndex((programme) => programme.slug === slug);
  if (index === -1) return null;

  const total = programmes.length;

  return {
    previous: programmes[(index - 1 + total) % total],
    next: programmes[(index + 1) % total],
    position: index + 1,
    total,
  };
}

/**
 * The programmes to offer at the foot of a detail page: the next few in
 * reading order, wrapping.
 *
 * DELIBERATELY NOT "related". The client's document does not group these
 * programmes, and no supplied content links any two of them, so an editorial
 * affinity — "if you read about Baking you'll want Beach walk" — would be
 * invented. Sequence is the one honest ordering available, and the block is
 * labelled "More programmes" to say exactly that. Swap this for a curated
 * mapping the day the client confirms one.
 */
export function moreProgrammes(slug, count = 3) {
  const index = programmes.findIndex((programme) => programme.slug === slug);
  if (index === -1) return [];

  const total = programmes.length;

  return Array.from({ length: Math.min(count, total - 1) }, (_, step) => (
    programmes[(index + step + 1) % total]
  ));
}

/**
 * Programme content the client has NOT supplied. Kept here alongside the data
 * so the gap is visible to whoever next opens this file, and so it can be
 * handed back as a list rather than quietly filled in.
 */
export const contentGaps = [
  "Individual therapy — no description of any kind. The page currently runs on a title and one photograph.",
  "Dance — nothing at all: no description, no points, no photograph.",
  "One day events — two event names, Ula and Baking, with no explanation of what either is. Confirm they are the events rather than a heading fragment.",
  "Baking — the fragment “Program professional baker” is unpublishable as written. Confirm what was meant.",
  "Every programme except Group therapy — no duration, frequency, group size or age range was supplied, so none is stated anywhere.",
  "No programme has a stated joining process. /programmes says nothing about admissions because nothing was supplied.",
];
