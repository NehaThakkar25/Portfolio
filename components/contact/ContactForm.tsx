"use client";

import { useState } from "react";

const FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || "";
const EMAIL = "emailnehathakkar@gmail.com";

const inputCls =
  "rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3.5 font-sans text-[15px] text-ink placeholder:text-ink/35 transition-colors focus:border-rouge focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // No Formspree id yet? Fall back to the visitor's mail client so the form always works.
    if (!FORM_ID) {
      const name = String(data.get("name") || "");
      const msg = String(data.get("message") || "");
      const from = String(data.get("email") || "");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        "Project enquiry from " + name
      )}&body=${encodeURIComponent(msg + "\n\nReply to: " + from)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORM_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "ok") {
    return (
      <div className="glass flex flex-col items-center rounded-2xl p-10 text-center">
        <p className="font-serif text-[28px] italic text-rouge-soft">Thank you.</p>
        <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-ink/65">
          Your message is on its way. I&rsquo;ll get back to you soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-white/25 px-6 py-2.5 font-sans text-[11px] uppercase tracking-[0.16em] text-ink/85 transition-colors hover:border-rouge hover:text-ink"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <input name="name" required placeholder="Your name" className={inputCls} autoComplete="name" />
      <input name="email" type="email" required placeholder="Email address" className={inputCls} autoComplete="email" />
      <textarea name="message" required rows={5} placeholder="Tell me a little about your project" className={inputCls} />
      {status === "error" && (
        <p className="text-[13px] text-rouge-soft">
          Something went wrong. You can email me directly at {EMAIL}.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 rounded-full bg-gradient-to-r from-rouge to-wine-500 px-7 py-4 font-sans text-[12px] uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_34px_rgba(232,80,111,0.4)] disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
