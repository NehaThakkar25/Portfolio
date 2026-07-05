"use client";

import Link from "next/link";
import { useState } from "react";
import { offerings, engagementModels } from "@/lib/content";

// rough duration per service (weeks), aligned to the offerings order
const WEEKS = [1, 4, 3, 2, 2, 3, 1, 1];

// map a selection to the engagement model that fits it best
function suggestEngagement(indices: number[]) {
  if (!indices.length) return null;
  const workshopOnly = indices.length === 1 && offerings[indices[0]].name === "Workshops";
  const name = workshopOnly ? "Workshop" : indices.length >= 4 ? "Retainer" : "Project";
  return engagementModels.find((m) => m.name === name) ?? null;
}

export default function ScopeComposer() {
  const [sel, setSel] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setSel((prev) => {
      const n = new Set(prev);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });

  const arr = [...sel];
  const estimate = () => {
    if (!arr.length) return 0;
    const ws = arr.map((i) => WEEKS[i]);
    const sum = ws.reduce((a, b) => a + b, 0);
    return Math.max(Math.max(...ws), Math.round(sum * 0.7)); // parallel work compresses
  };
  const deliverables = arr.reduce((a, i) => a + (offerings[i].deliverables?.length ?? 0), 0);
  const model = suggestEngagement(arr);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_0.9fr]">
      <div className="grid content-start gap-3 sm:grid-cols-2">
        {offerings.map((s, i) => {
          const on = sel.has(i);
          return (
            <button
              key={s.name}
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={on}
              className={`group relative rounded-2xl border p-5 text-left transition-all duration-300 ${
                on
                  ? "border-rouge bg-rouge/10 shadow-[0_0_30px_rgba(232,80,111,0.18)]"
                  : "border-white/12 bg-white/[0.03] hover:-translate-y-0.5 hover:border-rouge/50"
              }`}
            >
              <span
                className={`absolute right-4 top-4 grid h-5 w-5 place-items-center rounded-full border text-[11px] transition ${
                  on ? "border-rouge bg-rouge text-white" : "border-white/25 text-transparent"
                }`}
              >
                ✓
              </span>
              <h3 className="font-serif text-[19px] font-normal text-ink">{s.name}</h3>
              <p className="mt-1.5 pr-6 text-[12.5px] leading-relaxed text-ink/55">{s.summary}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.14em] text-ink/40">
                ~{WEEKS[i]} {WEEKS[i] > 1 ? "weeks" : "week"}
              </p>
            </button>
          );
        })}
      </div>

      <aside
        className="flex flex-col rounded-[20px] border border-white/12 p-6"
        style={{ background: "linear-gradient(160deg, rgba(64,22,38,.5), rgba(18,7,11,.4))" }}
      >
        {arr.length === 0 ? (
          <div className="m-auto text-center font-serif text-[20px] italic leading-relaxed text-ink/40">
            Select what you need,
            <br />
            and I&rsquo;ll shape a brief.
          </div>
        ) : (
          <>
            <span className="eyebrow">Your brief</span>
            <div className="mb-5 mt-3.5 flex flex-wrap gap-2">
              {arr.map((i) => (
                <span key={i} className="rounded-full bg-rouge/15 px-3 py-1.5 text-[12px] text-rouge-soft">
                  {offerings[i].name}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2.5 border-y border-white/10 py-4 text-center">
              <div>
                <b className="block text-[30px] font-semibold tabular-nums">{estimate()}</b>
                <span className="text-[9.5px] uppercase tracking-[0.14em] text-ink/45">weeks est.</span>
              </div>
              <div>
                <b className="block text-[30px] font-semibold tabular-nums">{arr.length}</b>
                <span className="text-[9.5px] uppercase tracking-[0.14em] text-ink/45">services</span>
              </div>
              <div>
                <b className="block text-[30px] font-semibold tabular-nums">{deliverables}</b>
                <span className="text-[9.5px] uppercase tracking-[0.14em] text-ink/45">deliverables</span>
              </div>
            </div>
            {model && (
              <div className="my-5">
                <span className="text-[10px] uppercase tracking-[0.16em] text-ink/45">Suggested way to work</span>
                <p className="mt-1.5 font-serif text-[20px] font-normal italic text-rouge-soft">{model.name}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink/55">{model.description}</p>
              </div>
            )}
            <Link
              href="/contact"
              className="mt-auto rounded-full bg-gradient-to-r from-rouge to-wine-500 py-3.5 text-center text-[11px] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(232,80,111,0.4)]"
            >
              Send this brief →
            </Link>
          </>
        )}
      </aside>
    </div>
  );
}
