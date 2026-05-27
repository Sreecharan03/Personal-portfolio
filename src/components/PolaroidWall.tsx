"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./PolaroidWall.module.css";

const POLAROIDS = [
  { src: "/media/images/07-club-date.jpeg", caption: "Club date energy", rotation: -6 },
  { src: "/media/images/22-in-lift.jpeg", caption: "Lift selfie, spontaneous", rotation: 4 },
  { src: "/media/images/35-waiting-for-you-to-call-just-call-me-you-are-finshed.jpeg", caption: "Waiting for your call", rotation: -3 },
  { src: "/media/images/28-selfie-after-fight.jpeg", caption: "After the fight, still cute", rotation: 7 },
  { src: "/media/images/36-what-is-thisfor-me-in-work-image.jpeg", caption: "Work mode, queen mode", rotation: -5 },
  { src: "/media/images/25-no-one-is-better-then-me-i-am-the-queen-here-childhood.jpeg", caption: "Born knowing she is the queen", rotation: 5 },
  { src: "/media/images/01-after-work-so-tired-one-pout-please.jpeg", caption: "Post-work pout, iconic", rotation: -8 },
  { src: "/media/images/33-tradyional-date.jpeg", caption: "Traditional date, temple day", rotation: 3 },
];

type DragState = {
  idx: number;
  startX: number;
  startY: number;
  origX: number;
  origY: number;
};

export function PolaroidWall() {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    POLAROIDS.map(() => ({ x: 0, y: 0 }))
  );
  const [zOrder, setZOrder] = useState<number[]>(POLAROIDS.map((_, i) => i));
  const dragging = useRef<DragState | null>(null);

  function bringToFront(idx: number) {
    setZOrder((prev) => {
      const filtered = prev.filter((z) => z !== idx);
      return [...filtered, idx];
    });
  }

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
          <p className={styles.eyebrow}>Corkboard · Drag the Memories</p>
          <h2 className={styles.title}>Our Polaroid Wall</h2>
          <p className={styles.subtitle}>Every photo is a moment worth keeping. Drag them around.</p>
        </motion.div>

        <div className={styles.board}>
          {POLAROIDS.map((photo, i) => {
            const zIdx = zOrder.indexOf(i);
            return (
              <motion.div
                key={photo.src}
                className={styles.polaroid}
                style={{
                  rotate: photo.rotation,
                  zIndex: zIdx + 1,
                  x: positions[i].x,
                  y: positions[i].y,
                }}
                drag
                dragMomentum={false}
                onDragStart={() => bringToFront(i)}
                onDrag={(_, info) => {
                  setPositions((prev) =>
                    prev.map((p, idx) =>
                      idx === i ? { x: p.x + info.delta.x, y: p.y + info.delta.y } : p
                    )
                  );
                }}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.08 }}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="180px"
                    style={{ objectFit: "cover" }}
                    draggable={false}
                  />
                </div>
                <p className={styles.caption}>{photo.caption}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
