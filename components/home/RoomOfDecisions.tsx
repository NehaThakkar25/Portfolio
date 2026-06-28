"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* A short, reflective walk through a real product decision: pick the call
   you're facing, choose how you'd handle it, and hear how a designer would
   think about it. Not a quiz, there's no right answer. */

type Approach = { label: string; reflection: string };
type Decision = { label: string; note: string; approaches: Approach[] };

const DECISIONS: Decision[] = [
  {
    label: "Ship faster",
    note: "speed vs quality",
    approaches: [
      { label: "Cut scope to hit the date", reflection: "Smart. Shipping a smaller thing well beats shipping everything late. Just make sure what you cut wasn't the part that made it worth doing." },
      { label: "Ship behind a feature flag", reflection: "A safe way to move fast. Release it to a few people first and you get the speed without betting the whole experience." },
      { label: "Ship now, polish later", reflection: "Tempting, and sometimes right. Be honest about whether 'later' ever really comes, because users live with the rough edges until it does." },
      { label: "Hold the date for quality", reflection: "Sometimes the brave call. A late product tends to be forgiven, a broken first impression rarely is." },
    ],
  },
  {
    label: "Add a feature",
    note: "scope vs simplicity",
    approaches: [
      { label: "Build the full thing", reflection: "Ambitious. Just remember every feature is a promise you then have to keep, support, and explain forever." },
      { label: "Ship a smaller version", reflection: "Usually the wiser path. Let real usage tell you which parts actually deserve to grow." },
      { label: "Hide it behind a setting", reflection: "A fair compromise, though defaults are what most people live with. Choose them with care." },
      { label: "Say no for now", reflection: "Often the hardest and the best answer. A focused product is a feature in itself." },
    ],
  },
  {
    label: "Collect more data",
    note: "insight vs trust",
    approaches: [
      { label: "Ask for everything upfront", reflection: "It feels thorough, but every extra field is a reason to leave. Ask only for what you will truly use." },
      { label: "Ask gradually over time", reflection: "A lovely instinct. Earning details as trust grows beats demanding them at the door." },
      { label: "Make most fields optional", reflection: "Respectful of people's time. Just make it clear why the optional ones help them, not only you." },
      { label: "Infer it instead of asking", reflection: "Clever and low friction. Be open about it, because quiet data collection erodes the trust you are trying to protect." },
    ],
  },
  {
    label: "Increase revenue",
    note: "growth vs experience",
    approaches: [
      { label: "Add a paywall", reflection: "Direct. The craft is in paywalling the moment of value, not the path to discovering it." },
      { label: "Show ads", reflection: "It can fund the free experience, but every ad is attention you are renting out. Spend it sparingly." },
      { label: "Upsell inside the flow", reflection: "Works when the offer genuinely helps right then. Interrupt the wrong moment and it reads as greed." },
      { label: "Grow the free tier first", reflection: "Patient, and often the most profitable in the long run. Loyalty compounds in a way a quick sale never does." },
    ],
  },
  {
    label: "Reduce friction",
    note: "ease vs revenue",
    approaches: [
      { label: "Remove the sign-up wall", reflection: "People love it. Just plan how you will learn who they are later without it feeling like a bait and switch." },
      { label: "Autofill what you can", reflection: "Quietly delightful. The less someone has to type, the more likely they finish." },
      { label: "Cut steps from the flow", reflection: "Almost always right. Every step you remove is one less place to lose someone." },
      { label: "Keep one step for quality", reflection: "Defensible. A little friction can signal care, as long as it earns its place." },
    ],
  },
  {
    label: "Improve accessibility",
    note: "inclusion vs timeline",
    approaches: [
      { label: "Fix it in a later sprint", reflection: "Understandable, but 'later' has a way of never arriving. A small fix now beats a big retrofit down the line." },
      { label: "Bake it into the system", reflection: "The leverage move. Solve it once in the components and every screen inherits it." },
      { label: "Start with critical flows", reflection: "Pragmatic. Make the things people must do usable for everyone first." },
      { label: "Ship now, audit later", reflection: "Risky. Accessibility bolted on afterwards rarely feels native. Design it in while it is still cheap." },
    ],
  },
];

type Phase = "intro" | "question" | "solution" | "feedback" | "reveal";

const panel = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export default function RoomOfDecisions() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [decision, setDecision] = useState<number | null>(null);
  const [approach, setApproach] = useState<number | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);
  const cursor = useRef({ gx: 0, gy: 0, tx: 0, ty: 0 });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // intro line holds for 3s
  useEffect(() => {
    const t = window.setTimeout(() => setPhase("question"), 3000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    cursor.current = { gx: window.innerWidth / 2, gy: window.innerHeight / 2, tx: window.innerWidth / 2, ty: window.innerHeight / 2 };
    let raf = 0;
    const loop = () => {
      const c = cursor.current;
      c.gx += (c.tx - c.gx) * 0.06;
      c.gy += (c.ty - c.gy) * 0.06;
      if (glowRef.current) glowRef.current.style.transform = `translate(${c.gx}px, ${c.gy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      cursor.current.tx = e.clientX;
      cursor.current.ty = e.clientY;
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const enterSite = () => {
    setLeaving(true);
    window.setTimeout(() => {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
      setDismissed(true);
    }, 1100);
  };

  if (dismissed) return null;

  const revealed = phase === "reveal";
  const glow = phase === "intro" ? 0.12 : revealed ? 0.16 : 0.26;
  const d = decision != null ? DECISIONS[decision] : null;
  const a = d && approach != null ? d.approaches[approach] : null;

  return (
    <section
      className="fixed inset-0 z-[55] overflow-hidden bg-ground"
      style={{
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateY(-14%)" : "none",
        transition: "opacity 1s ease, transform 1.1s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[70vw] w-[70vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(232,80,111,0.5), transparent 60%)",
          opacity: glow,
          transition: "opacity 1.2s ease",
          transform: "translate(50vw, 50vh) translate(-50%, -50%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[20]"
        style={{
          background:
            "radial-gradient(ellipse 58% 52% at 50% 50%, transparent 22%, rgba(3,1,2,0.55) 58%, rgba(3,1,2,0.94) 100%)",
        }}
        initial={false}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 z-[18] h-[62vh] w-[72vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(244,180,196,0.6) 0%, rgba(232,80,111,0.22) 42%, transparent 70%)",
        }}
        initial={false}
        animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 0.55 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {phase !== "intro" && !revealed && (
        <button
          type="button"
          onClick={enterSite}
          className="absolute right-[5vw] top-7 z-[45] font-sans text-[11px] uppercase tracking-[0.2em] text-ink/40 transition-colors hover:text-ink"
        >
          Skip →
        </button>
      )}

      <div className="absolute inset-0 z-[42] flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          {phase === "intro" && (
            <motion.p
              key="intro"
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center font-serif text-[clamp(28px,5vw,64px)] italic text-ink"
            >
              Every product is a decision.
            </motion.p>
          )}

          {phase === "question" && (
            <motion.div key="question" {...panel} className="flex w-full max-w-2xl flex-col items-center text-center">
              <span className="eyebrow">Think with me</span>
              <h2 className="mt-5 font-serif text-[clamp(28px,4.4vw,52px)] font-normal leading-[1.1]">
                What decision are you <span className="italic text-rouge-soft">wrestling</span> with?
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/60">
                Every product is a pile of these. Pick the one that feels closest to home.
              </p>
              <div className="mt-9 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
                {DECISIONS.map((opt, i) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      setDecision(i);
                      setPhase("solution");
                    }}
                    className="group rounded-2xl border border-white/12 bg-white/[0.04] px-4 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-rouge/60 hover:bg-white/[0.06]"
                  >
                    <p className="font-serif text-[17px] leading-snug text-ink">{opt.label}</p>
                    <p className="mt-1.5 font-sans text-[10px] uppercase tracking-[0.14em] text-ink/40">{opt.note}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "solution" && d && (
            <motion.div key="solution" {...panel} className="flex w-full max-w-md flex-col items-center text-center">
              <span className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-1.5 font-sans text-[11px] uppercase tracking-[0.16em] text-rouge-soft">
                {d.label}
              </span>
              <h2 className="mt-6 font-serif text-[clamp(26px,4vw,44px)] font-normal leading-[1.1]">
                So, what would <span className="italic text-rouge-soft">you</span> do?
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/60">Go with your gut. There&rsquo;s no scoreboard here.</p>
              <div className="mt-8 flex w-full flex-col gap-3">
                {d.approaches.map((opt, j) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => {
                      setApproach(j);
                      setPhase("feedback");
                    }}
                    className="rounded-full border border-white/15 px-6 py-3.5 font-sans text-[14px] text-ink/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-rouge hover:text-ink"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "feedback" && d && a && (
            <motion.div key="feedback" {...panel} className="flex w-full max-w-xl flex-col items-center text-center">
              <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-ink/45">
                To {d.label.toLowerCase()}, you&rsquo;d {a.label.toLowerCase()}
              </p>
              <p className="mt-6 font-serif text-[clamp(22px,3.2vw,38px)] italic leading-[1.3] text-ink">
                {a.reflection}
              </p>
              <motion.button
                type="button"
                onClick={() => setPhase("reveal")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-10 rounded-full border border-white/25 px-7 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-ink/85 transition-colors duration-300 hover:border-rouge hover:text-ink"
              >
                So how do good products get built? →
              </motion.button>
            </motion.div>
          )}

          {phase === "reveal" && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-6 text-center"
            >
              <p className="font-sans text-[clamp(12px,1.5vw,15px)] uppercase tracking-[0.2em] text-ink/55">
                No decision improves everything.
              </p>
              <p className="font-serif text-[clamp(26px,3.8vw,50px)] italic leading-[1.2] text-ink">
                Good products are built by balancing tradeoffs.
              </p>
              <p className="max-w-md text-[clamp(14px,1.8vw,18px)] leading-relaxed text-ink/70">
                And that is what I do every day, turning these decisions into experiences people use and trust.
              </p>
              <motion.button
                type="button"
                onClick={enterSite}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mt-1 rounded-full border border-white/30 px-7 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-ink/90 transition-colors duration-300 hover:border-rouge hover:text-ink"
              >
                Meet the designer ↓
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
