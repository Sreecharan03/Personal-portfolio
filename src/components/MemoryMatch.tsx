"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./MemoryMatch.module.css";

const PHOTO_PAIRS = [
  { src: "/media/images/10-date-laughing-moments.jpeg", alt: "Laughing together" },
  { src: "/media/images/04-best-hand-pos.jpeg", alt: "Holding hands" },
  { src: "/media/images/09-datecafe.jpeg", alt: "Cafe date" },
  { src: "/media/images/06-childhood-soo-cute.jpeg", alt: "Childhood cute" },
  { src: "/media/images/31-this-pic-is-recent-one-went-for-date.jpeg", alt: "Recent date" },
  { src: "/media/images/12-deliote-1.jpeg", alt: "Deloitte proud moment" },
  { src: "/media/images/28-selfie-after-fight.jpeg", alt: "Selfie after fight" },
  { src: "/media/images/37-with-her-mom.jpeg", alt: "With mom" },
];

type Card = {
  id: number;
  pairId: number;
  src: string;
  alt: string;
  flipped: boolean;
  matched: boolean;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): Card[] {
  const deck = PHOTO_PAIRS.flatMap((photo, pairId) => [
    { id: pairId * 2, pairId, src: photo.src, alt: photo.alt, flipped: false, matched: false },
    { id: pairId * 2 + 1, pairId, src: photo.src, alt: photo.alt, flipped: false, matched: false },
  ]);
  return shuffle(deck);
}

export function MemoryMatch() {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    setCards(buildDeck());
  }, []);

  useEffect(() => {
    if (selected.length === 2) {
      setLocked(true);
      const [a, b] = selected;
      const cardA = cards.find((c) => c.id === a)!;
      const cardB = cards.find((c) => c.id === b)!;
      setMoves((m) => m + 1);

      if (cardA.pairId === cardB.pairId) {
        setCards((prev) =>
          prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c))
        );
        setSelected([]);
        setLocked(false);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === a || c.id === b ? { ...c, flipped: false } : c))
          );
          setSelected([]);
          setLocked(false);
        }, 1000);
      }
    }
  }, [selected, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.matched)) setWon(true);
  }, [cards]);

  function flip(id: number) {
    if (locked || selected.length >= 2) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched) return;
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)));
    setSelected((prev) => [...prev, id]);
  }

  function reset() {
    setCards(buildDeck());
    setSelected([]);
    setMoves(0);
    setWon(false);
    setLocked(false);
  }

  if (cards.length === 0) return null;

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
          <p className={styles.eyebrow}>Memory Game · Our Photos</p>
          <h2 className={styles.title}>Find the Matching Memories</h2>
          <p className={styles.subtitle}>
            Flip the cards. Match the pairs. Each pair is a real memory from our story.
          </p>
          <p className={styles.moves}>Moves: <strong>{moves}</strong></p>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card) => (
            <motion.div
              key={card.id}
              className={styles.cardWrapper}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: card.id * 0.025 }}
              viewport={{ once: true }}
              onClick={() => flip(card.id)}
            >
              <motion.div
                className={styles.card}
                animate={{ rotateY: card.flipped || card.matched ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={styles.cardBack}>
                  <span className={styles.cardHeart}>♥</span>
                </div>
                <div className={styles.cardFront}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.src}
                    alt={card.alt}
                    draggable={false}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  {card.matched && (
                    <div className={styles.matchedOverlay}>
                      <span>♥</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {won && (
            <motion.div
              className={styles.wonBanner}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className={styles.wonTitle}>You found all our memories.</p>
              <p className={styles.wonSub}>Completed in {moves} moves. Just like you always find your way back to me.</p>
              <button className={styles.playAgain} onClick={reset}>Play Again</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
