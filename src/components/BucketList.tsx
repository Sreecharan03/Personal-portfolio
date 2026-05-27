"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BucketList.module.css";

const ITEMS = [
  { id: 1, text: "Our first resort stay, just us, no distractions, no responsibilities, just us.", emoji: "🏨" },
  { id: 2, text: "Wake up in the same city every single morning. No more long distance. Forever.", emoji: "🌅" },
  { id: 3, text: "Trip to Coorg or Munnar, cold weather, mist, hot chai and just us in it all.", emoji: "🏔️" },
  { id: 4, text: "Road trip with absolutely no destination planned, just music and the open road.", emoji: "🚗" },
  { id: 5, text: "Watch a sunrise at the beach together, hand in hand, saying nothing at all.", emoji: "🌊" },
  { id: 6, text: "Cook a full meal together from scratch, in our own kitchen, just the two of us.", emoji: "🍳" },
  { id: 7, text: "Candlelight dinner, properly done, dressed up, the whole romantic thing.", emoji: "🕯️" },
  { id: 8, text: "International trip someday. Bali, Paris, anywhere far away and beautiful, together.", emoji: "✈️" },
  { id: 9, text: "Watch Billie Eilish live someday. Front row if we can make it happen.", emoji: "🎶" },
  { id: 10, text: "Take a photo at every place that matters to our story. Build our own album of us.", emoji: "📸" },
];

export function BucketList() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const done = checked.size;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className={styles.eyebrow}>Our Future · Things To Do Together</p>
          <h2 className={styles.title}>The Bucket List</h2>
          <p className={styles.subtitle}>
            Ten things we are going to do. Tick them off as we live them.
          </p>
          {done > 0 && (
            <motion.p
              className={styles.progress}
              key={done}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {done} of {ITEMS.length} done. Keep going.
            </motion.p>
          )}
        </motion.div>

        <div className={styles.list}>
          {ITEMS.map((item, i) => {
            const isDone = checked.has(item.id);
            return (
              <motion.div
                key={item.id}
                className={styles.item}
                data-done={isDone}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                viewport={{ once: true, amount: 0.2 }}
                onClick={() => toggle(item.id)}
              >
                <span className={styles.emoji}>{item.emoji}</span>
                <p className={styles.text}>{item.text}</p>
                <motion.span
                  className={styles.check}
                  animate={isDone ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  ✓
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {done === ITEMS.length && (
            <motion.div
              className={styles.allDone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <p className={styles.allDoneText}>We did everything on the list. Time to make a new one.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
