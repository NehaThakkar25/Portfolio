"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    // Honor reduced-motion: skip smooth scrolling entirely.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Recompute the scroll limit whenever the document height changes
  // (images loading, accordions expanding, etc.) so Lenis never clamps
  // scrolling to a stale height.
  useEffect(() => {
    if (!enabled) return;
    const resize = () => lenisRef.current?.lenis?.resize();
    const ro = new ResizeObserver(resize);
    ro.observe(document.body);
    window.addEventListener("load", resize);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", resize);
    };
  }, [enabled]);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
