/**
 * Photo inventory.
 *
 * SOURCE: 17 photographs supplied by the client, all WhatsApp re-encodes, plus
 * ONE later supplied as a full-resolution landscape photograph — the hero
 * frame, `handsMirroring`. The WhatsApp masters in `public/photos/` are
 * produced by `scripts/process-photos.mjs`, which carries their crop and tone
 * values; the hero master was converted straight to JPEG with no crop or tone
 * work, because it needed none.
 *
 * WHAT THIS FILE IS FOR: components should never hardcode a photo path, an
 * alt string or a focal point. They take an entry from here. That keeps the
 * alt text — which is an accessibility obligation, not decoration — in one
 * reviewable place, and makes swapping a photograph a one-line edit.
 *
 * ALT TEXT RULE: describes only what is visibly in the frame. No child is
 * named, no diagnosis is implied, and no activity is asserted that the
 * picture does not actually show. Where the caption would be guessing at the
 * programme, it says what is happening instead.
 *
 * CONSENT: several originals show identifiable children and adults. Nothing
 * in `photos` below shows a face that is both sharp and forward-facing except
 * `handsMirroring`, which is flagged. Written photo consent must be confirmed
 * with the client before launch — see `consent` on each entry.
 */

/**
 * `aspect` is the master file's own ratio, for reserving layout space.
 * `focal`  is a CSS object-position, for when a component crops further.
 * `tone`   is the dominant cast, used to pick a matching surround.
 */
export const photos = {
  handsMirroring: {
    src: "/photos/hero.png",
    width: 1536,
    height: 1024,
    alt: "A boy and a therapist sitting cross-legged facing each other on a woven mat, palms raised and almost touching.",
    /* Cropping is vertical on every placement this frame is used in, so the
       focal point is pulled ABOVE centre: it trims the granite floor rather
       than the wall, and the wall is what carries the hero type. */
    focal: "50% 38%",
    tone: "warm",
    /* REPLACED, and the only master here that did not come out of the WhatsApp
       folder — it is also the only PNG. The client supplied this one directly
       as a proper photograph: 1536×1024, landscape, sharp, correctly exposed.
       The frame it replaces was a 922×1088 portrait re-encode that had to be
       upscaled about 1.5x and cropped to its middle third to run across the
       top of the homepage.
       PNG is an odd container for a photograph — the same pixels re-encode to
       roughly 350KB as JPEG against 2.5MB here — but next/image derives the
       AVIF and WebP the browser actually downloads, so the size costs the
       build and not the visitor. Convert it if the repo size ever matters.
       This is the first and so far only genuinely horizontal image in the set,
       which is why the hero is now built around it — see the `gaps` list
       below, where it was the standing request.
       It also has a large field of plain wall to the left of the pair. Measured
       against the heading purple, everything from the left edge to 34% across
       and from the top down to 60% sits between 8.0:1 and 10.8:1, so the hero
       statement can be set ON the photograph without a scrim behind it. */
    /* AN ART-DIRECTION CROP OF THE SAME PHOTOGRAPH, for narrow viewports.
       Cropping the landscape master to a phone would keep about 40% of its
       width — enough for the wall or enough for the two people, never both —
       so the client supplied a portrait recrop instead. Same frame, same
       moment, same alt text and the same consent position; only the framing
       differs, which is why it lives on this entry rather than as a second
       photograph. 1086×1448 is exactly 3:4, so the mobile hero sets that
       aspect and crops nothing at all. */
    mobile: {
      src: "/photos/hero-portrait.png",
      width: 1086,
      height: 1448,
    },
    quality: "keep",
    /* Sharper and more identifiable than the frame it replaces: both faces are
       in focus and the adult is close to three-quarters on. Written consent is
       not optional for this one. */
    consent: "required — both faces are clearly identifiable",
  },

  walkingTogether: {
    src: "/photos/walking-together.jpg",
    width: 960,
    height: 1050,
    alt: "A group of children and adults walking up a flight of steps together, some holding hands, seen from behind.",
    focal: "50% 40%",
    tone: "cool",
    /* Everyone is walking away from camera, so the whole group is anonymous.
       The strongest image in the set for journey, outing and community. */
    quality: "keep",
    consent: "not required — no identifiable faces",
  },

  atTheWindow: {
    src: "/photos/at-the-window.jpg",
    width: 1089,
    height: 1504,
    alt: "A child kneeling on a therapy bench at an open window, looking out at the trees.",
    focal: "50% 35%",
    tone: "cool",
    /* The calmest frame in the set and the highest resolution. Seen from
       behind. Teal shirt against green foliage sits close to the brand teal. */
    quality: "keep",
    consent: "not required — no identifiable face",
  },

  oneToOneSession: {
    src: "/photos/one-to-one-session.jpg",
    width: 912,
    height: 749,
    alt: "A teenage student and a teacher working through a notebook together at a desk beside a window.",
    focal: "50% 45%",
    tone: "warm",
    /* The only image showing older students and academic work. Both faces are
       turned away from camera. Near-landscape, so it can run wide. */
    quality: "keep",
    consent: "advisable — both people are recognisable in profile",
  },

  parkDay: {
    src: "/photos/park-day.jpg",
    width: 960,
    height: 538,
    alt: "A boy sitting on a large crocodile sculpture on a shaded earth path in a park.",
    focal: "50% 50%",
    tone: "warm",
    /* The ONLY genuinely landscape frame available, and the only outdoor
       image besides `walkingTogether`. Matches the Park day programme. */
    quality: "keep",
    consent: "advisable — the child is recognisable in profile",
  },

  clayInHand: {
    src: "/photos/clay-in-hand.jpg",
    width: 768,
    height: 922,
    alt: "An open palm holding a small seated figure modelled in terracotta clay.",
    focal: "50% 50%",
    tone: "warm",
    /* The best detail frame supplied — a finished piece of a child's work,
       with no child in shot. The natural choice for an editorial inset. */
    quality: "keep",
    consent: "not required — no identifiable person",
  },

  clayWork: {
    src: "/photos/clay-work.jpg",
    width: 960,
    height: 1152,
    alt: "A child sitting on the floor, shaping pieces of clay laid out on a sheet.",
    focal: "50% 45%",
    tone: "warm",
    /* Over-the-shoulder, so unidentifiable. Preferred over the near-identical
       13.10.04, which frames the same moment more loosely. */
    quality: "keep",
    consent: "not required — no identifiable face",
  },

  clayWorkDetail: {
    src: "/photos/clay-work-detail.jpg",
    width: 960,
    height: 1088,
    alt: "Clay and white paint on a child's hands and legs beside a sheet of modelled pieces.",
    focal: "50% 50%",
    tone: "warm",
    /* Same session as `clayWork`, framed as texture with no face in shot.
       Use ONE of the two in any given section, never both — they read as
       duplicates when they sit near each other. */
    quality: "keep",
    consent: "not required — no identifiable face",
  },

  festivalRangoli: {
    src: "/photos/festival-rangoli.jpg",
    width: 600,
    height: 520,
    alt: "A circular floral rangoli of marigolds, petals and leaves laid on the floor around a small lamp.",
    focal: "50% 50%",
    tone: "warm",
    /* Cropped out of a wider frame that also showed an identifiable young
       woman and a scuffed corridor wall. The detail is the better picture and
       needs no consent conversation. Small placements only — 600px wide. */
    quality: "keep",
    consent: "not required — cropped to exclude people",
  },

  sharedTable: {
    src: "/photos/shared-table.jpg",
    width: 906,
    height: 992,
    alt: "Two children sitting on the floor opposite each other, each rolling clay on a sheet.",
    focal: "50% 40%",
    tone: "warm",
    /* WEAKEST OF THE KEEP SET. A video frame, not a photograph — soft
       throughout and it will not stand up above about 450px wide. Held only
       because it is the sole usable image of two children working alongside
       each other. Never use as a hero. */
    quality: "hold",
    consent: "required — one face is identifiable",
  },
};

/**
 * Everything rejected, with the reason. Kept in the repo deliberately: without
 * it the next person to look at the client's folder re-litigates all of this,
 * and one of these files is genuinely unusable rather than merely weak.
 */
export const rejected = [
  {
    source: "13.20.00.jpeg",
    reason:
      "The entire iOS Photos interface is burned into the frame — status bar, date header, Edit button, filmstrip and toolbar. Unusable at any crop.",
  },
  {
    source: "13.19.59 (1).jpeg",
    reason:
      "A CINEMATIC video-mode badge is burned into the top-left corner, and the frame is a video still rather than a photograph. Croppable in principle, soft in practice.",
  },
  {
    source: "13.20.01.jpeg",
    reason: "Heavy motion blur throughout. No usable crop.",
  },
  {
    source: "13.19.58 (1).jpeg",
    reason: "Motion blur across the subject. Superseded by 13.19.58.",
  },
  {
    source: "13.10.04.jpeg",
    reason:
      "Near-duplicate of 13.10.12 from the same moment, framed more loosely. Only one of the pair should appear on the site.",
  },
  {
    source: "13.19.59.jpeg",
    reason:
      "Technically acceptable, but a lone child crouched with their back turned in an empty corridor reads as isolation. Wrong register for a brand about connection.",
  },
  {
    source: "13.15.12.jpeg",
    reason:
      "Train carriage, showing a member of staff and children forward-facing AND several members of the public who cannot have consented, one of them filming. Valuable subject — real-world travel — but it cannot ship without consent and a much tighter crop. Ask the client for a re-shoot.",
  },
  {
    source: "13.09.42.jpeg",
    reason:
      "Kept as clayWorkDetail rather than rejected, but noted here: it is the third frame of the same clay session. Do not place all three together.",
  },
];

/**
 * Photographs the site will want and the client has NOT supplied. Worth
 * handing back as a shot list rather than solving with stock or with a
 * loosely-related frame from the set above.
 */
export const gaps = [
  "Baking — a listed programme with no photograph at all.",
  "Dance — a listed programme with no photograph at all.",
  "Beach walk — a listed programme with no photograph at all.",
  "Group therapy — the 3-hour, five-child programme has no clear image.",
  "The building, the rooms and the entrance — there is no establishing shot of the centre anywhere in the set.",
  "Portraits of the founders and the team, for /about.",
  "More horizontal frames. The client has now supplied ONE — the hero, hands-mirroring, at 1536×1024 — and the homepage is built around it. Every other master is still portrait or squarish and no wider than 1600px, so there is still no second image that can run full-bleed across a desktop screen.",
];
