"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { investmentPillars } from "@/data/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";
import { cardHover, premiumEase } from "@/lib/motion";

import styles from "./InvestmentPillars.module.css";

export default function InvestmentPillars() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Why Parpia Gold"
            title={
              <>
                Built for Serious <span className="gold-text">Investors</span>
              </>
            }
            description="Institutional-grade standards with the personal service of Dubai's Gold Souk."
          />
        </Reveal>

        <div className={styles.grid}>
          {investmentPillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i + 1}>
              <motion.article
                className={styles.card}
                whileHover={cardHover}
                transition={{ duration: 0.45, ease: premiumEase }}
              >
                <div className={styles.imageWrap}>
                  <motion.div
                    className={styles.imageMotion}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.7, ease: premiumEase }}
                  >
                    <Image
                      src={pillar.image}
                      alt={pillar.credit}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.image}
                    />
                  </motion.div>
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.body}>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
