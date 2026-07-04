import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getReadSlugs } from "@/lib/reads";
import { WORK_CATEGORIES, getProjectParams } from "@/lib/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/offerings`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/reads`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const workCategories: MetadataRoute.Sitemap = WORK_CATEGORIES.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getReadSlugs();
    posts = slugs.map((slug) => ({ url: `${SITE_URL}/reads/${slug}`, changeFrequency: "monthly", priority: 0.6 }));
  } catch {
    // ignore
  }

  let projects: MetadataRoute.Sitemap = [];
  try {
    const params = await getProjectParams();
    projects = params.map((p) => ({
      url: `${SITE_URL}/work/${p.category}/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // ignore
  }

  return [...staticRoutes, ...workCategories, ...posts, ...projects];
}
