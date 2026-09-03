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

async function main() {
  if (!existsSync(SOURCE_DIR)) {
    console.error(
      `Source folder not found:\n  ${SOURCE_DIR}\n\n` +
        `Set PHOTO_SOURCE_DIR to the folder holding the client's originals.`,
    );
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });
  const files = await readdir(SOURCE_DIR);

  for (const photo of PHOTOS) {
    const file = findSource(files, photo.source);

    if (!file) {
      console.warn(`  skip  ${photo.id} — no source matching "${photo.source}"`);
      continue;
    }

    // `rotate()` with no argument applies the EXIF orientation and drops the
    // tag, so the crop fractions below are measured against the upright frame.
    const pipeline = sharp(path.join(SOURCE_DIR, file)).rotate();
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
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
