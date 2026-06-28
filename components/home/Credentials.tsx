"use client";

import { useRef } from "react";
import Reveal from "@/components/ui/Reveal";
import { education, certificates } from "@/lib/content";

export default function Credentials() {
  const rowRef = useRef<HTMLDivElement>(null);

  // Drag-to-scroll the certificate row.
  const drag = useRef({ active: false, startX: 0, scroll: 0 });
  const onDown = (e: React.PointerEvent) => {
    const row = rowRef.current;
    if (!row) return;
    drag.current = { active: true, startX: e.clientX, scroll: row.scrollLeft };
    row.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    const row = rowRef.current;
    if (!row || !drag.current.active) return;
    row.scrollLeft = drag.current.scroll - (e.clientX - drag.current.startX);
  };
  const onUp = () => (drag.current.active = false);

  return (
    <section id="credentials" className="relative px-[6vw] py-[12vh]">
      {/* Education: vertical timeline */}
      <Reveal>
        <span className="eyebrow">Education</span>
        <h2 className="mt-5 font-serif text-[clamp(28px,4vw,46px)] font-normal">
          Where I <span className="italic text-rouge-soft">studied</span>
        </h2>
      </Reveal>

      <ol className="relative mt-12 ml-2 pl-8 md:pl-12">
        {/* continuous gradient rail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1.5 bottom-3 w-px bg-gradient-to-b from-rouge via-white/15 to-transparent"
        />
        {education.map((edu, i) => (
          <Reveal key={i} delay={i * 80}>
            <li className="relative pb-10 last:pb-0">
              <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-rouge shadow-[0_0_0_4px_rgba(232,80,111,0.15)] md:-left-[53px]" />
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="font-serif text-[22px] font-normal text-ink">
                  {edu.qualification}
                </h3>
                <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-ink/45 tabular-nums">
                  {edu.year}
                </span>
              </div>
              <p className="mt-1.5 font-sans text-[13px] uppercase tracking-[0.14em] text-rouge-soft">
                {edu.institution}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>

      {/* Certificates */}
      <Reveal>
        <div className="mt-16 flex items-baseline justify-between">
          <span className="eyebrow">Certificates</span>
          <span className="hidden font-sans text-[11px] uppercase tracking-[0.18em] text-ink/35 md:block">
            Drag →
          </span>
        </div>
      </Reveal>

      <div
        ref={rowRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="mt-7 flex cursor-grab gap-4 overflow-x-auto pb-4 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {certificates.map((cert, i) => (
          <div
            key={i}
            className="group glass flex shrink-0 basis-[280px] flex-col rounded-2xl px-6 py-6 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:[transform:perspective(700px)_rotateX(6deg)]"
          >
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-rouge-soft">
              {cert.issuer}
            </p>
            <p className="mt-3 flex-1 font-serif text-[20px] font-normal leading-snug text-ink">
              {cert.name}
            </p>
            <div className="mt-5">
              <p className="font-sans text-[12px] tracking-[0.1em] text-ink/45 tabular-nums">
                {cert.year}
              </p>
              {cert.credentialId && (
                <p className="mt-1.5 font-sans text-[10px] tracking-[0.06em] text-ink/30 break-all">
                  ID: {cert.credentialId}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
