"use client";

import { useState } from "react";

import { faqItems } from "@/data/site";
import Reveal from "@/components/UI/Reveal";

import styles from "./FAQ.module.css";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

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
            {faqItems.map((item, i) => (
              <Reveal key={item.question} delay={(i % 3) + 1}>
                <div
                  className={`${styles.item} ${open === i ? styles.open : ""}`}
                >
                  <button
                    className={styles.question}
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                  >
                    {item.question}
                    <span className={styles.icon}>{open === i ? "−" : "+"}</span>
                  </button>
                  <div className={styles.answer}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
