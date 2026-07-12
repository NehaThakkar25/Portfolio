import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, getProjectParams, getCategory } from "@/lib/work";
import PortableBody from "@/components/PortableBody";

export const revalidate = 60;

export async function generateStaticParams() {
  const params = await getProjectParams();
  return params.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const project = await getProject(slug);
  return {
    title: project ? `${project.title} | Neha Thakkar` : "Work | Neha Thakkar",
    alternates: { canonical: `/work/${category}/${slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const cat = getCategory(category);

  return (
    <article className="px-[6vw] pb-[20vh] pt-[22vh]">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/work/${category}`}
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-ink/45 transition-colors hover:text-rouge"
        >
          ← {cat?.title ?? "Work"}
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/45">
          {project.role && <span className="text-rouge-soft">{project.role}</span>}
          {project.role && project.year && <span className="text-ink/20">/</span>}
          {project.year && <span>{project.year}</span>}
          {project.timeline && <span className="text-ink/20">/</span>}
          {project.timeline && <span>{project.timeline}</span>}
        </div>

        <h1 className="mt-5 font-serif text-[clamp(34px,5.5vw,64px)] font-normal leading-[1.05]">
          {project.title}
        </h1>
        {project.overview && (
          <p className="mt-7 text-[clamp(17px,2.2vw,22px)] leading-relaxed text-ink/70">{project.overview}</p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-ink/70"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {project.coverUrl && (
        <div className="relative mx-auto mt-12 aspect-[16/9] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10">
          <Image src={project.coverUrl} alt={project.title} fill sizes="100vw" className="object-cover" priority />
        </div>
      )}

      {project.results && project.results.length > 0 && (
        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
          {project.results.map((r, i) => (
            <div key={i} className="text-center">
              <p className="font-sans text-[clamp(26px,3vw,40px)] font-semibold tabular-nums text-ink">{r.value}</p>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.16em] text-ink/50">{r.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mx-auto mt-14 max-w-2xl">
        {project.body && Array.isArray(project.body) && project.body.length > 0 ? (
          <PortableBody value={project.body} />
        ) : (
          <p className="border-t border-white/10 pt-10 font-sans text-[13px] uppercase tracking-[0.2em] text-ink/40">
            Full case study coming soon
          </p>
        )}
      </div>
    </article>
  );
}
