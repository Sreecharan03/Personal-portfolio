"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { CursorTrail } from "./CursorTrail";
import { LoveLetter } from "./LoveLetter";
import { ReasonsSection } from "./ReasonsSection";
import { NumbersSection } from "./NumbersSection";
import { SongsSection } from "./SongsSection";
import { QuoteBreak } from "./QuoteBreak";
import { QuizGame } from "./QuizGame";
import { BucketList } from "./BucketList";
import { Timeline } from "./Timeline";
import styles from "./MemoryStory.module.css";

const HeroScene = dynamic(() => import("./HeroScene").then((m) => ({ default: m.HeroScene })), { ssr: false });
const MemoryMatch = dynamic(() => import("./MemoryMatch").then((m) => ({ default: m.MemoryMatch })), { ssr: false });
const BirthdayCake = dynamic(() => import("./BirthdayCake").then((m) => ({ default: m.BirthdayCake })), { ssr: false });
const PolaroidWall = dynamic(() => import("./PolaroidWall").then((m) => ({ default: m.PolaroidWall })), { ssr: false });

type Memory = {
  src: string;
  alt: string;
  caption: string;
};

type Chapter = {
  id: string;
  act: string;
  title: string;
  copy: string;
  palette: [string, string];
  memories: Memory[];
};

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const chapters: Chapter[] = [
  {
    id: "childhood",
    act: "Act 1 · Before Us",
    title: "Childhood Spark",
    copy: "Before we ever met, there was this little storm of joy growing up into someone completely unforgettable.",
    palette: ["#fceeef", "#fff8f3"],
    memories: [
      { src: "/media/images/05-childhood-pic-cindrella-ah-whatt.jpeg", alt: "Childhood princess moment", caption: "A tiny queen with full attitude." },
      { src: "/media/images/06-childhood-soo-cute.jpeg", alt: "Cute childhood memory", caption: "The smile that still wins every heart." },
      { src: "/media/images/21-im-innocent-i-dont-know-anything-childood.jpeg", alt: "Childhood close portrait", caption: "Innocent look. Dangerous charm." },
      { src: "/media/images/25-no-one-is-better-then-me-i-am-the-queen-here-childhood.jpeg", alt: "Queen childhood", caption: "Born knowing she runs the place." },
      { src: "/media/images/03-ah-yeahh-finally-got-into-class-11.jpeg", alt: "School memory", caption: "Growing up looked perfect on you." },
      { src: "/media/images/30-thinking-to-become-something-ended-up-being-into-deliote-childhood.jpeg", alt: "Black and white throwback", caption: "Dreams were already loading." },
    ],
  },
  {
    id: "becoming",
    act: "Act 2 · Becoming Her",
    title: "Dreams Into Milestones",
    copy: "From student days to career wins, every chapter made you stronger, calmer, brighter. Deloitte was never just a job. It was proof.",
    palette: ["#fff8f3", "#f6ede7"],
    memories: [
      { src: "/media/images/16-her-first-company-strup-not-deliote-next-she-got-deliote.jpeg", alt: "First company memory", caption: "Where ambition started getting real." },
      { src: "/media/images/12-deliote-1.jpeg", alt: "Deloitte frame", caption: "Proud moment. Even bigger future." },
      { src: "/media/images/14-deliote-university-achivment.jpeg", alt: "Deloitte achievement", caption: "Proof of all the work nobody saw." },
      { src: "/media/images/13-deliote-join2.jpeg", alt: "Work mirror shot", caption: "Focused and fearless." },
      { src: "/media/images/36-what-is-thisfor-me-in-work-image.jpeg", alt: "Work image", caption: "Work mode is queen mode." },
      { src: "/media/images/02-ah-sometimes-in-tradtion.jpeg", alt: "Traditional portrait", caption: "Grace in every version of you." },
    ],
  },
  {
    id: "us",
    act: "Act 4 · Us Begins",
    title: "The Start of Us",
    copy: "Dates, random selfies, laughter, and all the small moments that quietly became home. August 25, 2024.",
    palette: ["#fff8f3", "#fceeef"],
    memories: [
      { src: "/media/images/22-in-lift.jpeg", alt: "Lift mirror selfie", caption: "Us in ordinary moments, still magical." },
      { src: "/media/images/07-club-date.jpeg", alt: "Club date", caption: "This night had a different energy." },
      { src: "/media/images/33-tradyional-date.jpeg", alt: "Traditional couple date", caption: "Temple day. Heart full." },
      { src: "/media/images/31-this-pic-is-recent-one-went-for-date.jpeg", alt: "Date memory", caption: "We look right together." },
      { src: "/media/images/32-tradtional-date-before-goong-to-temple.jpeg", alt: "Traditional date close", caption: "One of my favourite frames ever." },
      { src: "/media/images/09-datecafe.jpeg", alt: "Date cafe frame", caption: "Conversations worth replaying forever." },
      { src: "/media/images/24-looks-so-thirst-wanna-try-it-asaap-cafe-date.jpeg", alt: "Drink date", caption: "You, teasing and shining." },
    ],
  },
  {
    id: "fun",
    act: "Act 5 · Chaos and Laughter",
    title: "Our Funny Universe",
    copy: "Inside jokes, drama faces, and the kind of chaos only we understand. Including the nose hold. Especially the nose hold.",
    palette: ["#f6ede7", "#fceeef"],
    memories: [
      { src: "/media/images/01-after-work-so-tired-one-pout-please.jpeg", alt: "After work pout", caption: "The pout that defeats all logic." },
      { src: "/media/images/27-please-order-food-im-quite-hungry.jpeg", alt: "Hungry frame", caption: "Food emergency mode activated." },
      { src: "/media/images/19-hey-listen-to-i-am-teamlead-funny-image-aismartlive-days.jpeg", alt: "Team lead funny frame", caption: "Boss mode with zero warning." },
      { src: "/media/images/20-i-eat-my-bf.jpeg", alt: "Couple meme frame", caption: "Certified chaos duo." },
      { src: "/media/images/34-tryin-to-steal-my-bike.jpeg", alt: "Steal bike frame", caption: "Mission accepted. Steal everything." },
      { src: "/media/images/28-selfie-after-fight.jpeg", alt: "Selfie after fight", caption: "Even after fights, still the cutest." },
      { src: "/media/images/23-lets-becore-cartoon.jpeg", alt: "Cartoon comparison", caption: "If weird had a perfect pair." },
    ],
  },
  {
    id: "love",
    act: "Act 6 · Deep Love",
    title: "Soft but Forever",
    copy: "These are the frames where time slows down and everything feels completely right.",
    palette: ["#fceeef", "#fff8f3"],
    memories: [
      { src: "/media/images/10-date-laughing-moments.jpeg", alt: "Laughing date moment", caption: "Your laugh is my reset button." },
      { src: "/media/images/11-date-lauging-moments.jpeg", alt: "Date candid", caption: "The look in your eyes says enough." },
      { src: "/media/images/08-data-candid.jpeg", alt: "Couple candid", caption: "Unplanned memories hit deeper." },
      { src: "/media/images/04-best-hand-pos.jpeg", alt: "Holding hands close", caption: "My forever place is your hand." },
      { src: "/media/images/26-ohh-look-me-my-hair-soo-good.jpeg", alt: "Portrait frame", caption: "Beautiful. Quietly powerful." },
      { src: "/media/images/18-hey-im-not-taking-your-photo-i-taking-my-own-selfie.jpeg", alt: "Selfie portrait", caption: "Still cannot look away." },
    ],
  },
  {
    id: "world",
    act: "Act 7 · Her World",
    title: "Family, Heart, and Home",
    copy: "The people and moments that made you who you are. I love all of it. Every part of your world.",
    palette: ["#fff8f3", "#f6ede7"],
    memories: [
      { src: "/media/images/37-with-her-mom.jpeg", alt: "With her mom", caption: "Strength and softness in one frame." },
      { src: "/media/images/17-her-full-family.jpeg", alt: "Family frame", caption: "A whole world of love around you." },
      { src: "/media/images/15-her-favoruite-cafe-sam-s-griddle-vizag.jpeg", alt: "Favourite cafe memory", caption: "Places become special because of you." },
      { src: "/media/images/35-waiting-for-you-to-call-just-call-me-you-are-finshed.jpeg", alt: "Waiting for call", caption: "Call me. Or else you are finished." },
      { src: "/media/images/29-the-first-story-she-kept-for-my-birthday.jpeg", alt: "First birthday story frame", caption: "This one memory still lives in me." },
    ],
  },
];

function getCountdown(): Countdown {
  const now = new Date();
  const target = new Date("2026-08-15T00:00:00+05:30");
  const diff = Math.max(target.getTime() - now.getTime(), 0);
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function ChapterScene({ chapter }: { chapter: Chapter }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const textY = useTransform(scrollYProgress, [0, 1], [70, -60]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.85, 1], [0, 1, 1, 0]);
  const mediaX = useTransform(scrollYProgress, [0, 1], ["2%", "-55%"]);
  const mediaRotate = useTransform(scrollYProgress, [0, 1], [0.8, -0.8]);
  const mediaY = useTransform(scrollYProgress, [0, 0.5, 1], [24, -16, 24]);
  const mediaOpacity = useTransform(scrollYProgress, [0.03, 0.2, 0.85, 1], [0.2, 1, 1, 0.22]);
  const bg = `linear-gradient(150deg, ${chapter.palette[0]}, ${chapter.palette[1]})`;

  return (
    <section ref={ref} className={styles.chapter} style={{ background: bg }}>
      <div className={styles.sticky}>
        <div className={styles.container}>
          <motion.div className={styles.chapterText} style={{ y: textY, opacity: textOpacity }}>
            <p className={styles.eyebrow}>{chapter.act}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.copy}</p>
          </motion.div>
          <motion.div className={styles.mediaTrack} style={{ x: mediaX, rotate: mediaRotate, y: mediaY, opacity: mediaOpacity }}>
            {chapter.memories.map((memory, idx) => (
              <motion.article
                key={memory.src}
                className={styles.mediaCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                viewport={{ amount: 0.25, once: true }}
              >
                <div className={styles.mediaImage}>
                  <Image src={memory.src} alt={memory.alt} fill sizes="(max-width: 768px) 70vw, 24vw" />
                </div>
                <span className={styles.sheen} aria-hidden />
                <p>{memory.caption}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CountdownFinale({ seconds }: { seconds: MotionValue<number> }) {
  const [countdown, setCountdown] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secGlow = useTransform(seconds, [0, 0.5, 1], [0.2, 1, 0.2]);

  return (
    <section className={styles.finale}>
      <div className={styles.container}>
        <motion.div className={styles.finaleCard} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}>
          <p className={styles.eyebrow}>Act 8 · Birthday Midnight</p>
          <h2>Countdown to August 15, 2026</h2>
          <div className={styles.countdown} role="timer" aria-live="polite">
            <div><span>{String(countdown.days).padStart(2, "0")}</span><small>Days</small></div>
            <div><span>{String(countdown.hours).padStart(2, "0")}</span><small>Hours</small></div>
            <div><span>{String(countdown.minutes).padStart(2, "0")}</span><small>Minutes</small></div>
            <motion.div style={{ opacity: secGlow }}><span>{String(countdown.seconds).padStart(2, "0")}</span><small>Seconds</small></motion.div>
          </div>
          <p className={styles.letter}>
            From your childhood spark to the Deloitte girl, to our wild laughs and late night calls and quiet love across cities,
            this whole story only says one thing. Happy 22nd Birthday, Bubu.
          </p>
          <p className={styles.sign}>Always yours, Charan.</p>
        </motion.div>
      </div>
    </section>
  );
}


export function MemoryStory() {
  const [opened, setOpened] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.25 });
  const secondsPulse = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const chapterTrackY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const confetti = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className={styles.page}>
      <CursorTrail />

      {!opened && (
        <motion.div className={styles.gate} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className={styles.gateCard}>
            <p className={styles.eyebrow}>For Bubu's Eyes Only</p>
            <h1>A Story Built for Her 22nd</h1>
            <p>Not just a website. A memory film, a love letter, a game, a bucket list, and everything in between. All for you.</p>
            <button type="button" onClick={() => setOpened(true)} className={styles.cta}>
              Open Your Gift
            </button>
          </div>
        </motion.div>
      )}

      <motion.div className={styles.progress} style={{ scaleX: progress }} />
      <div className={styles.grain} aria-hidden />
      <div className={styles.aurora} aria-hidden />

      <aside className={styles.chapterRail} aria-hidden>
        <div className={styles.railLine}>
          <motion.span className={styles.railDot} style={{ y: chapterTrackY }} />
        </div>
      </aside>

      <section className={styles.hero}>
        <div className={styles.heroScene}><HeroScene /></div>
        <div className={styles.container}>
          <motion.div className={styles.heroContent} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} viewport={{ once: true }}>
            <p className={styles.eyebrow}>Act 0 · Secret Door</p>
            <h1>To The One Who Changed Everything</h1>
            <p>Her childhood, her milestones, the B.Tech days we met, and everything we built after. Scroll slowly. Feel everything.</p>
            <p className={styles.sign}>Happy Birthday, Bubu.</p>
          </motion.div>
        </div>
      </section>

      <QuoteBreak
        quote="You hold your nose when it itches. I would watch it forever and never get tired."
        palette={["#fceeef", "#fff8f3"]}
      />

      <ChapterScene chapter={chapters[0]} />

      <QuoteBreak
        quote="Different states. Different worlds. Different castes. Same heartbeat."
        palette={["#fff8f3", "#f6ede7"]}
      />

      <ChapterScene chapter={chapters[1]} />

      <section className={styles.videoChapter}>
        <div className={styles.videoSticky}>
          <div className={styles.container}>
            <div className={styles.videoLayout}>
              <motion.div className={styles.videoText} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.4 }}>
                <p className={styles.eyebrow}>Act 3 · First Sight</p>
                <h2>Where It All Started</h2>
                <p>This moment is where I fell in love. So this stays untouched, exactly as it was.</p>
              </motion.div>
              <motion.div className={styles.videoWrap} initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.35 }}>
                <video controls playsInline preload="metadata" poster="/media/video/first-sight-poster.jpg">
                  <source src="/media/video/first-sight-love.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <LoveLetter />

      <Timeline />

      <QuoteBreak
        quote="You save your favourite food under my name. That is love in disguise."
        palette={["#1a0f14", "#2a1520"]}
      />

      <ChapterScene chapter={chapters[2]} />

      <QuoteBreak
        quote="You always win the argument. And somehow that is my favourite thing about us."
        palette={["#f6ede7", "#fceeef"]}
      />

      <ChapterScene chapter={chapters[3]} />

      <NumbersSection />

      <ChapterScene chapter={chapters[4]} />

      <QuoteBreak
        quote="December 2025, the distance started. But you never really left."
        palette={["#1a0f14", "#2a1520"]}
      />

      <ChapterScene chapter={chapters[5]} />

      <PolaroidWall />

      <ReasonsSection />

      <SongsSection />

      <QuizGame />

      <MemoryMatch />

      <BucketList />

      <BirthdayCake />

      <CountdownFinale seconds={secondsPulse} />

      <div className={styles.confetti} aria-hidden>
        {confetti.map((value) => (
          <span key={value} />
        ))}
      </div>
    </div>
  );
}
