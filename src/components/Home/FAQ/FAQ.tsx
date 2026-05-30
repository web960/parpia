"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { faqItems } from "@/data/site";
import Reveal from "@/components/UI/Reveal";
import { premiumEase } from "@/lib/motion";

import styles from "./FAQ.module.css";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.layout}>
          <Reveal>
            <div className={styles.header}>
              <span className="section-label">FAQ</span>
              <h2 className="section-title">
                Compliance &amp; Risk Disclosure
              </h2>
              <p className={styles.intro}>
                Find quick answers to the most common questions about our
                services, pricing, and regulatory status.
              </p>
            </div>
          </Reveal>

          <div className={styles.list}>
            {faqItems.map((item, i) => {
              const isOpen = open === i;
              const questionId = `faq-question-${i}`;
              const panelId = `faq-panel-${i}`;

              return (
                <Reveal key={item.question} delay={(i % 3) + 1}>
                  <motion.div
                    className={`${styles.item} ${isOpen ? styles.open : ""}`}
                    layout
                    transition={{ layout: { duration: 0.35, ease: premiumEase } }}
                  >
                    <button
                      id={questionId}
                      className={styles.question}
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      {item.question}
                      <motion.span
                        className={styles.icon}
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: premiumEase }}
                        aria-hidden="true"
                      >
                        +
                      </motion.span>
                    </button>
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={questionId}
                      className={styles.answer}
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.2 }
                          : { duration: 0.45, ease: premiumEase }
                      }
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
