"use client";

import { motion } from "framer-motion";
import styles from "./SongsSection.module.css";

const SONGS = [
  {
    title: "Lae Dooba",
    artist: "Sunidhi Chauhan",
    line: "The one that makes everything feel cinematic. Every time it plays, I see you.",
    color: "#c9788d",
    embedSrc: "https://open.spotify.com/embed/track/5rpxVbgMMeCOLhhop1DVKj?utm_source=generator",
  },
  {
    title: "Dooron Dooron",
    artist: "Paresh Pahuja",
    line: "The distance song. December 2025 hit differently with this one on repeat.",
    color: "#8dafa3",
    embedSrc: "https://open.spotify.com/embed/album/1wGfxu2U33P3c9fAmJbUe6?utm_source=generator",
  },
  {
    title: "Makhana",
    artist: "Diljit Dosanjh",
    line: "Because you are exactly this kind of trouble. Playful. Irresistible.",
    color: "#d8a46b",
    embedSrc: "https://open.spotify.com/embed/track/7BjQqiOJio4RdPL33yALKE?utm_source=generator",
  },
  {
    title: "Wildflower",
    artist: "Billie Eilish",
    line: "Your soul song. And now mine too. It was written for you without knowing you.",
    color: "#9b7fa6",
    embedSrc: "https://open.spotify.com/embed/track/3QaPy1KgI7nu9FJEQUgn6h?utm_source=generator",
  },
];

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
          <p className={styles.subtitle}>Play them. Feel what I feel every time.</p>
        </motion.div>

        <div className={styles.grid}>
          {SONGS.map((song, i) => (
            <motion.div
              key={song.title}
              className={styles.card}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className={styles.cardTop}>
                <span className={styles.dot} style={{ background: song.color, boxShadow: `0 0 0 5px ${song.color}22` }} />
                <div>
                  <p className={styles.songTitle}>{song.title}</p>
                  <p className={styles.artist}>{song.artist}</p>
                </div>
              </div>

              <p className={styles.line}>{song.line}</p>

              <iframe
                src={song.embedSrc}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className={styles.embed}
                title={song.title}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
