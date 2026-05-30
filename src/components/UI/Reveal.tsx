"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  fadeUp,
  premiumTransition,
  reducedFadeUp,
  revealTransition,
} from "@/lib/motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Stagger children on reveal */
  stagger?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  stagger = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedFadeUp : fadeUp;

  if (stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px 0px -40px 0px", amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay * 0.12,
            },
          },
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px -40px 0px", amount: 0.15 }}
      variants={variants}
      transition={
        prefersReducedMotion
          ? { duration: 0.3, delay: delay * 0.08 }
          : revealTransition(delay)
      }
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={prefersReducedMotion ? reducedFadeUp : fadeUp}
      transition={premiumTransition}
    >
      {children}
    </motion.div>
  );
}
