"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BirthdayCake.module.css";

const TOTAL_CANDLES = 22;
const COLORS = ["#c9788d", "#d8a46b", "#8dafa3", "#e8c4cc", "#f0d9b5"];

function FireworksCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; alpha: number; color: string; size: number }[]>([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !active) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function launch() {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.5;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60;
        const speed = 2 + Math.random() * 5;
        particles.current.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, alpha: 1, color, size: 3 + Math.random() * 3 });
      }
    }

    let launchTimer = 0;
    const tick = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      launchTimer++;
      if (launchTimer % 30 === 0) launch();
      particles.current = particles.current.filter((p) => p.alpha > 0.05);
      for (const p of particles.current) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.alpha -= 0.015;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100 }} />;
}

export function BirthdayCake() {
  const [blown, setBlown] = useState<Set<number>>(new Set());
  const [allBlown, setAllBlown] = useState(false);
  const [blowing, setBlowing] = useState(false);

  const blowOne = useCallback((i: number) => {
    if (allBlown || blowing) return;
    setBlown((prev) => {
      const next = new Set(prev);
      next.add(i);
      if (next.size === TOTAL_CANDLES) setTimeout(() => setAllBlown(true), 400);
      return next;
    });
  }, [allBlown, blowing]);

  const blowAll = useCallback(() => {
    if (blowing || allBlown) return;
    setBlowing(true);

    const order = Array.from({ length: TOTAL_CANDLES }, (_, i) => i);
    order.forEach((i) => {
      setTimeout(() => {
        setBlown((prev) => {
          const next = new Set(prev);
          next.add(i);
          return next;
        });
        if (i === TOTAL_CANDLES - 1) {
          setTimeout(() => setAllBlown(true), 500);
        }
      }, 400 + i * 70);
    });
  }, [blowing, allBlown]);

  const remaining = TOTAL_CANDLES - blown.size;

  return (
    <section className={styles.section}>
      <FireworksCanvas active={allBlown} />

      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className={styles.eyebrow}>August 15, 2026 · Birthday</p>
          <h2 className={styles.title}>Make a Wish, Bubu</h2>
          <p className={styles.subtitle}>
            Take a deep breath. Close your eyes. Then blow.
          </p>
        </motion.div>

        <div className={styles.cakeWrapper}>
          <div className={styles.candles}>
            {Array.from({ length: TOTAL_CANDLES }, (_, i) => {
              const isOut = blown.has(i);
              return (
                <motion.button
                  key={i}
                  className={styles.candle}
                  data-out={isOut}
                  onClick={() => blowOne(i)}
                  whileHover={!isOut && !blowing ? { scale: 1.12, y: -3 } : {}}
                  whileTap={!isOut ? { scale: 0.92 } : {}}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.035 }}
                  viewport={{ once: true }}
                  aria-label={`Candle ${i + 1}`}
                >
                  <span className={styles.candleStick} />

                  <AnimatePresence>
                    {!isOut && (
                      <motion.span
                        className={styles.flame}
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0, y: -14 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {isOut && (
                      <motion.span
                        className={styles.smoke}
                        initial={{ opacity: 0.7, y: 0, scaleX: 1 }}
                        animate={{ opacity: 0, y: -22, scaleX: 1.8 }}
                        exit={{}}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          <div className={styles.cake}>
            <div className={styles.cakeTop} />
            <div className={styles.cakeMiddle}>
              <span className={styles.cakeDecor}>Happy Birthday Bubu</span>
            </div>
            <div className={styles.cakeBase} />
            <div className={styles.plate} />
          </div>

          <AnimatePresence mode="wait">
            {!allBlown && (
              <motion.div
                key="blow-controls"
                className={styles.blowControls}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                {blowing && !allBlown ? (
                  <div className={styles.blowingState}>
                    <motion.div
                      className={styles.progressRing}
                      style={{
                        background: `conic-gradient(#c9788d ${((TOTAL_CANDLES - remaining) / TOTAL_CANDLES) * 360}deg, rgba(255,255,255,0.08) 0deg)`,
                      }}
                    >
                      <span className={styles.progressText}>{remaining}</span>
                    </motion.div>
                    <p className={styles.blowingLabel}>Blowing out the candles…</p>
                  </div>
                ) : (
                  <motion.button
                    className={styles.blowBtn}
                    onClick={blowAll}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className={styles.blowBtnWind}>🌬️</span>
                    Take a Breath &amp; Blow
                    <motion.span
                      className={styles.blowBtnRing}
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {allBlown && (
            <motion.div
              className={styles.wishCard}
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className={styles.wishTitle}>Happy 22nd Birthday, Bubu.</p>
              <p className={styles.wishText}>
                Every candle you just blew out was a year of becoming the person I fell in love with.
                I hope your 22nd year is everything you deserve, and more than you imagine.
                I will be right here. Always.
              </p>
              <p className={styles.wishSign}>Always yours, Charan</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
