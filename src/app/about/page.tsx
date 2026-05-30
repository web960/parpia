import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/UI/Reveal";
import { siteConfig } from "@/data/site";

import styles from "../about/about.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${siteConfig.legalName} — UAE precious metals trading in Dubai Gold Souk.`,
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">About Us</span>
          <h1 className="section-title">{siteConfig.legalName}</h1>
          <p>
            A UAE based company operating in the markets of Africa, Asia and
            Europe from the heart of Dubai Gold Souk.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <Reveal>
              <div className={styles.block}>
                <h2>Who We Are</h2>
                <p>
                  {siteConfig.legalName} is a UAE based company that operates in
                  the markets of Africa, Asia and Europe. Based in the heart of
                  UAE our expertise in dealing with gold and other precious metals
                  is like none other.
                </p>
                <p>
                  The company&apos;s dynamic activity on buying and selling gold
                  bars as well as pearls &amp; precious stones along with scrap
                  trading. We provide our customers with a competitive price and
                  reliable services making them use our services daily.
                </p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className={styles.block}>
                <h2>Our Location</h2>
                <p>
                  The location has given us the advantage between East and West
                  as Dubai has played the dominant role for centuries in the
                  international gold market.
                </p>
                <p>
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.country}
                </p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className={styles.block}>
                <h2>Our Services</h2>
                <ul className={styles.list}>
                  <li>Precious metal trading</li>
                  <li>Precious stones &amp; Pearl trading</li>
                  <li>Scrap Gold &amp; Silver trading</li>
                  <li>Dealing</li>
                  <li>Refining</li>
                  <li>Storage</li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className={styles.cta}>
              <Link href="/services" className="btn btn-outline">
                View Services
              </Link>
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
