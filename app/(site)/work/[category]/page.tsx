import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { WORK_CATEGORIES, getCategory, getProjectsByCategory } from "@/lib/work";

export const revalidate = 60;

export function generateStaticParams() {
  return WORK_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  return {
    title: cat ? `${cat.title} | Neha Thakkar` : "Work | Neha Thakkar",
    alternates: { canonical: `/work/${category}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const projects = await getProjectsByCategory(category);

  return (
    <section className="px-[6vw] pb-[16vh] pt-[22vh]">
      <Link
        href="/work"
        className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/45 transition-colors hover:text-rouge"
      >
        ← All work
      </Link>

      <header className="mb-14 mt-8 max-w-3xl">
        <span className="eyebrow">Work</span>
        <h1 className="mt-5 font-serif text-[clamp(36px,6vw,72px)] font-normal leading-[0.98]">{cat.title}</h1>
        <p className="mt-5 text-[clamp(16px,2vw,20px)] leading-relaxed text-ink/65">{cat.description}</p>
      </header>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-12 text-center">
          <p className="font-serif text-[22px] italic text-ink/70">Coming soon.</p>
          <p className="mt-3 font-sans text-[13px] uppercase tracking-[0.18em] text-ink/40">
            New {cat.title.toLowerCase()} are on the way.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${category}/${p.slug}`}
              className="glass group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-rouge/40"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-wine-800">
                {p.coverUrl && (
                  <Image
                    src={p.coverUrl}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-wine-900/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-x-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/45">
                  {p.role && <span>{p.role}</span>}
                  {p.role && p.year && <span className="text-ink/20">/</span>}
                  {p.year && <span>{p.year}</span>}
                </div>
                <h2 className="mt-3 font-serif text-[26px] font-normal leading-tight text-ink">{p.title}</h2>
                {p.summary && <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{p.summary}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
