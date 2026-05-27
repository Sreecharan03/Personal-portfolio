"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./QuizGame.module.css";

type Question = {
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

const QUESTIONS: Question[] = [
  {
    question: "What was Charan studying when we first met?",
    options: ["MBA", "B.Tech Final Year", "Working at a startup", "CA"],
    answer: 1,
    explanation: "He was a B.Tech final year student, absolutely terrified to talk to you.",
  },
  {
    question: "What is our go-to date spot in Vizag?",
    options: ["Rushikonda Beach", "CMR Central", "Upland Bistro", "RK Beach"],
    answer: 2,
    explanation: "Upland Bistro, Visakhapatnam. Some of our best conversations happened there.",
  },
  {
    question: "On which date did we officially come into each other's lives?",
    options: ["June 14, 2024", "July 10, 2024", "August 25, 2024", "December 1, 2024"],
    answer: 2,
    explanation: "August 25, 2024. The day we proposed to each other. Our beginning.",
  },
  {
    question: "What city did Charan move to just to be closer to you?",
    options: ["Bangalore", "Chennai", "Mumbai", "Hyderabad"],
    answer: 3,
    explanation: "Hyderabad. He did everything he could to get there. For you.",
  },
  {
    question: "What happens when Charan wins an argument?",
    options: ["He celebrates loudly", "He reminds you later", "He still has to say he lost", "Arguments are always a tie"],
    answer: 2,
    explanation: "He still has to say he lost. Or else, cat fight only.",
  },
  {
    question: "What do you save your favourite food as in your contacts?",
    options: ["Bubu's Cravings", "Charan's name", "Yummy Things", "My Secret List"],
    answer: 1,
    explanation: "She saves her favourite food under Charan's name. That is love in three characters.",
  },
  {
    question: "What is your all-time favourite song?",
    options: ["Lae Dooba", "Dooron Dooron", "Makhana", "Wildflower by Billie Eilish"],
    answer: 3,
    explanation: "Wildflower by Billie Eilish. Her soul song. And now his too.",
  },
];

const SCORE_MESSAGES = [
  { min: 0, max: 2, text: "You have been busy. Go listen to Wildflower and think about this." },
  { min: 3, max: 4, text: "Not bad! You know the big things. Time to focus on the little details." },
  { min: 5, max: 6, text: "Very impressive! You have been paying attention. He noticed." },
  { min: 7, max: 7, text: "Perfect score. You know him inside out. That is what makes you special." },
];

export function QuizGame() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [done, setDone] = useState(false);

  const question = QUESTIONS[current];
  const score = answers.filter(Boolean).length;
  const scoreMsg = SCORE_MESSAGES.find((m) => score >= m.min && score <= m.max);

  function choose(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setTimeout(() => {
      const correct = idx === question.answer;
      const newAnswers = [...answers, correct];
      if (current + 1 >= QUESTIONS.length) {
        setAnswers(newAnswers);
        setDone(true);
      } else {
        setAnswers(newAnswers);
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, 1400);
  }

  function restart() {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setDone(false);
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
          <p className={styles.eyebrow}>Mini Game · Just For You</p>
          <h2 className={styles.title}>How Well Do You Know Charan?</h2>
          <p className={styles.subtitle}>Seven questions. No peeking. Prove you have been paying attention.</p>
        </motion.div>

        <div className={styles.card}>
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.progress}>
                  {QUESTIONS.map((_, i) => (
                    <span
                      key={i}
                      className={styles.dot}
                      data-done={i < current}
                      data-current={i === current}
                    />
                  ))}
                </div>

                <p className={styles.questionNum}>Question {current + 1} of {QUESTIONS.length}</p>
                <p className={styles.questionText}>{question.question}</p>

                <div className={styles.options}>
                  {question.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = i === question.answer;
                    const showResult = selected !== null;
                    return (
                      <motion.button
                        key={i}
                        className={styles.option}
                        data-state={
                          showResult
                            ? isCorrect
                              ? "correct"
                              : isSelected
                              ? "wrong"
                              : "dim"
                            : "idle"
                        }
                        onClick={() => choose(i)}
                        whileHover={selected === null ? { scale: 1.02 } : {}}
                        whileTap={selected === null ? { scale: 0.98 } : {}}
                      >
                        <span className={styles.optionLetter}>{["A", "B", "C", "D"][i]}</span>
                        <span>{opt}</span>
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {selected !== null && (
                    <motion.p
                      className={styles.explanation}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {question.explanation}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                className={styles.result}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className={styles.scoreLabel}>Your Score</p>
                <p className={styles.scoreNum}>
                  {score} <span>/ {QUESTIONS.length}</span>
                </p>
                <p className={styles.scoreMsg}>{scoreMsg?.text}</p>

                <div className={styles.scoreBreakdown}>
                  {QUESTIONS.map((q, i) => (
                    <div key={i} className={styles.scoreRow}>
                      <span className={styles.scoreMark} data-correct={answers[i]}>
                        {answers[i] ? "✓" : "✗"}
                      </span>
                      <span className={styles.scoreQ}>{q.question}</span>
                    </div>
                  ))}
                </div>

                <button className={styles.restart} onClick={restart}>Play Again</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
