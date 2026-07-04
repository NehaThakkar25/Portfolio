"use client";

import { useState } from "react";
import type { Faq } from "@/lib/reads";

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!faqs?.length) return null;

  return (
    <section id="faqs" className="mt-16 scroll-mt-28 border-t border-white/10 pt-12">
      <h2 className="mb-7 font-serif text-[clamp(26px,3.2vw,34px)] font-normal text-ink">
        Frequently asked questions
      </h2>

      <div className="border-t border-white/10">
        {faqs.map((f, i) => {
          const on = open === i;
          return (
            <div key={i} className="border-b border-white/10">
              <button
                type="button"
                onClick={() => setOpen(on ? null : i)}
                aria-expanded={on}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="font-sans text-[16px] leading-snug text-ink">{f.question}</span>
                <span
                  className={`shrink-0 text-[20px] leading-none text-rouge-soft transition-transform duration-300 ${
                    on ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  on ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl whitespace-pre-line text-[15px] leading-relaxed text-ink/65">
                    {f.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
