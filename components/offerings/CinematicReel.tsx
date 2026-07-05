"use client";

import { useEffect, useRef, useState } from "react";
import { offerings } from "@/lib/content";

export default function CinematicReel() {
  const reel = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const drag = useRef({ active: false, startX: 0, scroll: 0 });

  useEffect(() => {
    const el = reel.current;
    if (!el) return;
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max ? el.scrollLeft / max : 0);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const down = (e: React.PointerEvent) => {
    const el = reel.current;
    if (!el) return;
    drag.current = { active: true, startX: e.clientX, scroll: el.scrollLeft };
    el.setPointerCapture?.(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    const el = reel.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.scroll - (e.clientX - drag.current.startX);
  };
  const up = () => (drag.current.active = false);
  const by = (dir: number) => {
    const el = reel.current;
    if (!el) return;
    const sc = el.querySelector<HTMLElement>(".reel-scene");
    const w = sc ? sc.getBoundingClientRect().width : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={reel}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        className="flex cursor-grab snap-x snap-mandatory overflow-x-auto scroll-pl-[6vw] active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {offerings.map((s, i) => (
          <div
            key={s.name}
            className="reel-scene relative flex h-[58vh] shrink-0 basis-[88vw] snap-start flex-col justify-center pl-[6vw] pr-[6vw] md:basis-[68vw]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-[6vw] top-[4%] font-serif leading-[0.8] text-rouge-soft/10"
              style={{ fontSize: "min(26vh,200px)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="relative whitespace-nowrap font-serif text-[clamp(26px,3.6vw,56px)] font-normal leading-[0.95]">
              {s.name}
            </h3>
            <p className="relative mt-5 max-w-md text-[clamp(15px,1.7vw,19px)] leading-relaxed text-ink/65">
              {s.summary}
            </p>
            <div className="relative mt-6 flex flex-wrap gap-2">
              {(s.deliverables ?? []).map((d) => (
                <span key={d} className="rounded-full border border-white/14 px-3.5 py-1.5 text-[12px] text-ink/70">
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div aria-hidden="true" className="shrink-0 basis-[6vw]" />
      </div>

      <div className="mt-4 flex items-center gap-4 px-[6vw]">
        <button
          type="button"
          onClick={() => by(-1)}
          aria-label="Previous"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-ink transition-colors hover:border-rouge hover:text-rouge"
        >
          ←
        </button>
        <div className="h-0.5 w-40 overflow-hidden rounded bg-white/15">
          <div className="h-full bg-rouge transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
        <button
          type="button"
          onClick={() => by(1)}
          aria-label="Next"
          className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-ink transition-colors hover:border-rouge hover:text-rouge"
        >
          →
        </button>
      </div>
    </div>
  );
}
