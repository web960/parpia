"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { showroomBanner } from "@/data/site";
import { premiumEase, premiumTransition, staggerContainer, staggerItem } from "@/lib/motion";

import styles from "./ShowroomBanner.module.css";

export default function ShowroomBanner() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.72, 0.55]);

  return (
    <section ref={ref} className={styles.section} aria-label="Dubai showroom">
      <motion.div className={styles.imageWrap} style={{ y: prefersReducedMotion ? 0 : imageY }}>
        <Image
          src={showroomBanner.image}
          alt={showroomBanner.credit}
          fill
          sizes="100vw"
          className={styles.image}
          priority={false}
        />
      </motion.div>
      <motion.div
        className={styles.overlay}
        style={{ opacity: prefersReducedMotion ? 0.7 : overlayOpacity }}
      />

      <div className={`container ${styles.content}`}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.span className={styles.eyebrow} variants={staggerItem}>
            {showroomBanner.eyebrow}
          </motion.span>
          <motion.h2 className={styles.title} variants={staggerItem}>
            {showroomBanner.title}
          </motion.h2>
          <motion.p className={styles.subtitle} variants={staggerItem}>
            {showroomBanner.subtitle}
          </motion.p>
          <motion.div variants={staggerItem}>
            <motion.div
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25, ease: premiumEase }}
            >
              <Link href={showroomBanner.href} className="btn btn-primary">
                {showroomBanner.cta}
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className={styles.credit}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ ...premiumTransition, delay: 0.4 }}
      >
        Photo · Unsplash
      </motion.div>
    </section>
  );
}
