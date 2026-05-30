"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { brandShowcases } from "@/data/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";

import styles from "./BrandShowcase.module.css";

export default function BrandShowcase() {
  const [active, setActive] = useState(0);
  const brand = brandShowcases[active];

  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Refinery Partners"
            title="World-Class Bullion"
            description="LBMA-accredited refineries trusted by central banks and private investors worldwide."
          />
        </Reveal>

        <div className={styles.layout}>
          <Reveal delay={1}>
            <div className={styles.tabs}>
              {brandShowcases.map((b, i) => (
                <button
                  key={b.id}
                  className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.tabNum}>0{i + 1}</span>
                  {b.title}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className={styles.panel} key={brand.id}>
              <div className={styles.panelContent}>
                <span className={styles.subtitle}>{brand.subtitle}</span>
                <h3>{brand.title}</h3>
                <p>{brand.description}</p>
                <Link href={brand.href} className="btn btn-outline">
                  Explore Collection
                </Link>
              </div>
              <div className={styles.panelVisual}>
                <Image
                  src={brand.image}
                  alt={brand.title}
                  width={320}
                  height={320}
                  className={styles.productImage}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
