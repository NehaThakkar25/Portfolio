import Reveal from "@/components/ui/Reveal";
import { education, certificates } from "@/lib/content";

export default function Credentials() {
  // oldest first, so certifications continue the timeline after the MScIT
  const certs = certificates.slice().reverse();

  return (
    <section id="credentials" className="relative px-[6vw] py-[12vh]">
      <Reveal>
        <span className="eyebrow">Background</span>
        <h2 className="mt-5 font-serif text-[clamp(28px,4vw,46px)] font-normal">
          Education &amp; <span className="italic text-rouge-soft">certifications</span>
        </h2>
      </Reveal>

      <ol className="relative mt-12 ml-2 pl-8 md:pl-12">
        {/* continuous gradient rail */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-0 top-1.5 w-px bg-white/15"
        />

        {/* education */}
        {education.map((edu, i) => (
          <Reveal key={`edu-${i}`} delay={i * 60}>
            <li className="relative pb-10">
              <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-rouge shadow-[0_0_0_4px_rgba(232,80,111,0.15)] md:-left-[53px]" />
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="font-serif text-[22px] font-normal text-ink">{edu.qualification}</h3>
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

        {/* certifications, as timeline entries after the MScIT */}
        {certs.map((cert, i) => (
          <Reveal key={`cert-${i}`} delay={(education.length + i) * 60}>
            <li className="relative pb-10">
              <span className="absolute -left-[37px] top-2 h-2.5 w-2.5 rounded-full bg-rouge shadow-[0_0_0_4px_rgba(232,80,111,0.15)] md:-left-[53px]" />
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <h3 className="font-serif text-[22px] font-normal text-ink">{cert.name}</h3>
                <span className="font-sans text-[12px] uppercase tracking-[0.18em] text-ink/45 tabular-nums">
                  {cert.year}
                </span>
              </div>
              <p className="mt-1.5 font-sans text-[13px] uppercase tracking-[0.14em] text-rouge-soft">
                {cert.issuer}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
