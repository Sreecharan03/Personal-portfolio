"use client";

import { motion } from "framer-motion";
import styles from "./QuoteBreak.module.css";

const wordVariant = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

type QuoteBreakProps = {
  quote: string;
  palette?: [string, string];
};

export function QuoteBreak({ quote, palette = ["#fceeef", "#fff8f3"] }: QuoteBreakProps) {
  const words = quote.split(" ");
  const isDark = palette[0].startsWith("#1") || palette[0].startsWith("#2");

  return (
    <section
      className={styles.section}
      style={{ background: `linear-gradient(150deg, ${palette[0]}, ${palette[1]})` }}
    >
      <motion.div
        className={styles.inner}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <span className={styles.openQuote} aria-hidden>&ldquo;</span>

        <p className={`${styles.quote} ${isDark ? styles.quoteDark : ""}`}>
          {words.map((word, i) => (
            <motion.span key={i} custom={i} variants={wordVariant} className={styles.word}>
              {word}{i < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </p>

        <span className={styles.closeQuote} aria-hidden>&rdquo;</span>
      </motion.div>
    </section>
  );
}
