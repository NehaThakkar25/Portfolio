export default function ComingSoon({ label, title }: { label: string; title: string }) {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-[6vw] text-center">
      <span className="eyebrow">{label}</span>
      <h1 className="mt-6 font-serif text-[clamp(40px,8vw,96px)] font-normal italic leading-none text-balance">
        {title}
      </h1>
      <p className="mt-7 font-sans text-[12px] uppercase tracking-[0.3em] text-ink/45">
        Coming together soon
      </p>
    </section>
  );
}
