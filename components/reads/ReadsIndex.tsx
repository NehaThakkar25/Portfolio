"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { ReadCard } from "@/lib/content";

// rotating plum-toned placeholders until real cover images are added
const COVERS = [
  "linear-gradient(135deg, #5b1a30, #2a0a16)",
  "linear-gradient(135deg, #7a2440, #3d0f20)",
  "radial-gradient(120% 120% at 20% 10%, #9b2d4f, #2a0a16 60%)",
  "linear-gradient(135deg, #3d0f20, #1a0710)",
  "radial-gradient(120% 120% at 80% 0%, #7a2440, #2a0a16 55%)",
  "linear-gradient(135deg, #5b1a30, #3d0f20)",
];

export default function ReadsIndex({ posts }: { posts: ReadCard[] }) {
  const [active, setActive] = useState("All");

  const categories = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((p) => (counts[p.category] = (counts[p.category] ?? 0) + 1));
    return [
      { name: "All", count: posts.length },
      ...Object.keys(counts)
        .sort()
        .map((name) => ({ name, count: counts[name] })),
    ];
  }, []);

  const visible = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="grid gap-10 lg:grid-cols-[180px_1fr] lg:gap-14">
      {/* category filter */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.24em] text-ink/40">Filter by</p>
        <div className="flex flex-wrap gap-2 lg:flex-col lg:gap-0.5">
          {categories.map((c) => {
            const on = active === c.name;
            return (
              <button
                key={c.name}
                type="button"
                onClick={() => setActive(c.name)}
                className={`flex items-center justify-between gap-3 rounded-full px-4 py-2 text-left text-[13px] transition-colors duration-300 lg:rounded-none lg:border-l lg:px-3 ${
                  on
                    ? "bg-rouge/10 text-ink lg:border-rouge lg:bg-transparent"
                    : "text-ink/55 hover:text-ink lg:border-white/10"
                }`}
              >
                <span>{c.name}</span>
                <span className="font-sans text-[11px] tabular-nums text-ink/35">{c.count}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, i) => (
          <Link
            key={post.slug}
            href={`/reads/${post.slug}`}
            className="glass group flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-rouge/40"
          >
            {/* cover: real image when set, otherwise a plum placeholder */}
            <div className="relative aspect-[16/10] w-full overflow-hidden" style={{ background: COVERS[i % COVERS.length] }}>
              {post.coverUrl ? (
                <Image
                  src={post.coverUrl}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center font-serif text-[clamp(28px,4vw,44px)] italic text-rouge-soft/25">
                  {post.category}
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-wine-900/50 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-sans text-[10px] uppercase tracking-[0.16em] text-ink/40">
                  <span className="text-rouge-soft">{post.category}</span>
                  <span className="text-ink/20">/</span>
                  <span>{post.date}</span>
                  <span className="text-ink/20">/</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="mt-4 font-serif text-[22px] font-normal leading-[1.15] text-ink">{post.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink/60">{post.excerpt}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.18em] text-ink/50 transition-colors group-hover:text-rouge-soft">
                Read
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
