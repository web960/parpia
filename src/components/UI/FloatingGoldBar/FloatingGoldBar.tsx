"use client";

import { useEffect, useState, type ComponentType } from "react";

import styles from "./FloatingGoldBar.module.css";

type GoldBarViewerComponent = ComponentType;

export default function FloatingGoldBar() {
  const [Viewer, setViewer] = useState<GoldBarViewerComponent | null>(null);

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
    <div className={styles.wrapper} aria-hidden>
      <div className={styles.glow} />
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
    </div>
  );
}
