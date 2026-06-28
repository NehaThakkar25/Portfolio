"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Honor reduced-motion: skip smooth scrolling entirely.
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setEnabled(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!enabled) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
