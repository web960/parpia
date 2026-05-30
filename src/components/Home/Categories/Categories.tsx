import Image from "next/image";
import Link from "next/link";

import { categories } from "@/data/site";
import Reveal from "@/components/UI/Reveal";

import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <span className="section-label">Our Products</span>
            <h2 className="section-title">Shop by Category</h2>
            <div className="gold-divider" />
          </div>
        </Reveal>

        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <Reveal key={cat.href} delay={i + 1}>
              <Link href={cat.href} className={styles.card}>
                <div className={styles.imageWrap}>
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay} />
                </div>
                <div className={styles.cardBody}>
                  <h3>{cat.title}</h3>
                  <p>{cat.description}</p>
                  <span className={styles.arrow}>Explore →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
