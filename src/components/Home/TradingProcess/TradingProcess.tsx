"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { tradingProcess } from "@/data/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";
import { premiumEase } from "@/lib/motion";

import styles from "./TradingProcess.module.css";

export default function TradingProcess() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="How It Works"
            title="Your Path to Physical Gold"
            description="A straightforward, transparent process from first inquiry to secure delivery."
          />
        </Reveal>

        <div className={styles.grid}>
          {tradingProcess.map((step, i) => (
            <Reveal key={step.step} delay={i + 1}>
              <motion.article
                className={styles.card}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4, ease: premiumEase }}
              >
                <div className={styles.imageWrap}>
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay} />
                  <span className={styles.step}>{step.step}</span>
                </div>
                <div className={styles.body}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={2}>
          <div className={styles.footer}>
            <Link href="/open-account" className="btn btn-outline">
              Open an Account
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Speak to an Advisor
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
