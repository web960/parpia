"use client";

import { useEffect, useRef, useState } from "react";

import { stats } from "@/data/site";
import Reveal from "@/components/UI/Reveal";

import styles from "./Stats.module.css";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const numericPart = parseFloat(value.replace(/[^0-9.]/g, ""));
          const suffix = value.replace(/[0-9.]/g, "");
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericPart * eased;

            if (value.includes(".")) {
              setDisplay(current.toFixed(1) + suffix);
            } else if (numericPart >= 1000) {
              setDisplay(Math.floor(current).toLocaleString() + suffix);
            } else {
              setDisplay(Math.floor(current) + suffix);
            }

            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

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
        <Reveal>
          <div className={styles.header}>
            <span className="section-label">Trust & Scale</span>
            <h2 className="section-title">Elevate Your Gold Investment</h2>
            <p className="section-subtitle">
              A refined buying experience with purity assurance and transparent
              pricing.
            </p>
          </div>
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
