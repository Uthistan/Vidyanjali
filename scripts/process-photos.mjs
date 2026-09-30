/**
 * Photo pipeline — Stage 1.
 *
 * Turns the client's WhatsApp-compressed originals into the web masters in
 * `public/photos/`. Re-runnable: point PHOTO_SOURCE_DIR at the supplied folder
 * and run `node scripts/process-photos.mjs`.
 *
 *   PHOTO_SOURCE_DIR="~/Downloads/WhatsApp Unknown ..." node scripts/process-photos.mjs
 *
 * EDITING POLICY — deliberately narrow. Every operation here is one of the
 * five safe classes agreed for this project: crop, straighten, exposure,
 * white balance, subtle colour correction. Nothing is generated, retouched,
 * face-altered or invented. `crop` values are fractions of the source frame,
 * so they stay correct if the client later supplies the same shots at a
 * higher resolution.
 *
 * NOTE ON RESOLUTION: every original is a WhatsApp re-encode, portrait, and
 * no more than 1600px on its long edge. There is no source here that can fill
 * a full-bleed 16:9 desktop hero at acceptable quality. The crops below are
 * therefore portrait and squarish by necessity, not by preference — see the
 * `aspect` notes in src/content/photos.js.
 */

import { mkdir, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { homedir } from "node:os";
import sharp from "sharp";

const SOURCE_DIR =
  process.env.PHOTO_SOURCE_DIR ??
  path.join(homedir(), "Downloads", "WhatsApp Unknown 2026-09-02 at 20.03.46");

/* The second delivery: 27 files named 1.jpg–27.jpg, kept in the git-ignored
   `photo-sources/` folder at the repo root so the masters can be rebuilt. */
const SOURCE_DIR_2 =
  process.env.PHOTO_SOURCE_DIR_2 ??
  path.join(process.cwd(), "photo-sources", "batch-2");

const OUT_DIR = path.join(process.cwd(), "public", "photos");

/**
 * The KEEP set. Anything absent from this list was rejected in the audit —
 * see src/content/photos.js for the reason against each rejection.
 *
 * `crop`   {x, y, w, h} as fractions of the source frame.
 * `adjust` optional tone work. `linear: [a, b]` is out = a*in + b, so a > 1
 *          adds contrast and b > 0 lifts shadows. `saturation` < 1 pulls
 *          colour back toward the warm-neutral palette.
 */
const PHOTOS = [
  {
    id: "one-to-one-session",
    source: "13.07.07",
    // Trim the bare feet and the bag under the desk out of the bottom edge,
    // keep enough of the barred window for the light to read.
    crop: { x: 0.03, y: 0.2, w: 0.95, h: 0.585 },
    // Daylight through a green-shaded window leaves a yellow-green cast.
    adjust: { saturation: 0.9, linear: [1.04, -4] },
  },
  {
    id: "park-day",
    source: "13.08.05",
    // The only near-landscape frame in the set: the boy and the crocodile
    // sculpture sit in a band across the middle third.
    crop: { x: 0.0, y: 0.3, w: 1.0, h: 0.42 },
    // Midday sun — open the shadows, hold the saturation of the red earth.
    adjust: { saturation: 0.92, linear: [0.96, 14] },
  },
  {
    id: "clay-in-hand",
    source: "13.09.19",
    // The strongest detail frame in the set. Crop to the hand and the figure;
    // the blurred curtain on the right adds nothing.
    crop: { x: 0.02, y: 0.12, w: 0.8, h: 0.72 },
    // Mixed light (cool window, warm tungsten). Pull the orange back a little.
    adjust: { saturation: 0.88, linear: [1.02, 0] },
  },
  {
    id: "clay-work-detail",
    source: "13.09.42",
    // Top-down, faces out of frame. Texture, not portraiture.
    crop: { x: 0.0, y: 0.05, w: 1.0, h: 0.85 },
    adjust: { saturation: 0.9 },
  },
  {
    id: "clay-work",
    source: "13.10.12",
    // Over-the-shoulder; the child is unidentifiable. Preferred over the
    // near-identical 13.10.04, which frames the same moment more loosely.
    crop: { x: 0.0, y: 0.02, w: 1.0, h: 0.9 },
    adjust: { saturation: 0.9 },
  },
  {
    id: "hands-mirroring",
    source: "13.12.59",
    // The best frame supplied. A wide field of plain wall above the pair is
    // usable as type space, so the crop keeps it rather than closing in.
    crop: { x: 0.02, y: 0.1, w: 0.96, h: 0.85 },
    adjust: { saturation: 0.94, linear: [1.05, -6] },
  },
  {
    id: "walking-together",
    source: "13.14.53",
    // Everyone is walking away from camera — the whole group is anonymous.
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 0.82 },
    // Whitewashed walls are close to clipping; ease the highlights down.
    adjust: { saturation: 0.9, linear: [0.94, 6] },
  },
  {
    id: "at-the-window",
    source: "13.19.58",
    // Calm, anonymous, and the only frame with real negative space.
    crop: { x: 0.02, y: 0.02, w: 0.96, h: 0.94 },
    adjust: { saturation: 0.93 },
  },
  {
    id: "festival-rangoli",
    source: "13.20.02",
    // Cropped to the rangoli alone. The full frame shows an identifiable
    // young woman and a scuffed corridor wall; the floral detail is both the
    // better picture and the one that needs no consent conversation.
    crop: { x: 0.355, y: 0.63, w: 0.5, h: 0.325 },
    adjust: { saturation: 0.9, linear: [1.03, 0] },
  },
  {
    id: "shared-table",
    source: "13.20.01 (1)",
    // Soft — a video frame, not a photograph. Held in the set only because it
    // is the sole usable image of two children working alongside each other.
    // Small placements only; never a hero. See photos.js.
    crop: { x: 0.0, y: 0.1, w: 1.0, h: 0.62 },
    adjust: { saturation: 0.9, linear: [1.03, 2] },
  },
];

/**
 * The second delivery. Every file is 1200×1600 portrait (19.jpg is 1012 wide,
 * 16.jpg 1168). `source` is the exact filename. Rejections from this batch are
 * listed with their reasons in `rejected` in src/content/photos.js.
 */
const PHOTOS_2 = [
  {
    id: "beach-slide",
    source: "3.jpg",
    // The hero. Full frame: the sun, the open sky and the child climbing the
    // slide are the picture, and the hero crops it further by `focal`.
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.95 },
  },
  {
    id: "sand-and-sky",
    source: "4.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.95 },
  },
  {
    id: "beach-shelter",
    source: "5.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.95 },
  },
  {
    id: "beach-climbing",
    source: "2.jpg",
    // Trim the empty sky above the play frame.
    crop: { x: 0.0, y: 0.06, w: 1.0, h: 0.94 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "beach-sitting",
    source: "1.jpg",
    crop: { x: 0.0, y: 0.08, w: 1.0, h: 0.92 },
    adjust: { saturation: 0.95 },
  },
  {
    id: "beach-swing",
    source: "22.jpg",
    // Preferred over 21.jpg, the same swing a moment earlier with the face
    // turned down.
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.95 },
  },
  {
    id: "beach-smile",
    source: "6.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.95 },
  },
  {
    id: "park-path",
    source: "17.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "park-rest",
    source: "8.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "park-tree",
    source: "15.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "park-yellow-dress",
    source: "7.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "dance-class",
    source: "9.jpg",
    // Cool fluorescent studio light; warm it slightly toward the palette.
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.95, linear: [1.03, 0] },
  },
  {
    id: "dance-studio",
    source: "10.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
  },
  {
    id: "dance-barre",
    source: "23.jpg",
    // Preferred over the near-identical 24.jpg.
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
  },
  {
    id: "festival-pair",
    source: "12.jpg",
    // Preferred over 14.jpg (same moment) and 11.jpg (same session).
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "festival-altar",
    source: "13.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "festival-pookalam",
    source: "20.jpg",
    // Preferred over 18.jpg: same moment, but here the boy is looking at the
    // pookalam rather than at the camera.
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.9 },
  },
  {
    id: "sensory-blocks",
    source: "19.jpg",
    // A CINEMATIC video-mode badge is burned into the top-left corner; the
    // crop takes the top 8% off to remove it.
    crop: { x: 0.0, y: 0.08, w: 1.0, h: 0.92 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "bus-window",
    source: "26.jpg",
    crop: { x: 0.0, y: 0.0, w: 1.0, h: 1.0 },
    adjust: { saturation: 0.92 },
  },
  {
    id: "bus-ride",
    source: "25.jpg",
    // Cropped to the left two-thirds: the right edge shows another passenger
    // facing the camera who may be a member of the public.
    crop: { x: 0.0, y: 0.12, w: 0.68, h: 0.88 },
    adjust: { saturation: 0.92 },
  },
];

/**
 * WhatsApp names are long and carry a date the audit does not use, so a photo
 * is addressed by its timestamp alone.
 *
 * Matched on the exact tail, NOT with `includes`: the set contains both
 * "... at 13.19.58.jpeg" and "... at 13.19.58 (1).jpeg", and a substring test
 * silently resolves the first to whichever of the two `readdir` happens to
 * return first. Variants are named in full — "13.19.58 (1)".
 */
function findSource(files, timestamp) {
  const tail = ` at ${timestamp}.jpeg`;
  return files.find((file) => file.endsWith(tail));
}

/** Exact filename match, for the second batch's plain numbered files. */
function findExact(files, name) {
  return files.find((file) => file === name);
}

/**
 * Each batch runs only if its folder is present, so rebuilding one delivery
 * never requires the other to be on disk — and never touches its masters.
 */
const BATCHES = [
  { dir: SOURCE_DIR, env: "PHOTO_SOURCE_DIR", photos: PHOTOS, find: findSource },
  { dir: SOURCE_DIR_2, env: "PHOTO_SOURCE_DIR_2", photos: PHOTOS_2, find: findExact },
];

async function processPhoto(file, photo) {
  // `rotate()` with no argument applies the EXIF orientation and drops the
  // tag, so the crop fractions below are measured against the upright frame.
  const pipeline = sharp(file).rotate();
  const { width, height } = await pipeline.metadata();

  const { x, y, w, h } = photo.crop;
  const extract = {
    left: Math.round(x * width),
    top: Math.round(y * height),
    width: Math.round(w * width),
    height: Math.round(h * height),
  };

  let out = pipeline.extract(extract);

  if (photo.adjust?.linear) {
    out = out.linear(...photo.adjust.linear);
  }

  if (photo.adjust?.saturation) {
    out = out.modulate({ saturation: photo.adjust.saturation });
  }

  // A light pass to recover the detail the source's own JPEG compression
  // softened. Not a substitute for a sharper original.
  out = out.sharpen({ sigma: 0.6 });

  const target = path.join(OUT_DIR, `${photo.id}.jpg`);
  const info = await out
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(target);

  console.log(
    `  ok    ${photo.id.padEnd(20)} ${info.width}×${info.height}` +
      `  ${(info.size / 1024).toFixed(0)}KB`,
  );
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  for (const batch of BATCHES) {
    if (!existsSync(batch.dir)) {
      console.warn(
        `Source folder not found, batch skipped:\n  ${batch.dir}\n` +
          `  Set ${batch.env} to the folder holding these originals.`,
      );
      continue;
    }

    const files = await readdir(batch.dir);

    for (const photo of batch.photos) {
      const file = batch.find(files, photo.source);

      if (!file) {
        console.warn(`  skip  ${photo.id} — no source matching "${photo.source}"`);
        continue;
      }

      await processPhoto(path.join(batch.dir, file), photo);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
