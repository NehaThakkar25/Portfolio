"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/content";

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Hide when scrolling down past the hero; show when scrolling up.
      setHidden(y > lastY.current && y > 140);
      // Glass background fades in once we leave the very top.
      setScrolled(y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-[5vw] py-6 transition-[transform,background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? "border-white/10 bg-[rgba(11,3,6,0.55)] backdrop-blur-lg"
          : "border-transparent bg-transparent"
      } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
    >
      <Link href="/" aria-label="Neha Thakkar, home" className="text-ink transition-colors hover:text-rouge">
        <span
          aria-hidden="true"
          className="block h-6 md:h-7"
          style={{
            aspectRatio: "268 / 59",
            backgroundColor: "currentColor",
            maskImage: "url(/logo.svg)",
            WebkitMaskImage: "url(/logo.svg)",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "left center",
            WebkitMaskPosition: "left center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />
      </Link>

      <nav className="flex gap-7 text-[11px] font-medium uppercase tracking-[0.22em]">
        {navLinks.slice(1).map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative transition-colors hover:text-ink ${
                active ? "text-ink" : "text-ink/55"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-rouge transition-all duration-300 ${
                  active ? "w-full" : "w-0"
                }`}
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
