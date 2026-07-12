"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${email}`}
        className="font-serif text-[clamp(22px,3vw,38px)] italic text-ink transition-colors duration-300 hover:bg-gradient-to-r hover:from-rouge hover:to-wine-500 hover:bg-clip-text hover:text-transparent"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="rounded-full border border-white/20 px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.16em] text-ink/60 transition-colors hover:border-rouge hover:text-rouge"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>
    </div>
  );
}
