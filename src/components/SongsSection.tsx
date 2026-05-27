"use client";

import { motion } from "framer-motion";
import styles from "./SongsSection.module.css";

const SONGS = [
  {
    title: "Lae Dooba",
    artist: "Sunidhi Chauhan",
    line: "The one that makes everything feel cinematic. Every time it plays, I see you.",
    color: "#c9788d",
    bars: [60, 80, 45, 90, 55, 70, 85, 50, 75, 65],
  },
  {
    title: "Dooron Dooron",
    artist: "Nabeel Shaukat Ali",
    line: "The distance song. December 2025 hit differently with this one on repeat.",
    color: "#8dafa3",
    bars: [70, 50, 85, 60, 90, 45, 80, 65, 55, 75],
  },
  {
    title: "Makhana",
    artist: "Diljit Dosanjh",
    line: "Because you are exactly this kind of trouble. Playful. Irresistible.",
    color: "#d8a46b",
    bars: [85, 60, 75, 90, 50, 80, 65, 70, 55, 85],
  },
  {
    title: "Wildflower",
    artist: "Billie Eilish",
    line: "Your soul song. And now mine too. It was written for you without knowing you.",
    color: "#9b7fa6",
    bars: [55, 90, 65, 75, 80, 45, 85, 70, 60, 80],
  },
];

function SoundBars({ bars, color, active }: { bars: number[]; color: string; active: boolean }) {
  return (
    <div className={styles.bars}>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className={styles.bar}
          style={{ background: color }}
          animate={active ? { scaleY: [0.3, 1, 0.3], height: h } : { scaleY: 0.3, height: h * 0.3 }}
          transition={{ duration: 0.6 + i * 0.04, repeat: active ? Infinity : 0, delay: i * 0.06 }}
        />
      ))}
    </div>
  );
}

export function SongsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className={styles.eyebrow}>Our Playlist · Four Songs</p>
          <h2 className={styles.title}>Songs That Are Forever Ours</h2>
        </motion.div>

        <div className={styles.grid}>
          {SONGS.map((song, i) => (
            <motion.div
              key={song.title}
              className={styles.card}
              style={{ "--song-color": song.color } as React.CSSProperties}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              whileHover="hovered"
            >
              <div className={styles.disc}>
                <motion.div
                  className={styles.discInner}
                  variants={{ hovered: { rotate: 360 } }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  style={{ border: `3px solid ${song.color}` }}
                >
                  <span className={styles.discCenter} style={{ background: song.color }} />
                </motion.div>
              </div>

              <motion.div variants={{ hovered: {} }}>
                <SoundBars bars={song.bars} color={song.color} active={false} />
              </motion.div>

              <div className={styles.info}>
                <p className={styles.songTitle}>{song.title}</p>
                <p className={styles.artist}>{song.artist}</p>
                <p className={styles.line}>{song.line}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
