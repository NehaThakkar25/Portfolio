import Link from "next/link";
import { processSteps, offeringsFaqs } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ServiceOrbit from "@/components/offerings/ServiceOrbit";
import CinematicReel from "@/components/offerings/CinematicReel";
import ScopeComposer from "@/components/offerings/ScopeComposer";
import FaqSection from "@/components/reads/FaqSection";

export const metadata = {
  title: "Product Design Services in India | Neha Thakkar",
  description:
    "UX and UI design, audits, branding, and design systems. Explore product design services in India, built to turn ideas into products people love.",
  alternates: { canonical: "/offerings" },
};

export default function OfferingsPage() {
  return (
    <>
      {/* HERO: text + service orbit */}
      <section className="px-[6vw] pb-[12vh] pt-[20vh]">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">Offerings</span>
              <h1 className="mt-5 font-serif text-[clamp(40px,7vw,84px)] font-normal leading-[0.95]">
                From first sketch to <span className="italic text-rouge-soft">shipped</span> product
              </h1>
              <p className="mt-6 max-w-md text-[clamp(16px,2vw,20px)] leading-relaxed text-ink/65">
                Product design services in India for startups and brands worldwide. Bring the idea, and
                together we&rsquo;ll shape it into a product people genuinely love to use.
              </p>
            </Reveal>
          </div>
          <div className="hidden md:block">
            <ServiceOrbit />
          </div>
        </div>
      </section>

      {/* CINEMATIC REEL */}
      <section className="border-t border-white/10 py-[6vh]">
        <div className="mb-6 px-[6vw]">
          <Reveal>
            <span className="eyebrow">Product design services</span>
            <h2 className="mt-4 font-serif text-[clamp(28px,4vw,48px)] font-normal">
              Every service, from sketch to <span className="italic text-rouge-soft">launch</span>
            </h2>
          </Reveal>
        </div>
        <CinematicReel />
      </section>

      {/* PROCESS */}
      <section className="border-t border-white/10 px-[6vw] py-[14vh]">
        <Reveal>
          <span className="eyebrow">How we work</span>
          <h2 className="mt-5 font-serif text-[clamp(30px,4.4vw,52px)] font-normal">
            A calm, deliberate design <span className="italic text-rouge-soft">process</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, i) => (
            <Reveal key={step.title} delay={i * 80}>
              <div className="border-t border-white/10 pt-5">
                <span className="font-serif text-[clamp(26px,3vw,38px)] italic text-rouge-soft">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-[22px] font-normal text-ink">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/60">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WAYS TO WORK: the scope composer */}
      <section className="border-t border-white/10 px-[6vw] py-[14vh]">
        <Reveal>
          <span className="eyebrow">Ways to work</span>
          <h2 className="mt-4 font-serif text-[clamp(28px,4.4vw,52px)] font-normal">
            Pick what you need. I&rsquo;ll shape the <span className="italic text-rouge-soft">brief</span>.
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/55">
            Tell me which product design services you need, and I&rsquo;ll suggest the engagement that
            fits, with a rough timeline to match.
          </p>
        </Reveal>
        <div className="mt-12">
          <ScopeComposer />
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 px-[6vw] py-[8vh]">
        <div className="mx-auto max-w-3xl">
          <FaqSection faqs={offeringsFaqs} />
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="border-t border-white/10 px-[6vw] py-[18vh] text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-serif text-[clamp(36px,6vw,72px)] font-normal italic leading-[1.05]">
            Let&rsquo;s build something considered.
          </h2>
          <Link
            href="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-rouge to-wine-500 px-8 py-4 font-sans text-[12px] uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(232,80,111,0.4)]"
          >
            Start a project →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
