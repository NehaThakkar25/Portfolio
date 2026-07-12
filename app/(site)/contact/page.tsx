import { profile } from "@/lib/content";
import AmbientField from "@/components/home/AmbientField";
import CopyEmail from "@/components/contact/CopyEmail";
import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Hire a Product Designer | Neha Thakkar",
  description:
    "Have a project in mind? Hire a product designer for UX, UI, and product work. Based in India, working with startups and brands worldwide.",
  alternates: { canonical: "/contact" },
};

const EMAIL = "emailnehathakkar@gmail.com";

export default function ContactPage() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-[6vw] py-[18vh]">
      <AmbientField />

      <div className="relative z-10 grid w-full items-center gap-x-16 gap-y-14 lg:grid-cols-[1.05fr_0.95fr]">
        {/* invitation */}
        <div>
          <span className="eyebrow">Contact</span>
          <h1 className="mt-6 font-serif text-[clamp(44px,7vw,92px)] font-normal leading-[0.95]">
            Let&rsquo;s build something <span className="italic text-rouge-soft">people love</span>.
          </h1>
          <p className="mt-7 max-w-md text-[clamp(16px,2vw,20px)] leading-relaxed text-ink/65">
            Looking to hire a product designer? I&rsquo;m open to new projects and allergic to boring
            briefs. Based in India, designing for everywhere, and always up for a good design conversation.
          </p>

          <div className="mt-10">
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.24em] text-ink/40">Email me</p>
            <CopyEmail email={EMAIL} />
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 font-sans text-[11px] uppercase tracking-[0.18em] text-ink/55">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-rouge"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* form */}
        <div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
