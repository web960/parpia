import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { services, siteConfig } from "@/data/site";
import Reveal from "@/components/UI/Reveal";

import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: `${siteConfig.legalName} — precious metal trading, scrap gold, refining, storage and dealing services in Dubai.`,
};

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <span className="section-label">Services</span>
            <h1 className={styles.heroTitle}>
              Everything for the <span className="gold-text">precious metals</span>{" "}
              trade
            </h1>
            <p className={styles.heroText}>
              From precious metal trading to scrap gold conversion, refining and
              secure storage — a complete desk operating from the Dubai Gold Souk.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) + 1}>
                <article id={service.id} className={styles.card}>
                  <div className={styles.media}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
                      className={styles.mediaImg}
                    />
                    <span className={styles.badge}>{`0${i + 1}`}</span>
                  </div>
                  <div className={styles.body}>
                    <h2>{service.title}</h2>
                    <p className={styles.summary}>{service.summary}</p>
                    <p className={styles.desc}>{service.description}</p>
                    <Link href="/contact" className={styles.link}>
                      Enquire Now
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <Reveal>
            <div className={styles.cta}>
              <h2>Tell us what you&apos;re trading</h2>
              <p>
                Get live pricing and a tailored quote for bullion, coins, scrap
                or precious stones from our Gold Souk desk.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className="btn btn-primary">
                  Contact Us
                </Link>
                <Link href="/products" className="btn btn-outline">
                  Browse Products
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
