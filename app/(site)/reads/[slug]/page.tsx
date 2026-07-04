import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getRead, getReadSlugs } from "@/lib/reads";
import { blogPostingSchema, faqSchema } from "@/lib/schema";
import { extractHeadings, type Heading } from "@/lib/toc";
import { profile } from "@/lib/content";
import JsonLd from "@/components/seo/JsonLd";
import PortableBody from "@/components/PortableBody";
import TableOfContents from "@/components/reads/TableOfContents";
import FaqSection from "@/components/reads/FaqSection";

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
  const faqs = post.faqs ?? [];
  const headings: Heading[] = extractHeadings(body);
  const tocHeadings = faqs.length > 0 ? [...headings, { id: "faqs", text: "FAQs", level: 2 }] : headings;

  return (
    <>
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
      {faqs.length > 0 && <JsonLd data={faqSchema(faqs)} />}

      <div className="grid grid-cols-1 gap-x-16 px-[6vw] pb-[20vh] pt-[16vh] lg:grid-cols-[200px_1fr]">
        {/* left: sticky table of contents (desktop only) */}
        <aside className="hidden lg:block">
          {tocHeadings.length > 0 && <TableOfContents headings={tocHeadings} variant="sidebar" />}
        </aside>

        {/* right: the article */}
        <article className="min-w-0">
          <Link
            href="/reads"
            className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/45 transition-colors hover:text-rouge"
          >
            ← All reads
          </Link>

          {/* banner */}
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
            {post.coverUrl ? (
              <Image src={post.coverUrl} alt={post.title} fill sizes="(max-width: 768px) 100vw, 720px" className="object-cover" priority />
            ) : (
              <div
                className="h-full w-full"
                style={{ background: "radial-gradient(120% 120% at 20% 10%, #9b2d4f, #2a0a16 60%)" }}
              />
            )}
          </div>

          {/* title */}
          {post.category && <p className="eyebrow mt-9">{post.category}</p>}
          <h1 className="mt-4 font-serif text-[clamp(36px,6vw,64px)] font-normal leading-[1.02]">{post.title}</h1>

          {/* author */}
          <div className="mt-8 flex items-center gap-3">
            <Image
              src="/neha-profile.png"
              alt={profile.name}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <div>
              <p className="font-sans text-[14px] text-ink">{profile.name}</p>
              <p className="font-sans text-[12px] text-ink/50">{profile.role}</p>
            </div>
          </div>

          {/* excerpt */}
          {post.excerpt && (
            <p className="mt-7 text-[clamp(18px,2.2vw,22px)] leading-relaxed text-ink/60">{post.excerpt}</p>
          )}

          {/* metadata */}
          <div className="mt-6 flex items-center gap-2.5 font-sans text-[12px] uppercase tracking-[0.16em] text-ink/45">
            {post.date && <span>{post.date}</span>}
            {post.date && post.readTime && <span className="text-ink/20">·</span>}
            {post.readTime && <span>{post.readTime}</span>}
          </div>

          <hr className="my-10 border-t border-white/10" />

          {/* mobile contents */}
          {tocHeadings.length > 0 && (
            <div className="lg:hidden">
              <TableOfContents headings={tocHeadings} variant="mobile" />
            </div>
          )}

          {/* body */}
          {hasBody ? (
            <PortableBody value={body} />
          ) : (
            <p className="font-sans text-[13px] uppercase tracking-[0.2em] text-ink/40">Full article coming soon</p>
          )}

          {/* per-post FAQs */}
          <FaqSection faqs={faqs} />
        </article>
      </div>
    </>
  );
}
