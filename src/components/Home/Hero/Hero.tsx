"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { heroSlides } from "@/data/site";
import FloatingGoldBar from "@/components/UI/FloatingGoldBar/FloatingGoldBar";

import styles from "./Hero.module.css";

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, paused]);

  const slide = heroSlides[active];

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured collections"
    >
      <div className={styles.bgMesh} />
      <div className={styles.bgGrid} />
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className={`container ${styles.layout}`}>
        <div className={styles.left}>
          <div className={styles.text} key={active}>
            <span className={styles.eyebrow}>
              <span className={styles.eyebrowDot} />
              {slide.eyebrow}
            </span>
            <h1 className={styles.title}>
              <span className="gold-text">{slide.title}</span>
            </h1>
            <p className={styles.subtitle}>{slide.subtitle}</p>
            <div className={styles.ctas}>
              <Link href={slide.href} className="btn btn-primary">
                {slide.cta}
                <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact Us
              </Link>
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.dots}>
              {heroSlides.map((s, i) => (
                <button
                  key={s.id}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <div className={styles.arrows}>
              <button
                onClick={() =>
                  setActive(
                    (i) => (i - 1 + heroSlides.length) % heroSlides.length,
                  )
                }
                aria-label="Previous slide"
              >
                ←
              </button>
              <button onClick={next} aria-label="Next slide">
                →
              </button>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <FloatingGoldBar />
          <div className={styles.trustStrip}>
            <span>999.9 Fine Gold</span>
            <span className={styles.trustDivider} />
            <span>LBMA Standard</span>
            <span className={styles.trustDivider} />
            <span>Dubai Gold Souk</span>
          </div>
        </div>
      </div>
    </section>
  );
}
