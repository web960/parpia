import type { Transition, Variants } from "framer-motion";

/** Luxury ease — slow deceleration, no bounce */
export const premiumEase = [0.22, 1, 0.36, 1] as const;

export const premiumTransition: Transition = {
  duration: 0.85,
  ease: premiumEase,
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: premiumTransition,
  },
};

export const cardHover = {
  y: -8,
  boxShadow: "0 8px 32px rgba(201, 162, 39, 0.18)",
  transition: { duration: 0.45, ease: premiumEase },
};

export const reducedFadeUp: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function revealTransition(delay = 0): Transition {
  return {
    ...premiumTransition,
    delay: delay * 0.12,
  };
}
