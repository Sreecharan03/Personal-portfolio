"use client";

import { motion } from "framer-motion";
import styles from "./ReasonsSection.module.css";

const REASONS = [
  "The way you hold your nose when it itches. I could watch it forever and never get tired.",
  "You tell me every single detail of your day, because I am your person and you know it.",
  "You love to look rich, but you understand me without me ever having to explain. That means everything.",
  "Your short temper is honestly the funniest thing about you and I will never stop laughing.",
  "You always have an eye on me, even when you think I cannot tell. I always can.",
  "You save your favourite food under my name in your contacts. That alone says it all.",
  "When you try new food and do not like it, it becomes mine. Every single time. Without fail.",
  "You win every argument. I have fully accepted my fate and honestly I am at peace with it.",
  "You came from a completely different world and still chose to fight for ours.",
  "Distance only made you more precious to me. December 2025 proved that.",
  "I got to watch you heal from your past and it is the most beautiful thing I have ever witnessed.",
  "Your skin tone is perfect and so are you, inside and out.",
  "You are short, but you walk into every room like you own it and everyone feels it.",
  "You turn ordinary Tuesday afternoons into memories I never want to forget.",
  "Wildflower by Billie Eilish plays anywhere and I only think of you. Every time.",
  "You are afraid of what this could become, but you stay anyway. That takes more courage than you know.",
  "You understand things I have not even said out loud yet. You just know.",
  "Late night calls during long distance. You were home, even from hundreds of kilometres away.",
  "You made me a better person just by being in my life, without even trying.",
  "Cat fights, drama, chaos and all. I would choose every bit of it again without hesitation.",
  "You healed. You grew. You became the strongest version of yourself. I was there and I saw every step.",
  "There are 22 reasons written here. But honestly, Bubu, I could fill a whole library and still not be done.",
];

export function ReasonsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <p className={styles.eyebrow}>22 Reasons · For 22 Years</p>
          <h2 className={styles.title}>Why I Love You</h2>
          <p className={styles.subtitle}>
            Twenty two reasons. One for every year you have been alive making the world a better place.
          </p>
        </motion.div>

        <div className={styles.grid}>
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <span className={styles.number}>{String(i + 1).padStart(2, "0")}</span>
              <p className={styles.text}>{reason}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className={styles.sign}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          Always yours, Charan
        </motion.p>
      </div>
    </section>
  );
}
