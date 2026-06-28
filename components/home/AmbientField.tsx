"use client";

import { useEffect, useRef } from "react";

/* Ambient particle field + cursor-following glow, scoped to its parent
   (which must be `relative`). Pauses when offscreen; no backdrop-blur. */
type P = { x: number; y: number; vx: number; vy: number; r: number };

export default function AmbientField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let running = false;
    let rect = wrap.getBoundingClientRect();
    const LINK = 110;
    let parts: P[] = [];
    const mouse = { x: -9999, y: -9999 };
    let gx = 0;
    let gy = 0;
    let gtx = 0;
    let gty = 0;

    const updateRect = () => {
      rect = wrap.getBoundingClientRect();
    };
    const resize = () => {
      w = canvas.width = wrap.offsetWidth;
      h = canvas.height = wrap.offsetHeight;
      gx = gtx = w / 2;
      gy = gty = h / 2;
      updateRect();
      const n = Math.min(60, Math.floor((w * h) / 24000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.5,
      }));
    };

    const loop = () => {
      if (!running) return;
      gx += (gtx - gx) * 0.08;
      gy += (gty - gy) * 0.08;
      if (glowRef.current) glowRef.current.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 130) {
          p.x += (dx / d) * 1.4;
          p.y += (dy / d) * 1.4;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,140,160,0.6)";
        ctx.fill();
        for (let j = i + 1; j < parts.length; j++) {
          const q = parts[j];
          const ax = p.x - q.x;
          const ay = p.y - q.y;
          if (ax > LINK || ax < -LINK || ay > LINK || ay < -LINK) continue;
          const dd = Math.hypot(ax, ay);
          if (dd < LINK) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(200,70,100,${0.14 * (1 - dd / LINK)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        gtx = mouse.x;
        gty = mouse.y;
      } else {
        mouse.x = mouse.y = -9999;
      }
    };

    resize();
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(wrap);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateRect, { passive: true });

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateRect);
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        ref={glowRef}
        className="absolute left-0 top-0 h-[50vw] w-[50vw] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(232,80,111,0.2), transparent 60%)",
          transform: "translate(50%, 50%) translate(-50%, -50%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
