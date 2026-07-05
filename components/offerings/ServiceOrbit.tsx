"use client";

import { useEffect, useRef, useState } from "react";
import { offerings } from "@/lib/content";

// two concentric rings; inner spins one way, outer the other
const RINGS = [
  { rf: 0.3, items: [0, 1, 2], speed: 0.004 },
  { rf: 0.47, items: [3, 4, 5, 6, 7], speed: -0.0026 },
];

// deterministic star positions (Math.sin hash) so SSR and client match
const rand = (n: number) => {
  const x = Math.sin(n * 99.13) * 43758.5453;
  return x - Math.floor(x);
};
const STARS = Array.from({ length: 42 }, (_, i) => ({
  x: rand(i) * 100,
  y: rand(i + 41) * 100,
  s: 1 + rand(i + 83) * 2,
  delay: rand(i + 17) * 4,
  dur: 2.6 + rand(i + 60) * 3,
  rouge: i % 6 === 0,
}));

export default function ServiceOrbit() {
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const st = useRef({ base: 0, drag: 0, dragging: false, lastX: 0, moved: 0 });

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;

    const layout = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h);
      for (const ring of RINGS) {
        const rad = ring.rf * R;
        ring.items.forEach((si, k) => {
          const n = nodes.current[si];
          if (!n) return;
          const ang = (k / ring.items.length) * Math.PI * 2 + st.current.base * ring.speed + st.current.drag;
          n.style.transform = `translate(${cx + Math.cos(ang) * rad}px, ${cy + Math.sin(ang) * rad}px) translate(-50%, -50%)`;
        });
      }
    };
    const loop = () => {
      if (sel === null && !st.current.dragging && !reduce) st.current.base += 1;
      layout();
      raf = requestAnimationFrame(loop);
    };
    layout();
    raf = requestAnimationFrame(loop);
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [sel]);

  const down = (e: React.PointerEvent) => {
    if ((e.target as Element).closest("[data-detail]")) return;
    st.current.dragging = true;
    st.current.lastX = e.clientX;
    st.current.moved = 0;
  };
  const move = (e: React.PointerEvent) => {
    if (!st.current.dragging) return;
    const dx = e.clientX - st.current.lastX;
    st.current.moved += Math.abs(dx);
    st.current.drag += dx * 0.005;
    st.current.lastX = e.clientX;
  };
  const up = () => (st.current.dragging = false);
  const pick = (i: number) => {
    if (st.current.moved > 6) return; // was a drag, not a tap
    setSel(i);
  };

  return (
    <div
      ref={wrap}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className="relative mx-auto aspect-square w-full max-w-[560px] cursor-grab touch-none select-none active:cursor-grabbing"
    >
      {/* ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full motion-safe:animate-[orbit-pulse_6s_ease-in-out_infinite]"
        style={{ background: "radial-gradient(circle, rgba(232,80,111,.32), transparent 66%)" }}
      />
      {/* starfield */}
      {STARS.map((st, i) => (
        <span
          key={`star-${i}`}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full motion-safe:animate-[twinkle_var(--d)_ease-in-out_var(--dl)_infinite]"
          style={
            {
              left: `${st.x}%`,
              top: `${st.y}%`,
              width: `${st.s}px`,
              height: `${st.s}px`,
              background: st.rouge ? "var(--color-rouge)" : "rgba(244,236,239,.85)",
              boxShadow: st.rouge ? "0 0 6px rgba(232,80,111,.7)" : "0 0 5px rgba(244,236,239,.5)",
              ["--d" as string]: `${st.dur}s`,
              ["--dl" as string]: `${st.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {RINGS.map((r, idx) => (
        <span
          key={idx}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: `${r.rf * 200}%`, height: `${r.rf * 200}%` }}
        />
      ))}

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 grid h-[172px] w-[172px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-rouge/20 text-center transition-opacity duration-500 ${
          sel !== null ? "opacity-0" : "opacity-100"
        }`}
        style={{ background: "radial-gradient(circle, rgba(232,80,111,.4), rgba(232,80,111,.06) 55%, transparent 72%)" }}
      >
        <span
          className="font-serif text-[clamp(18px,2.2vw,24px)] italic leading-tight text-rouge-soft"
          style={{ textShadow: "0 0 26px rgba(232,80,111,.55)" }}
        >
          Eight ways
          <br />
          to work
        </span>
      </div>

      {offerings.map((s, i) => (
        <button
          key={s.name}
          ref={(el) => {
            nodes.current[i] = el;
          }}
          onClick={() => pick(i)}
          className={`absolute left-0 top-0 whitespace-nowrap rounded-full border px-5 py-2.5 font-serif text-[17px] transition-[opacity,border-color,color,box-shadow,transform] duration-300 ${
            sel !== null && sel !== i ? "opacity-20" : "opacity-100"
          } ${
            sel === i
              ? "border-rouge text-white shadow-[0_0_30px_rgba(232,80,111,.45)]"
              : "border-rouge/20 bg-[rgba(20,10,14,.55)] text-ink/85 shadow-[0_0_18px_rgba(232,80,111,.12)] hover:scale-105 hover:border-rouge hover:text-white hover:shadow-[0_0_28px_rgba(232,80,111,.4)]"
          }`}
        >
          {s.name}
        </button>
      ))}

      <div
        data-detail
        className={`absolute left-1/2 top-1/2 w-[min(360px,86%)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/14 p-6 text-center transition-all duration-500 ${
          sel !== null ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"
        }`}
        style={{ background: "linear-gradient(160deg, rgba(64,22,38,.85), rgba(18,7,11,.8))", backdropFilter: "blur(8px)" }}
      >
        {sel !== null && (
          <>
            <h3 className="font-serif text-[26px] font-normal">{offerings[sel].name}</h3>
            <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink/65">{offerings[sel].summary}</p>
            <ul className="mt-4 flex flex-col gap-1.5 text-left">
              {(offerings[sel].deliverables ?? []).map((d) => (
                <li key={d} className="text-[13px] text-ink/70">
                  <span className="mr-2 text-[10px] text-rouge">✦</span>
                  {d}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSel(null)}
              className="mt-5 rounded-full border border-white/25 px-5 py-2 text-[10px] uppercase tracking-[0.16em] text-ink/85 transition-colors hover:border-rouge hover:text-ink"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}
