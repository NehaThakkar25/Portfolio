"use client";

import { useEffect, useState } from "react";

/** Animates a number from 0 to `value` on mount (easeOutCubic). */
export default function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf = 0;
    let startTs = 0;
    const tick = (t: number) => {
      if (!startTs) startTs = t;
      const p = Math.min((t - startTs) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{n}</>;
}
