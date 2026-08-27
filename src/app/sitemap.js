import { navItems, site } from "@/content/site";

export default function sitemap() {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    ...navItems.map((item) => ({
      url: new URL(item.href, site.url).toString(),
      lastModified: now,
      priority: 0.7,
    })),
  ];
}
