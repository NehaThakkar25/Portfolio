"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import type { Heading } from "@/lib/toc";

export default function TableOfContents({
  headings,
  variant,
}: {
  headings: Heading[];
  variant: "sidebar" | "mobile";
}) {
  // index of the deepest section scrolled past (-1 = none yet)
  const [activeIndex, setActiveIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id));
    let raf = 0;
    const THRESHOLD = 120; // px from top of viewport

    const update = () => {
      let idx = -1;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el && el.getBoundingClientRect().top <= THRESHOLD) idx = i;
        else break;
      }
      setActiveIndex(idx);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [headings]);

  const jump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    const y = el.getBoundingClientRect().top + window.scrollY - 110;
    if (lenis) lenis.scrollTo(y);
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  if (!headings.length) return null;

  if (variant === "sidebar") {
    return (
      <nav className="sticky top-28">
        <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.24em] text-ink/40">Contents</p>
        <ul>
          {headings.map((h, i) => {
            const explored = i <= activeIndex;
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => jump(e, h.id)}
                  className={`-ml-px block border-l py-1.5 text-[13px] leading-snug transition-colors duration-300 ${
                    h.level === 3 ? "pl-7" : "pl-4"
                  } ${
                    explored
                      ? "border-rouge text-rouge-soft"
                      : "border-white/10 text-ink/40 hover:text-ink/70"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <div className="mb-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3.5 font-sans text-[11px] uppercase tracking-[0.2em] text-ink/65"
        aria-expanded={open}
      >
        Contents
        <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>
      {open && (
        <ul className="px-5 pb-4">
          {headings.map((h, i) => {
            const explored = i <= activeIndex;
            return (
              <li key={h.id} className={h.level === 3 ? "pl-3" : ""}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => jump(e, h.id)}
                  className={`block py-1 text-[14px] leading-snug transition-colors ${
                    explored ? "text-rouge-soft" : "text-ink/50"
                  }`}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
