import Link from "next/link";
import type { ReadCard } from "@/lib/content";

export default function ArticleAside({
  related,
  categories,
  currentCategory,
}: {
  related: ReadCard[];
  categories: { name: string; count: number }[];
  currentCategory: string;
}) {
  return (
    <div className="space-y-12">
      {related.length > 0 && (
        <section>
          <p className="mb-5 font-sans text-[10px] uppercase tracking-[0.24em] text-ink/40">
            More in {currentCategory}
          </p>
          <ul className="space-y-5">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/reads/${r.slug}`} className="group block">
                  <p className="font-serif text-[15px] leading-snug text-ink transition-colors group-hover:text-rouge-soft">
                    {r.title}
                  </p>
                  <p className="mt-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-ink/40 tabular-nums">
                    {r.date}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.24em] text-ink/40">Browse topics</p>
        <ul className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = c.name === currentCategory;
            return (
              <li key={c.name}>
                <Link
                  href={`/reads?category=${encodeURIComponent(c.name)}`}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] transition-colors duration-300 ${
                    on
                      ? "border-rouge/50 bg-rouge/10 text-rouge-soft"
                      : "border-white/12 text-ink/60 hover:border-white/30 hover:text-ink"
                  }`}
                >
                  {c.name}
                  <span className="text-ink/30 tabular-nums">{c.count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
