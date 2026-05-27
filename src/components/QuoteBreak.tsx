"use client";

import { motion } from "framer-motion";
import styles from "./QuoteBreak.module.css";

type QuoteBreakProps = {
  quote: string;
  palette?: [string, string];
};

export function QuoteBreak({ quote, palette = ["#fceeef", "#fff8f3"] }: QuoteBreakProps) {
  return (
    <section
      className={styles.section}
      style={{ background: `linear-gradient(150deg, ${palette[0]}, ${palette[1]})` }}
    >
      <motion.div
        className={styles.inner}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <span className={styles.openQuote} aria-hidden>"</span>
        <p className={styles.quote}>{quote}</p>
        <span className={styles.closeQuote} aria-hidden>"</span>
      </motion.div>
    </section>
  );
}
