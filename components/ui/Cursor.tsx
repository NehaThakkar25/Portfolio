"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.body.classList.add("has-custom-cursor");

    // Update transform directly on move, no rAF loop and no frame of latency.
    const onMove = (e: PointerEvent) => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      dot.classList.remove("is-hidden");
    };
    const onLeave = () => dot.classList.add("is-hidden");

    const isInteractive = (el: Element | null) =>
      !!el?.closest("a, button, [data-cursor], input, textarea, [role='button']");
    const onOver = (e: Event) => {
      dot.classList.toggle("is-hover", isInteractive(e.target as Element));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave);
    document.addEventListener("pointerover", onOver);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      document.removeEventListener("pointerover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot is-hidden" aria-hidden="true" />;
}
