import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { getRead, getReadSlugs } from "@/lib/reads";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

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

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-5 text-[17px] leading-relaxed text-ink/75">{children}</p>,
    h2: ({ children }) => <h2 className="mb-4 mt-10 font-serif text-[28px] font-normal text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-3 mt-8 font-serif text-[22px] font-normal text-ink">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-rouge pl-4 font-serif text-[20px] italic text-ink/80">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-rouge-soft underline underline-offset-2">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.asset ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(value as SanityImageSource).width(1200).url()}
          alt={value?.alt || ""}
          className="my-8 w-full rounded-xl border border-white/10"
        />
      ) : null,
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getRead(slug);
  if (!post) notFound();

  const body = post.body as React.ComponentProps<typeof PortableText>["value"] | undefined;

  return (
    <article className="mx-auto max-w-2xl px-[6vw] pb-[20vh] pt-[22vh]">
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
        {body && Array.isArray(body) && body.length > 0 ? (
          <PortableText value={body} components={ptComponents} />
        ) : (
          <p className="font-sans text-[13px] uppercase tracking-[0.2em] text-ink/40">Full article coming soon</p>
        )}
      </div>
    </article>
  );
}
