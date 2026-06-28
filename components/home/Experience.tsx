"use client";

import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { experience } from "@/lib/content";

export default function Experience() {
  const rowRef = useRef<HTMLOListElement>(null);
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false });

  const onDown = (e: React.PointerEvent) => {
    const row = rowRef.current;
    if (!row) return;
    drag.current = { active: true, startX: e.clientX, scroll: row.scrollLeft, moved: false };
    row.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const row = rowRef.current;
    if (!row || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    row.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => (drag.current.active = false);

  return (
    <section id="experience" className="relative px-[6vw] py-[12vh]">
      <Reveal>
        <div className="flex items-baseline justify-between">
          <div>
            <span className="eyebrow">Experience</span>
            <h2 className="mt-5 font-serif text-[clamp(28px,4vw,46px)] font-normal">
              Where I&apos;ve <span className="italic text-rouge-soft">worked</span>
            </h2>
          </div>
          <span className="hidden font-sans text-[11px] uppercase tracking-[0.18em] text-ink/35 md:block">
            Drag →
          </span>
        </div>
      </Reveal>

      <ol
        ref={rowRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative mt-14 flex cursor-grab gap-7 overflow-x-auto pb-4 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* horizontal rail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1 right-1 top-[46px] h-px bg-gradient-to-r from-rouge via-white/20 to-transparent"
        />
        {experience.map((item, i) => (
          <li
            key={`${item.company}-${i}`}
            className="relative flex min-w-[360px] basis-[440px] flex-col pt-[64px]"
          >
            <span className="absolute left-0 top-2 font-sans text-[12px] uppercase tracking-[0.18em] text-rouge-soft tabular-nums">
              {item.start} to {item.end}
            </span>
            <span className="absolute left-0 top-[41px] h-2.5 w-2.5 rounded-full bg-rouge shadow-[0_0_0_4px_rgba(232,80,111,0.15)]" />

            <div className="glass flex-1 rounded-2xl px-6 py-6">
              <h3 className="font-serif text-[22px] font-normal leading-snug text-ink">
                {item.role}
              </h3>
              <p className="mt-1.5 font-sans text-[12px] uppercase tracking-[0.16em] text-rouge-soft">
                {item.company}
              </p>
              <ul className="mt-5 space-y-3">
                {item.highlights.map((h, j) => (
                  <li key={j} className="relative pl-4 text-[15px] leading-relaxed text-ink/65">
                    <span className="absolute left-0 top-[9px] h-1 w-1 rounded-full bg-rouge" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
