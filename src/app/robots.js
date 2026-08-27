import { site } from "@/content/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* Internal design reference — not for indexing. */
      disallow: "/styleguide",
    },
    sitemap: new URL("/sitemap.xml", site.url).toString(),
  };
}
