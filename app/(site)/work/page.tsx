import Link from "next/link";
import { WORK_CATEGORIES, getCategoryCounts } from "@/lib/work";

export const metadata = {
  title: "Product Design Portfolio in India | Neha Thakkar",
  description:
    "Case studies, UX audits, branding, and design systems. Browse a product design portfolio from India, built for startups and brands worldwide.",
  alternates: { canonical: "/work" },
};
export const revalidate = 60;

const COVERS = [
  "linear-gradient(135deg, #5b1a30, #2a0a16)",
  "linear-gradient(135deg, #7a2440, #3d0f20)",
  "radial-gradient(120% 120% at 20% 10%, #9b2d4f, #2a0a16 60%)",
  "linear-gradient(135deg, #3d0f20, #1a0710)",
  "radial-gradient(120% 120% at 80% 0%, #7a2440, #2a0a16 55%)",
  "linear-gradient(135deg, #5b1a30, #3d0f20)",
];

export default async function WorkPage() {
  const counts = await getCategoryCounts();

  return (
    <section className="px-[6vw] pb-[16vh] pt-[22vh]">
      <header className="mb-16 max-w-3xl">
        <span className="eyebrow">Portfolio</span>
        <h1 className="mt-5 font-serif text-[clamp(40px,7vw,84px)] font-normal leading-[0.95]">
          Selected <span className="italic text-rouge-soft">work</span>
        </h1>
        <p className="mt-6 text-[clamp(16px,2vw,20px)] leading-relaxed text-ink/65">
          A product design portfolio from India, sorted by what you&rsquo;re after: case studies, UX
          audits, branding, design systems, and experiments.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORK_CATEGORIES.map((c, i) => {
          const count = counts[c.slug] ?? 0;
          return (
            <Link
              key={c.slug}
              href={`/work/${c.slug}`}
              className="glass group flex min-h-[240px] flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-rouge/40"
            >
              <div className="relative h-28 w-full" style={{ background: COVERS[i % COVERS.length] }}>
                <div className="absolute inset-0 bg-gradient-to-t from-wine-900/50 to-transparent" />
                <span className="absolute right-4 top-4 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/60 tabular-nums">
                  {count} {count === 1 ? "project" : "projects"}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h2 className="font-serif text-[24px] font-normal leading-tight text-ink">{c.title}</h2>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{c.description}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-ink/50 transition-colors group-hover:text-rouge-soft">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
