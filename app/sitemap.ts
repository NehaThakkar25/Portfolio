import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getReadSlugs } from "@/lib/reads";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/offerings`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/reads`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  let posts: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getReadSlugs();
    posts = slugs.map((slug) => ({
      url: `${SITE_URL}/reads/${slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // ignore — sitemap still ships with the static routes
  }

  return [...staticRoutes, ...posts];
}
