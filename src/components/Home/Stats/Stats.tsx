"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { stats } from "@/data/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";

import styles from "./Stats.module.css";

/**
 * Only values shaped as a leading number with an optional trailing suffix
 * (e.g. "999.9", "49", "120+", "24K") can be counted up. Values like "24/7"
 * have a non-numeric character mid-string and must render verbatim.
 */
function parseAnimatable(value: string) {
  const match = value.match(/^(\d+(?:\.\d+)?)([^\d]*)$/);
  if (!match) return null;
  return {
    target: parseFloat(match[1]),
    suffix: match[2],
    decimals: match[1].includes(".") ? match[1].split(".")[1].length : 0,
  };
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const parsed = useMemo(() => parseAnimatable(value), [value]);
  const [display, setDisplay] = useState(parsed ? "0" : value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parsed) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const { target, suffix, decimals } = parsed;

    const format = (n: number) =>
      (decimals > 0
        ? n.toFixed(decimals)
        : Math.floor(n).toLocaleString()) + suffix;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          if (prefersReducedMotion) {
            setDisplay(format(target));
            return;
          }

          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(format(target * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed]);

  return (
    <span ref={ref} className={styles.number}>
      {display}
    </span>
  );
}

export default function Stats() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal className={styles.headerReveal}>
          <SectionHeading
            index="03"
            eyebrow="Trust & Scale"
            title="Elevate Your Gold Investment"
            description="A refined buying experience with purity assurance and transparent pricing."
          />
        </Reveal>

        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i + 1}>
              <div className={styles.stat}>
                <AnimatedNumber value={stat.value} />
                <span className={styles.label}>{stat.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
