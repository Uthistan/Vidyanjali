import { allRoutes, site } from "@/content/site";
import { programmeSlugs } from "@/content/programmes";

/**
 * Every indexable route.
 *
 * The programme detail pages are derived from the programme data rather than
 * listed, so a new programme appears here the moment it appears in
 * content/programmes.js and cannot be forgotten. They sit below the top-level
 * pages in priority but above nothing — each is a real page with its own
 * title, and several are the only page on the site that names their subject.
 */
export default function sitemap() {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...allRoutes.map((item) => ({
      url: new URL(item.href, site.url).toString(),
      lastModified: now,
      priority: 0.7,
    })),
    ...programmeSlugs.map((slug) => ({
      url: new URL(`/programmes/${slug}`, site.url).toString(),
      lastModified: now,
      priority: 0.6,
    })),
  ];
}
