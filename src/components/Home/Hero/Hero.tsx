"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { heroSlides } from "@/data/site";
import FloatingGoldBar from "@/components/UI/FloatingGoldBar/FloatingGoldBar";
import {
  premiumEase,
  premiumTransition,
  staggerContainer,
  staggerItem,
} from "@/lib/motion";

import styles from "./Hero.module.css";

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const next = useCallback(() => {
    setActive((i) => (i + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused, prefersReducedMotion]);

  const slide = heroSlides[active];

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured collections"
    >
      <motion.div
        className={styles.bgMesh}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: premiumEase }}
      />
      <div className={styles.bgGrid} />
      <motion.div
        className={styles.bgOrb1}
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, 20, 0], y: [0, -15, 0] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={styles.bgOrb2}
        animate={
          prefersReducedMotion
            ? undefined
            : { x: [0, -15, 0], y: [0, 12, 0] }
        }
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className={`container ${styles.layout}`}>
        <div className={styles.left}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.text}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -16, filter: "blur(6px)" }
              }
              transition={{ duration: 0.35, ease: premiumEase }}
            >
              <motion.span className={styles.eyebrow} variants={staggerItem}>
                <span className={styles.eyebrowDot} />
                {slide.eyebrow}
              </motion.span>
              <motion.h1 className={styles.title} variants={staggerItem}>
                <span className="gold-text">{slide.title}</span>
              </motion.h1>
              <motion.p className={styles.subtitle} variants={staggerItem}>
                {slide.subtitle}
              </motion.p>
              <motion.div className={styles.ctas} variants={staggerItem}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: premiumEase }}
                >
                  <Link href={slide.href} className="btn btn-primary">
                    {slide.cta}
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.25, ease: premiumEase }}
                >
                  <Link href="/contact" className="btn btn-ghost">
                    Contact Us
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className={styles.controls}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...premiumTransition, delay: 0.6 }}
          >
            <div className={styles.dots}>
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  className={styles.dot}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active ? "true" : undefined}
                >
                  <motion.span
                    className={styles.dotFill}
                    animate={{
                      width: i === active ? 52 : 36,
                      opacity: i === active ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                  />
                </button>
              ))}
            </div>
            <div className={styles.arrows}>
              <motion.button
                onClick={() =>
                  setActive(
                    (i) => (i - 1 + heroSlides.length) % heroSlides.length,
                  )
                }
                aria-label="Previous slide"
                whileHover={{ scale: 1.08, borderColor: "rgba(201, 162, 39, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.button>
              <motion.button
                onClick={next}
                aria-label="Next slide"
                whileHover={{ scale: 1.08, borderColor: "rgba(201, 162, 39, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ ...premiumTransition, delay: 0.25, duration: 1.1 }}
        >
          <FloatingGoldBar />
          <motion.div
            className={styles.trustStrip}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...premiumTransition, delay: 0.85 }}
          >
            <span>999.9 Fine Gold</span>
            <span className={styles.trustDivider} />
            <span>LBMA Standard</span>
            <span className={styles.trustDivider} />
            <span>Dubai Gold Souk</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
