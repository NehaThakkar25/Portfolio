import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

export type WorkCategory = { slug: string; title: string; description: string };

export const WORK_CATEGORIES: WorkCategory[] = [
  { slug: "case-studies", title: "Case Studies", description: "End-to-end deep dives, from the problem to the outcome." },
  { slug: "product-design", title: "Product Design", description: "Shipped products and the thinking behind them." },
  { slug: "ux-audits", title: "UX Audits", description: "Heuristic reviews that surface friction and the fixes." },
  { slug: "branding", title: "Branding & Identity", description: "Visual identity and brand systems." },
  { slug: "design-systems", title: "Design Systems", description: "Component libraries, tokens, and documentation." },
  { slug: "concepts", title: "Concepts & Explorations", description: "Self-initiated redesigns and experiments." },
];

export const getCategory = (slug: string) => WORK_CATEGORIES.find((c) => c.slug === slug);

export type ProjectCard = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  year?: string;
  role?: string;
  coverUrl?: string;
};

export type ProjectFull = ProjectCard & {
  overview?: string;
  timeline?: string;
  tags?: string[];
  results?: { value: string; label: string }[];
  body?: unknown;
  publishedAt?: string;
};

type Raw = {
  slug: string;
  title: string;
  summary?: string;
  overview?: string;
  category: string;
  year?: string;
  role?: string;
  timeline?: string;
  tags?: string[];
  results?: { value: string; label: string }[];
  publishedAt?: string;
  cover?: Parameters<typeof urlFor>[0];
  body?: unknown;
};

const CARD = `"slug": slug.current, title, "summary": coalesce(summary, overview, ""), category, year, role, cover`;

function toCard(d: Raw): ProjectCard {
  return {
    slug: d.slug,
    title: d.title,
    summary: d.summary ?? "",
    category: d.category,
    year: d.year,
    role: d.role,
    coverUrl: d.cover ? urlFor(d.cover).width(1000).height(700).fit("crop").url() : undefined,
  };
}

export async function getProjectsByCategory(category: string): Promise<ProjectCard[]> {
  try {
    const docs = await client.fetch<Raw[]>(
      `*[_type == "project" && category == $category && defined(slug.current)] | order(publishedAt desc, _createdAt desc){ ${CARD} }`,
      { category }
    );
    return (docs ?? []).map(toCard);
  } catch {
    return [];
  }
}

export async function getCategoryCounts(): Promise<Record<string, number>> {
  try {
    const rows = await client.fetch<{ category: string }[]>(
      `*[_type == "project" && defined(slug.current)]{ category }`
    );
    const counts: Record<string, number> = {};
    (rows ?? []).forEach((r) => (counts[r.category] = (counts[r.category] ?? 0) + 1));
    return counts;
  } catch {
    return {};
  }
}

export async function getProject(slug: string): Promise<ProjectFull | null> {
  try {
    const d = await client.fetch<Raw | null>(
      `*[_type == "project" && slug.current == $slug][0]{ ${CARD}, overview, timeline, tags, results, publishedAt, body }`,
      { slug }
    );
    if (!d) return null;
    return {
      ...toCard(d),
      overview: d.overview,
      timeline: d.timeline,
      tags: d.tags,
      results: d.results,
      publishedAt: d.publishedAt,
      body: d.body,
    };
  } catch {
    return null;
  }
}

export async function getProjectParams(): Promise<{ category: string; slug: string }[]> {
  try {
    const rows = await client.fetch<{ category: string; slug: string }[]>(
      `*[_type == "project" && defined(slug.current)]{ category, "slug": slug.current }`
    );
    return rows ?? [];
  } catch {
    return [];
  }
}
