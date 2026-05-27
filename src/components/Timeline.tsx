"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Timeline.module.css";

type Milestone = {
  id: string;
  date: string;
  eyebrow: string;
  title: string;
  body: string;
  photo: string | null;
  align: "left" | "right";
  accent: string;
};

const MILESTONES: Milestone[] = [
  {
    id: "first-sight",
    date: "June 2024",
    eyebrow: "Chapter One",
    title: "First Sight",
    body: "You were gorgeous. Perfect. And I was absolutely terrified to say a single word to you. So I watched from a distance — which, funny enough, became our theme.",
    photo: "/media/images/38-Timeline 1st image.png",
    align: "left",
    accent: "#c9788d",
  },
  {
    id: "together",
    date: "August 25, 2024",
    eyebrow: "Chapter Two",
    title: "We Chose Each Other",
    body: "No labels. No rules. Just two people who decided, on the same day, to be something real. Our beginning. The day I still count from.",
    photo: "/media/images/39-TimeLine-2ndd-Image.png",
    align: "right",
    accent: "#d8a46b",
  },
  {
    id: "building",
    date: "2024 — 2025",
    eyebrow: "Chapter Three",
    title: "Building Our World",
    body: "Upland Bistro. Temple dates. Cafe runs. Fifteen dates and counting. Every ordinary Tuesday quietly becoming the memory I reach for first.",
    photo: "/media/images/40-timeline-3rd-Image.png",
    align: "left",
    accent: "#c9788d",
  },
  {
    id: "distance",
    date: "December 2025",
    eyebrow: "Chapter Four",
    title: "The Distance",
    body: "You were in Hyderabad for Deloitte. I was in Pune. Around 560 km between us. Five months. But distance only showed me what I already knew about you.",
    photo: "/media/images/41-timeline-4th Image.png",
    align: "right",
    accent: "#8dafa3",
  },
  {
    id: "reunion",
    date: "Early 2026",
    eyebrow: "Chapter Five",
    title: "I Came to You",
    body: "I left Pune. Moved to Hyderabad. Changed every plan. I will always find my way to wherever you are.",
    photo: "/media/images/42-timeline-5th-image.png",
    align: "left",
    accent: "#d8a46b",
  },
  {
    id: "birthday",
    date: "August 15, 2026",
    eyebrow: "Chapter Six",
    title: "Happy 22nd Birthday",
    body: "Every chapter so far was just the beginning. The best of our story is still ahead. Happy Birthday, Bubu. I love you.",
    photo: "/media/images/04-best-hand-pos.jpeg",
    align: "right",
    accent: "#c9788d",
  },
];

function IndiaMap() {
  return (
    <div className={styles.mapWrap}>
      {/* viewBox maps real coords: lon 72–82°E, lat 14–21°N → 280×110 px
          Pune  (73.86°E, 18.52°N) → x≈52,  y≈39
          Hyderabad (78.47°E, 17.38°N) → x≈181, y≈57  */}
      <svg
        viewBox="0 0 280 110"
        className={styles.mapSvg}
        aria-hidden
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="tlHydGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d8a46b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d8a46b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="tlPuneGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c9788d" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c9788d" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Glow halos */}
        <circle cx="52"  cy="39" r="24" fill="url(#tlPuneGlow)" />
        <circle cx="181" cy="57" r="24" fill="url(#tlHydGlow)" />

        {/* Animated dashed line Pune → Hyderabad */}
        <motion.line
          x1="60"  y1="40"
          x2="173" y2="55"
          stroke="rgba(141,175,163,0.75)"
          strokeWidth="1.5"
          strokeDasharray="7 5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.4 }}
          viewport={{ once: true, amount: 0.6 }}
        />

        {/* Distance label (midpoint of line) */}
        <motion.text
          x="116" y="35"
          textAnchor="middle"
          fontSize="9"
          fill="rgba(141,175,163,0.9)"
          fontFamily="Manrope, sans-serif"
          fontWeight="700"
          letterSpacing="0.1em"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          ~560 KM
        </motion.text>

        {/* Pune dot */}
        <motion.circle
          cx="52" cy="39" r="7"
          fill="#c9788d"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.1 }}
          viewport={{ once: true }}
        />
        <motion.circle
          cx="52" cy="39" r="7"
          fill="none"
          stroke="#c9788d"
          strokeWidth="1.5"
          animate={{ r: [7, 18, 7], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />

        {/* Hyderabad dot */}
        <motion.circle
          cx="181" cy="57" r="7"
          fill="#d8a46b"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 18, delay: 0.2 }}
          viewport={{ once: true }}
        />
        <motion.circle
          cx="181" cy="57" r="7"
          fill="none"
          stroke="#d8a46b"
          strokeWidth="1.5"
          animate={{ r: [7, 18, 7], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
        />

        {/* Pune labels — above the dot */}
        <text x="52"  y="25" textAnchor="middle" fontSize="8.5" fill="rgba(201,120,141,0.95)" fontFamily="Manrope,sans-serif" fontWeight="700" letterSpacing="0.12em">PUNE</text>
        <text x="52"  y="14" textAnchor="middle" fontSize="7"   fill="rgba(255,248,243,0.4)"  fontFamily="Manrope,sans-serif">Where I Was</text>

        {/* Hyderabad labels — below the dot */}
        <text x="181" y="77" textAnchor="middle" fontSize="8.5" fill="rgba(216,164,107,0.95)" fontFamily="Manrope,sans-serif" fontWeight="700" letterSpacing="0.12em">HYDERABAD</text>
        <text x="181" y="88" textAnchor="middle" fontSize="7"   fill="rgba(255,248,243,0.4)"  fontFamily="Manrope,sans-serif">Where You Were</text>
      </svg>

      <p className={styles.mapCaption}>Five months apart. Still closer than ever.</p>
    </div>
  );
}

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.9", "end 0.1"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className={styles.eyebrow}>Our Story · Six Chapters</p>
          <h2 className={styles.title}>The Journey</h2>
          <p className={styles.subtitle}>
            From the first terrifying moment I saw you, to right here, right now.
          </p>
        </motion.div>

        <div className={styles.track}>
          {/* Gray background guide line */}
          <div className={styles.lineGuide} aria-hidden />

          {/* Animated colored line */}
          <div className={styles.lineWrap} aria-hidden>
            <motion.div className={styles.line} style={{ scaleY: lineScaleY }} />
          </div>

          {MILESTONES.map((m) => (
            <div key={m.id} className={styles.milestone} data-align={m.align}>
              {/* Center dot */}
              <motion.div
                className={styles.dot}
                style={{ "--dot-color": m.accent } as React.CSSProperties}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                viewport={{ once: true, amount: 0.5 }}
              />

              {/* Date label */}
              <motion.p
                className={styles.dateLabel}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {m.date}
              </motion.p>

              {/* Card */}
              <motion.div
                className={styles.card}
                initial={{ opacity: 0, x: m.align === "left" ? -48 : 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.72, ease: [0.4, 0, 0.2, 1], delay: 0.18 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -5 }}
              >
                {m.photo ? (
                  <div className={styles.photo}>
                    <Image
                      src={m.photo}
                      alt={m.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 40vw"
                      style={{ objectFit: "cover", objectPosition: "center 20%" }}
                    />
                    <div
                      className={styles.photoSheen}
                      style={{
                        background: `linear-gradient(to top, ${m.accent}44 0%, transparent 55%)`,
                      }}
                    />
                  </div>
                ) : (
                  <IndiaMap />
                )}

                <div className={styles.cardBody}>
                  <p className={styles.cardEyebrow} style={{ color: m.accent }}>
                    {m.eyebrow}
                  </p>
                  <h3 className={styles.cardTitle}>{m.title}</h3>
                  <p className={styles.cardText}>{m.body}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
