import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getReadSitemapEntries } from "@/lib/reads";
import { WORK_CATEGORIES, getProjectSitemapEntries } from "@/lib/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Build/deploy time: the honest <lastmod> for pages with no per-page tracking.
  const now = new Date();

  let reads: { slug: string; updatedAt?: string }[] = [];
  try {
    reads = await getReadSitemapEntries();
  } catch {
    // ignore
  }

  let projects: { category: string; slug: string; updatedAt?: string }[] = [];
  try {
    projects = await getProjectSitemapEntries();
  } catch {
    // ignore
  }

  // Freshest child date, so an index page reflects when its content last changed.
  const newest = (items: { updatedAt?: string }[]): Date => {
    const dates = items.map((i) => i.updatedAt).filter(Boolean) as string[];
    return dates.length ? new Date(dates.reduce((a, b) => (a > b ? a : b))) : now;
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/offerings`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/work`, lastModified: newest(projects), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/reads`, lastModified: newest(reads), changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const workCategories: MetadataRoute.Sitemap = WORK_CATEGORIES.map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    lastModified: newest(projects.filter((p) => p.category === c.slug)),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const posts: MetadataRoute.Sitemap = reads.map((e) => ({
    url: `${SITE_URL}/reads/${e.slug}`,
    lastModified: e.updatedAt ? new Date(e.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((e) => ({
    url: `${SITE_URL}/work/${e.category}/${e.slug}`,
    lastModified: e.updatedAt ? new Date(e.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...workCategories, ...posts, ...projectPages];
}
