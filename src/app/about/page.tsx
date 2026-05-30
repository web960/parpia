import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";
import { aboutPage, siteConfig, stats } from "@/data/site";

import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${siteConfig.legalName} — UAE precious metals trading in Dubai Gold Souk.`,
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <span className="section-label">About Us</span>
            <h1 className={styles.heroTitle}>
              A trusted name in Dubai&apos;s{" "}
              <span className="gold-text">Gold Souk</span>
            </h1>
            <p className={styles.heroText}>
              {siteConfig.legalName} is a UAE based company operating across the
              markets of Africa, Asia and Europe — trading gold, precious metals,
              stones and pearls from the heart of Deira.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="container">
          <div className={styles.split}>
            <Reveal>
              <div className={styles.splitBody}>
                <span className="section-label">Who We Are</span>
                <h2 className={styles.splitTitle}>
                  Expertise in gold like none other
                </h2>
                <p>
                  {siteConfig.legalName} operates dynamically across the buying
                  and selling of gold bars, pearls and precious stones, alongside
                  a dedicated scrap trading desk. Our location bridges East and
                  West — Dubai has played a dominant role in the international
                  gold market for centuries.
                </p>
                <p>
                  We provide competitive pricing and reliable service, the
                  reason our customers return to us day after day.
                </p>
                <div className={styles.heroActions}>
                  <Link href="/services" className="btn btn-outline">
                    Our Services
                  </Link>
                  <Link href="/products" className="btn btn-primary">
                    View Products
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className={styles.media}>
                <Image
                  src={aboutPage.intro.image}
                  alt={aboutPage.intro.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.mediaImg}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className="container">
          <Reveal>
            <ul className={styles.stats}>
              {stats.map((stat) => (
                <li key={stat.label} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={styles.highlights}>
        <div className="container">
          <Reveal>
            <SectionHeading
              index="01"
              eyebrow="Why Parpia Gold"
              title={
                <>
                  Built on trust, <span className="gold-text">location</span> and
                  craft
                </>
              }
              description="Three pillars that make us a dependable partner for serious buyers and sellers."
            />
          </Reveal>
          <div className={styles.hlGrid}>
            {aboutPage.highlights.map((item, i) => (
              <Reveal key={item.title} delay={i + 1}>
                <article className={styles.hlCard}>
                  <span className={styles.hlIndex}>0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.intro}>
        <div className="container">
          <div className={`${styles.split} ${styles.reverse}`}>
            <Reveal>
              <div className={styles.media}>
                <Image
                  src={aboutPage.location.image}
                  alt={aboutPage.location.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  className={styles.mediaImg}
                />
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className={styles.splitBody}>
                <span className="section-label">Our Location</span>
                <h2 className={styles.splitTitle}>
                  At the crossroads of the gold trade
                </h2>
                <p>
                  Our office sits steps from the world&apos;s most renowned gold
                  trading district, giving us a unique advantage between the
                  markets of East and West.
                </p>
                <address className={styles.address}>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.country}
                </address>
                <p className={styles.hours}>{siteConfig.hours}</p>
                <Link href="/contact" className="btn btn-outline">
                  Get Directions
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.values}>
        <div className="container">
          <Reveal>
            <SectionHeading
              index="02"
              eyebrow="What We Do"
              title={
                <>
                  A full <span className="gold-text">precious metals</span> desk
                </>
              }
              description="From the trading floor to secure storage — everything under one roof."
            />
          </Reveal>
          <Reveal delay={1}>
            <ul className={styles.valueList}>
              {aboutPage.values.map((value) => (
                <li key={value} className={styles.valueChip}>
                  {value}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className="container">
          <Reveal>
            <div className={styles.cta}>
              <h2>Ready to trade with confidence?</h2>
              <p>
                Speak with our desk for live pricing on bullion, coins, scrap and
                precious stones.
              </p>
              <div className={styles.ctaActions}>
                <Link href="/contact" className="btn btn-primary">
                  Contact Us
                </Link>
                <Link href="/open-account" className="btn btn-outline">
                  Open an Account
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
