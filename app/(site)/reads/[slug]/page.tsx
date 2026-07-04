import Link from "next/link";
import { notFound } from "next/navigation";
import { getRead, getReadSlugs } from "@/lib/reads";
import { blogPostingSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import PortableBody from "@/components/PortableBody";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getReadSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getRead(slug);
  return { title: post ? `${post.title} | Neha Thakkar` : "Reads | Neha Thakkar" };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getRead(slug);
  if (!post) notFound();

  const body = post.body;
  const hasBody = Array.isArray(body) && body.length > 0;

  return (
    <article className="mx-auto max-w-2xl px-[6vw] pb-[20vh] pt-[22vh]">
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          category: post.category,
          coverUrl: post.coverUrl,
          publishedAt: post.publishedAt,
        })}
      />
      <Link
        href="/reads"
        className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/45 transition-colors hover:text-rouge"
      >
        ← All reads
      </Link>

      <div className="mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/45">
        <span className="text-rouge-soft">{post.category}</span>
        <span className="text-ink/20">/</span>
        <span>{post.date}</span>
        <span className="text-ink/20">/</span>
        <span>{post.readTime}</span>
      </div>

      <h1 className="mt-5 font-serif text-[clamp(32px,5vw,60px)] font-normal leading-[1.08]">{post.title}</h1>
      <p className="mt-8 text-[clamp(17px,2.2vw,22px)] leading-relaxed text-ink/70">{post.excerpt}</p>

      <div className="mt-12 border-t border-white/10 pt-10">
        {hasBody ? (
          <PortableBody value={body} />
        ) : (
          <p className="font-sans text-[13px] uppercase tracking-[0.2em] text-ink/40">Full article coming soon</p>
        )}
      </div>
    </article>
  );
}
