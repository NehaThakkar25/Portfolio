import Link from "next/link";
import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-[5vw] py-12">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <p className="font-serif text-2xl italic text-ink">{profile.name}</p>

        <div className="flex flex-wrap gap-6 text-[11px] font-medium uppercase tracking-[0.18em] text-ink/55">
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
          <Link href="/contact" className="transition-colors hover:text-rouge">
            Contact
          </Link>
        </div>
      </div>

      <p className="mt-10 text-[11px] tracking-[0.04em] text-ink/40">
        © {new Date().getFullYear()} {profile.name}. Designed &amp; built with care.
      </p>
    </footer>
  );
}
