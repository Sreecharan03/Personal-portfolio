"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./LoveLetter.module.css";

const LETTER_LINES = [
  "Bubu,",
  "",
  "I still remember the first time I saw you. Mid-June, 2024.",
  "You were gorgeous. Perfect.",
  "And I was absolutely terrified to say a single word.",
  "",
  "Then I started learning the little things about you.",
  "How you hold your nose when it itches.",
  "I could watch that forever.",
  "How you tell me every single detail of your day,",
  "like I am the only person in the world meant to hear it.",
  "How you save your favourite food under my name in your contacts.",
  "How you try new food, and when you do not like it,",
  "it somehow always ends up in my hands.",
  "",
  "Our story was never simple.",
  "Different states. Different worlds.",
  "Clauses we did not write but had to carry.",
  "You were afraid. So was I.",
  "But you stayed.",
  "",
  "December 2025, the distance started.",
  "And somehow that distance showed me something I already knew:",
  "you are home. Not a place. You.",
  "",
  "I did everything I could to get to Hyderabad.",
  "I will always find my way to you.",
  "",
  "Happy 22nd Birthday, Bubu.",
  "Every version of you, the little girl in those childhood photos,",
  "the Deloitte girl, the one who texts me forty seven things before noon,",
  "I love them all.",
  "",
  "Always yours,",
  "Charan",
];

function TypewriterLine({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!inView) return;
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [inView, delay]);

  useEffect(() => {
    if (!started || text === "") return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [started, text]);

  if (text === "") return <br />;

  return (
    <span ref={ref} className={styles.line}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className={styles.cursor}>|</span>
      )}
    </span>
  );
}

export function LoveLetter() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-5% 0px" });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.envelope}>
        <motion.div
          className={styles.envelopeFlap}
          initial={{ rotateX: 0 }}
          animate={inView ? { rotateX: -180 } : {}}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />
        <div className={styles.envelopeBody}>
          <p className={styles.eyebrow}>A Letter · Just For You</p>
        </div>
      </div>

      <motion.div
        className={styles.paper}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className={styles.letterLines}>
          {LETTER_LINES.map((line, i) => (
            <TypewriterLine
              key={i}
              text={line}
              delay={i * 120 + 900}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
