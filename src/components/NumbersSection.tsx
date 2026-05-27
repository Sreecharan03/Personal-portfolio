"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./NumbersSection.module.css";

type Stat = {
  value: number | string;
  suffix?: string;
  label: string;
  note: string;
  isText?: boolean;
};

const STATS: Stat[] = [
  { value: 700, suffix: "+", label: "Days Since I First Saw You", note: "Every single one mattered." },
  { value: 1000, suffix: "+", label: "Photos of You on My Phone", note: "Not even slightly sorry." },
  { value: 15, suffix: "+", label: "Dates and Counting", note: "Each one better than the last." },
  { value: 0, suffix: "", label: "Arguments I Have Won", note: "I have fully made peace with this." },
  { value: 4, suffix: "", label: "Songs That Are Forever Ours", note: "Lae Dooba. Dooron Dooron. Makhana. Wildflower." },
  { value: 1, suffix: "", label: "Long Distance Chapter Survived", note: "December 2025. We made it." },
  { value: 1, suffix: "", label: "City I Moved to Just for You", note: "Hyderabad. Worth every bit." },
  { value: "∞", suffix: "", label: "Details of Your Day I Have Heard", isText: true, note: "Every single one, and I loved all of them." },
];

function CountUp({ target, suffix, isText, inView }: { target: number | string; suffix?: string; isText?: boolean; inView: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || isText) return;
    const num = typeof target === "number" ? target : 0;
    const duration = 1800;
    const steps = 60;
    const increment = num / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), num));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target, isText]);

  if (isText) return <span className={styles.statValue}>{target}</span>;
  return (
    <span className={styles.statValue}>
      {current}
      {suffix}
    </span>
  );
}

export function NumbersSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className={styles.eyebrow}>Us in Numbers</p>
          <h2 className={styles.title}>Our Story by the Stats</h2>
        </motion.div>

        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <CountUp target={stat.value} suffix={stat.suffix} isText={stat.isText} inView={inView} />
              <p className={styles.label}>{stat.label}</p>
              <p className={styles.note}>{stat.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
