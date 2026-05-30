import type { Metadata } from "next";
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
          <span className="section-label">Services</span>
          <h1 className="section-title">Our Services</h1>
          <p>
            From precious metal trading to scrap gold conversion, refining and
            storage — comprehensive services from Dubai Gold Souk.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {services.map((service, i) => (
              <Reveal key={service.id} delay={(i % 3) + 1}>
                <article id={service.id} className={styles.card}>
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                  <Link href="/contact" className={styles.link}>
                    Contact Us →
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
