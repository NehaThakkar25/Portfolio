"use client";

import { useState } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";

/* ───────────────────────── types & logic ───────────────────────── */

type Field = { id: string; label: string; required?: boolean };

const INITIAL_FIELDS: Field[] = [
  { id: "name", label: "Full name", required: true },
  { id: "email", label: "Email address", required: true },
  { id: "phone", label: "Phone number" },
  { id: "company", label: "Company name" },
];

type Decisions = {
  removed: number;
  reordered: boolean;
  ctaLarge: boolean;
  secondaryHidden: boolean;
  copyTrimmed: boolean;
  fieldCount: number;
};

const clamp = (n: number) => Math.max(4, Math.min(10, n));

function getScores(d: Decisions) {
  const hierarchy = clamp(5 + (d.ctaLarge ? 2 : 0) + (d.copyTrimmed ? 2 : 0) + (d.secondaryHidden ? 1 : 0));
  const clarity = clamp(4 + Math.min(d.removed, 3) + (d.secondaryHidden ? 2 : 0) + (d.copyTrimmed ? 1 : 0));
  const business = clamp(
    6 + (d.ctaLarge ? 2 : 0) + (d.copyTrimmed ? 1 : 0) - (d.secondaryHidden ? 1 : 0) - (d.removed >= 2 ? 2 : d.removed >= 1 ? 1 : 0)
  );
  const accessibility = clamp(5 + (d.ctaLarge ? 2 : 0) + (d.copyTrimmed ? 1 : 0) + (d.reordered ? 1 : 0));
  const overall = Math.round((hierarchy + clarity + business + accessibility) / 4);
  return { hierarchy, clarity, business, accessibility, overall };
}

type Item = { ok: boolean; text: string };
function getFeedback(d: Decisions): { title: string; items: Item[] }[] {
  return [
    {
      title: "User Needs",
      items: [
        d.removed > 0 || d.copyTrimmed
          ? { ok: true, text: "Reduced cognitive load." }
          : { ok: false, text: "Cognitive load is still high." },
        d.ctaLarge
          ? { ok: true, text: "Faster task completion." }
          : { ok: false, text: "Primary action is easy to miss." },
        d.fieldCount >= 4
          ? { ok: false, text: "Users may still feel overwhelmed." }
          : { ok: true, text: "The form feels effortless." },
      ],
    },
    {
      title: "Business Goals",
      items: [
        d.ctaLarge
          ? { ok: true, text: "Stronger conversion path." }
          : { ok: false, text: "Conversion path stays weak." },
        d.secondaryHidden
          ? { ok: false, text: "Reduced upsell opportunities." }
          : { ok: true, text: "Upsell remains visible." },
        d.removed >= 2 ? { ok: false, text: "Less data collection." } : { ok: true, text: "Healthy data capture." },
      ],
    },
    {
      title: "Technology",
      items: [
        { ok: true, text: "Simple implementation." },
        { ok: true, text: "Responsive layout." },
        d.reordered ? { ok: false, text: "Increased engineering complexity." } : { ok: true, text: "Low engineering lift." },
      ],
    },
    {
      title: "Accessibility",
      items: [
        d.ctaLarge ? { ok: true, text: "Larger touch targets." } : { ok: false, text: "Small touch targets." },
        d.copyTrimmed || d.reordered || d.removed > 0
          ? { ok: true, text: "Better hierarchy." }
          : { ok: false, text: "Hierarchy needs work." },
        { ok: false, text: "Contrast could improve." },
      ],
    },
  ];
}

function getCritique(d: Decisions) {
  if (d.secondaryHidden) return "Removing the secondary action improves clarity, but may reduce upgrade visibility.";
  if (d.removed >= 2) return "Fewer fields speed up signup, though you trade away some user data.";
  if (d.ctaLarge) return "A bolder primary action sharpens the path. Nicely judged.";
  if (d.copyTrimmed) return "Trimming the copy lets the interface breathe and focuses attention.";
  return "Every change is a trade-off. Edit the card to see how the balance shifts.";
}

const STEPS = ["Challenge", "Review", "Score", "Takeaway"];

/* ───────────────────────── UI atoms ───────────────────────── */

function FlawPin({ n, label, show }: { n: number; label: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          className="group absolute -right-2 -top-2 z-20"
        >
          <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-rouge text-[10px] font-semibold text-white">
            {n}
            <span className="absolute inset-0 animate-ping rounded-full bg-rouge/50" />
          </span>
          <span className="pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-white/10 bg-wine-900 px-2 py-1 text-[10px] text-ink/85 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            {label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-[11px] tracking-[0.04em] transition-colors duration-300 ${
        active
          ? "border-transparent bg-gradient-to-r from-rouge to-wine-500 text-white"
          : "border-white/15 text-ink/70 hover:border-white/35"
      }`}
    >
      {children}
    </button>
  );
}

function Bar({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-ink/55">{label}</span>
        <span className="font-sans text-[13px] font-semibold tabular-nums text-ink">{value}/10</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-wine-500 to-rouge"
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-32 w-32">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (value / 10) * c }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#9b2d4f" />
            <stop offset="100%" stopColor="#e8506f" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-[40px] font-semibold leading-none tabular-nums text-ink"
        >
          {value}
        </motion.span>
        <span className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-ink/45">Overall</span>
      </div>
    </div>
  );
}

const panelMotion = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

/* fake form input row */
function FieldRow({ field, onRemove }: { field: Field; onRemove: () => void }) {
  return (
    <Reorder.Item
      value={field}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      whileDrag={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.4)" }}
      className="group flex cursor-grab items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 py-2 active:cursor-grabbing"
    >
      <span className="text-[12px] leading-none text-ink/25 transition-colors group-hover:text-ink/50">⠿</span>
      <span className="flex-1 text-[12px] text-ink/55">{field.label}</span>
      {field.required ? (
        <span className="rounded bg-white/5 px-1.5 py-0.5 text-[8px] uppercase tracking-[0.14em] text-ink/35">Req</span>
      ) : (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${field.label}`}
          className="grid h-5 w-5 place-items-center rounded-full text-[14px] leading-none text-ink/35 transition-colors hover:bg-rouge/15 hover:text-rouge"
        >
          ×
        </button>
      )}
    </Reorder.Item>
  );
}

/* ───────────────────────── main component ───────────────────────── */

export default function HeroChallenge() {
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [fields, setFields] = useState<Field[]>(INITIAL_FIELDS);
  const [reordered, setReordered] = useState(false);
  const [ctaLarge, setCtaLarge] = useState(false);
  const [secondaryHidden, setSecondaryHidden] = useState(false);
  const [copyTrimmed, setCopyTrimmed] = useState(false);

  const decisions: Decisions = {
    removed: INITIAL_FIELDS.length - fields.length,
    reordered,
    ctaLarge,
    secondaryHidden,
    copyTrimmed,
    fieldCount: fields.length,
  };
  const scores = getScores(decisions);

  const fieldsFlaw = decisions.removed === 0;
  const issues =
    (copyTrimmed ? 0 : 1) + (ctaLarge ? 0 : 1) + (secondaryHidden ? 0 : 1) + (fieldsFlaw ? 1 : 0);

  const reset = () => {
    setFields(INITIAL_FIELDS);
    setReordered(false);
    setCtaLarge(false);
    setSecondaryHidden(false);
    setCopyTrimmed(false);
    setStep(0);
  };

  return (
    <div className="w-full max-w-[460px]">
      {/* header: label + step counter + progress */}
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.24em] text-ink/40">
          <span className="h-px w-6 bg-rouge" />
          Interactive case study
        </p>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-ink/45 tabular-nums">
          0{step + 1} / 0{STEPS.length} · {STEPS[step]}
        </p>
      </div>
      <div className="mb-4 h-px w-full overflow-hidden bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-wine-500 to-rouge"
          animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div
        className="relative max-h-[74vh] overflow-y-auto rounded-3xl border border-white/12 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.5)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ background: "linear-gradient(150deg, rgba(64,22,38,0.55), rgba(18,7,11,0.55))" }}
      >
        <AnimatePresence mode="wait">
          {/* ───── STEP 1: CHALLENGE ───── */}
          {step === 0 && (
            <motion.div key="challenge" {...panelMotion}>
              <div className="flex items-center justify-between">
                <span className="eyebrow">Design Challenge</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={issues}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] ${
                      issues === 0 ? "bg-rouge/15 text-rouge-soft" : "bg-white/[0.06] text-ink/60"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${issues === 0 ? "bg-rouge-soft" : "bg-rouge"}`} />
                    {issues === 0 ? "All clear" : `${issues} issues`}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
                This onboarding screen converts poorly. Spot the flaws and fix them.
              </p>

              {/* flawed product mock, framed like a real app window */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
                <div className="flex items-center gap-1.5 border-b border-white/8 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="ml-2 font-sans text-[9px] tracking-[0.1em] text-ink/30">onboarding</span>
                </div>

                <div className="p-4">
                  <p className="font-serif text-[18px] text-ink">Create your account</p>

                  <div className="relative">
                    <FlawPin n={1} label="Excessive copy" show={!copyTrimmed} />
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={copyTrimmed ? "short" : "long"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="mt-1 pr-4 text-[11px] leading-relaxed text-ink/45"
                      >
                        {copyTrimmed
                          ? "Start in seconds."
                          : "Join thousands of teams already using our platform to manage work, collaborate seamlessly, and unlock insights across every project."}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  <div className="relative mt-4">
                    <FlawPin n={2} label="Too many fields" show={fieldsFlaw} />
                    <Reorder.Group
                      axis="y"
                      values={fields}
                      onReorder={(v) => {
                        setFields(v);
                        setReordered(true);
                      }}
                      className="space-y-2"
                    >
                      <AnimatePresence>
                        {fields.map((f) => (
                          <FieldRow key={f.id} field={f} onRemove={() => setFields((p) => p.filter((x) => x.id !== f.id))} />
                        ))}
                      </AnimatePresence>
                    </Reorder.Group>
                  </div>

                  <div className="relative mt-4 flex justify-center">
                    <FlawPin n={3} label="Tap target too small" show={!ctaLarge} />
                    <motion.button
                      type="button"
                      layout
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className={`rounded-full bg-gradient-to-r from-rouge to-wine-500 font-sans uppercase tracking-[0.14em] text-white ${
                        ctaLarge ? "w-full py-3 text-[13px]" : "px-3 py-1 text-[10px]"
                      }`}
                    >
                      Create account
                    </motion.button>
                  </div>

                  <div className="relative mt-3">
                    <FlawPin n={4} label="Competing actions" show={!secondaryHidden} />
                    <AnimatePresence>
                      {!secondaryHidden && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex justify-center gap-4 text-[11px] text-ink/40"
                        >
                          <span>Sign in</span>
                          <span>Skip for now</span>
                          <span>Learn more</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Chip active={ctaLarge} onClick={() => setCtaLarge((v) => !v)}>
                  Resize CTA
                </Chip>
                <Chip active={secondaryHidden} onClick={() => setSecondaryHidden((v) => !v)}>
                  Hide secondary
                </Chip>
                <Chip active={copyTrimmed} onClick={() => setCopyTrimmed((v) => !v)}>
                  Trim copy
                </Chip>
              </div>
              <p className="mt-2.5 text-[10px] uppercase tracking-[0.16em] text-ink/30">
                Drag fields to reorder · tap × to remove
              </p>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-rouge to-wine-500 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(232,80,111,0.4)]"
              >
                Review my solution
              </button>
            </motion.div>
          )}

          {/* ───── STEP 2: REVIEW ───── */}
          {step === 1 && (
            <motion.div key="review" {...panelMotion}>
              <span className="eyebrow">The Review</span>
              <p className="mt-3 border-l-2 border-rouge pl-3 text-[13px] italic leading-relaxed text-rouge-soft">
                {getCritique(decisions)}
              </p>

              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5">
                {getFeedback(decisions).map((cat) => (
                  <div key={cat.title}>
                    <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-ink/45">{cat.title}</p>
                    <ul className="mt-2 space-y-1.5">
                      {cat.items.map((it, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[11.5px] leading-snug text-ink/70">
                          <span className={it.ok ? "text-rouge-soft" : "text-ink/40"}>{it.ok ? "✓" : "△"}</span>
                          {it.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-6 w-full rounded-full bg-gradient-to-r from-rouge to-wine-500 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(232,80,111,0.4)]"
              >
                See design score
              </button>
            </motion.div>
          )}

          {/* ───── STEP 3: SCORE ───── */}
          {step === 2 && (
            <motion.div key="score" {...panelMotion}>
              <span className="eyebrow">Design Score</span>
              <div className="mt-4 flex justify-center">
                <ScoreRing value={scores.overall} />
              </div>
              <div className="mt-6 space-y-4">
                <Bar label="Hierarchy" value={scores.hierarchy} delay={0.1} />
                <Bar label="Clarity" value={scores.clarity} delay={0.2} />
                <Bar label="Business Impact" value={scores.business} delay={0.3} />
                <Bar label="Accessibility" value={scores.accessibility} delay={0.4} />
              </div>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="mt-7 w-full rounded-full bg-gradient-to-r from-rouge to-wine-500 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(232,80,111,0.4)]"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* ───── STEP 4: CLOSING ───── */}
          {step === 3 && (
            <motion.div key="closing" {...panelMotion} className="py-4 text-center">
              <span className="eyebrow">The Takeaway</span>
              <p className="mt-5 font-serif text-[23px] leading-[1.3] text-ink">
                Good design isn&rsquo;t moving buttons.
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-ink/65">
                It&rsquo;s balancing <span className="text-rouge-soft">users</span>,{" "}
                <span className="text-rouge-soft">business</span>, <span className="text-rouge-soft">technology</span>,
                and <span className="text-rouge-soft">accessibility</span>.
              </p>
              <p className="mt-5 font-serif text-[18px] italic text-rouge-soft">This is what I do every day.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] text-ink/85 transition-colors duration-300 hover:border-rouge hover:text-ink"
              >
                Try again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
