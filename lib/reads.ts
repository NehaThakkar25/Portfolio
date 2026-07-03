import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { posts as seedPosts, type ReadCard } from "@/lib/content";

export type ReadFull = ReadCard & { body?: unknown; publishedAt?: string };

function fmtDate(iso?: string): string {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

const LIST_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){
  "slug": slug.current, title, excerpt, category, publishedAt, readTime, cover
}`;

const ONE_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  "slug": slug.current, title, excerpt, category, publishedAt, readTime, cover, body
}`;

const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`;

type Raw = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  readTime?: string;
  cover?: Parameters<typeof urlFor>[0];
  body?: unknown;
};

/** All reads. Falls back to the local seed when Sanity is empty or unreachable. */
export async function getReads(): Promise<ReadCard[]> {
  try {
    const docs = await client.fetch<Raw[]>(LIST_QUERY);
    if (docs?.length) {
      return docs.map((d) => ({
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt ?? "",
        category: d.category ?? "",
        date: fmtDate(d.publishedAt),
        readTime: d.readTime ?? "",
        coverUrl: d.cover ? urlFor(d.cover).width(800).height(500).fit("crop").url() : undefined,
      }));
    }
  } catch {
    // network/CORS/empty — fall through to seed
  }
  return seedPosts.map((p) => ({ ...p }));
}

export async function getRead(slug: string): Promise<ReadFull | null> {
  try {
    const d = await client.fetch<Raw | null>(ONE_QUERY, { slug });
    if (d) {
      return {
        slug: d.slug,
        title: d.title,
        excerpt: d.excerpt ?? "",
        category: d.category ?? "",
        date: fmtDate(d.publishedAt),
        readTime: d.readTime ?? "",
        coverUrl: d.cover ? urlFor(d.cover).width(1400).url() : undefined,
        body: d.body,
        publishedAt: d.publishedAt,
      };
    }
  } catch {
    // fall through to seed
  }
  const p = seedPosts.find((s) => s.slug === slug);
  return p ? { ...p } : null;
}

export async function getReadSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch<string[]>(SLUGS_QUERY);
    if (slugs?.length) return slugs;
  } catch {
    // fall through
  }
  return seedPosts.map((p) => p.slug);
}
