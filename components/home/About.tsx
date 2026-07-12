"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/lib/content";

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on the portrait.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = portraitRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const progress =
          (rect.top + rect.height / 2 - window.innerHeight / 2) /
          window.innerHeight;
        el.style.transform = `translateY(${progress * -26}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const statement =
    "Great design feels obvious. Getting there almost never is.";

  return (
    <section id="about" className="relative px-[6vw] py-[14vh]">
      <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
        <div>
          <Reveal>
            <span className="eyebrow">About</span>
          </Reveal>

          <h2 className="mt-7 max-w-[14ch] font-serif text-[clamp(30px,4.4vw,56px)] font-normal leading-[1.08] text-balance">
            {statement.split(" ").map((word, i) => (
              <Reveal
                key={i}
                delay={i * 60}
                className="mr-[0.28em] inline-block"
              >
                <span
                  className={
                    word.startsWith("obvious") ? "italic text-rouge-soft" : ""
                  }
                >
                  {word}
                </span>
              </Reveal>
            ))}
          </h2>

          <Reveal delay={120}>
            <p className="mt-8 max-w-[52ch] text-[18px] leading-[1.8] text-ink/65">
              {profile.bio}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {profile.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-[12px] tracking-[0.04em] text-ink/75"
                >
                  {tool}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.24em] text-ink/45">
              {profile.location} · {profile.availability}
            </p>
          </Reveal>
        </div>

        {/* Portrait: square source filled into the 4/5 frame, end to end */}
        <Reveal delay={120}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/12">
            <div ref={portraitRef} className="absolute inset-[-8%]">
              <Image
                src="/neha-profile.avif"
                alt="Neha Thakkar, product designer in India"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            {/* subtle wine tint to sit within the palette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine-900/40 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
