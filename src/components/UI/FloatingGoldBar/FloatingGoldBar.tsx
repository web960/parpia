"use client";

import { useEffect, useState, type ComponentType } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { premiumEase } from "@/lib/motion";

import styles from "./FloatingGoldBar.module.css";

type GoldBarViewerComponent = ComponentType;

export default function FloatingGoldBar() {
  const [Viewer, setViewer] = useState<GoldBarViewerComponent | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let active = true;

    import("./GoldBarViewer").then((mod) => {
      if (active) setViewer(() => mod.default);
    });

    return () => {
      active = false;
    };
  }, []);

  return (
    <motion.div
      className={styles.wrapper}
      aria-hidden
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: premiumEase, delay: 0.2 }}
    >
      <motion.div
        className={styles.glow}
        animate={
          prefersReducedMotion
            ? undefined
            : { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className={styles.rings}>
        <span className={styles.ring} />
        <span className={styles.ring2} />
      </div>
      <div className={styles.canvasWrap}>
        {Viewer ? <Viewer /> : <div className={styles.loader} />}
      </div>
      <div className={styles.reflection} />
      <div className={styles.sparkles}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={styles.sparkle}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
      </div>
    </motion.div>
  );
}
