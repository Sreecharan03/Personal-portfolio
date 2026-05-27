"use client";

import { useEffect, useRef } from "react";

type Heart = {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  life: number;
};

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const nextIdRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      if (Math.random() > 0.4) return;
      heartsRef.current.push({
        id: nextIdRef.current++,
        x,
        y,
        size: 8 + Math.random() * 10,
        opacity: 0.8 + Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(0.8 + Math.random() * 1.4),
        life: 1,
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });

    function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.bezierCurveTo(x, y - size * 0.3, x - size * 0.5, y - size * 0.6, x - size * 0.5, y - size * 0.25);
      ctx.bezierCurveTo(x - size * 0.5, y - size * 0.7, x, y - size * 0.6, x, y - size * 0.25);
      ctx.bezierCurveTo(x, y - size * 0.6, x + size * 0.5, y - size * 0.7, x + size * 0.5, y - size * 0.25);
      ctx.bezierCurveTo(x + size * 0.5, y - size * 0.6, x, y - size * 0.3, x, y);
      ctx.fill();
    }

    const colors = ["#c9788d", "#d8a46b", "#e8a0b0"];

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      heartsRef.current = heartsRef.current.filter((h) => h.life > 0.02);
      for (const h of heartsRef.current) {
        h.x += h.vx;
        h.y += h.vy;
        h.life -= 0.018;
        h.vy += 0.02;
        const color = colors[h.id % colors.length];
        ctx.globalAlpha = h.life * h.opacity;
        ctx.fillStyle = color;
        drawHeart(ctx, h.x, h.y, h.size * h.life + h.size * 0.3);
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
