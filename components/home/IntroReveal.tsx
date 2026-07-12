import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";
import AmbientField from "@/components/home/AmbientField";
import { stats } from "@/lib/content";

export default function IntroReveal() {
  return (
    <section
      id="intro"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-[6vw] py-[12vh] text-center"
    >
      <AmbientField />

      <div className="relative z-10 flex flex-col items-center">
        <Reveal>
          <span className="eyebrow">The human behind the pixels</span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 font-serif text-[clamp(46px,9vw,112px)] font-normal leading-[0.95] line-height-[0.95]">
            Hi, I&rsquo;m <span className="italic text-rouge-soft">Neha </span>{" "}
            <br />{" "}
            <span className="font-bold font-sans text-shadow-mist-50 text-3xl padding-top-0">
              A Product & Experience Designer in India
            </span>
          </h1>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-8 max-w-2xl text-[clamp(18px,2.2vw,25px)] leading-relaxed text-ink/70">
            I turn messy, complicated problems into products that feel effortless to use. Equal parts UX,
            UI, and curiosity, working with startups and brands around the world.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-9 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/work"
              className="rounded-full bg-gradient-to-br from-rouge to-wine-500 px-7 py-[15px] font-sans text-[11px] uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(232,80,111,0.4)]"
            >
              View Work →
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/25 px-7 py-[15px] font-sans text-[11px] uppercase tracking-[0.18em] text-ink/85 transition-colors duration-300 hover:border-rouge hover:text-ink"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>

        <Reveal delay={360}>
          <dl className="mt-12 flex flex-nowrap items-start justify-center gap-x-6">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`min-w-0 ${i > 0 ? "border-l border-white/10 pl-6" : ""}`}
              >
                <dt className="font-sans text-[clamp(24px,2.8vw,36px)] font-semibold leading-none tracking-tight text-ink tabular-nums">
                  <CountUp value={s.value} />
                  {s.suffix}
                </dt>
                <dd className="mt-2 font-sans text-[9px] uppercase leading-snug tracking-[0.14em] text-ink/55">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
