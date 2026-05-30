"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { heritageImage, siteConfig } from "@/data/site";
import Reveal from "@/components/UI/Reveal";
import { premiumEase } from "@/lib/motion";

import styles from "./Heritage.module.css";

export default function Heritage() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          <Reveal>
            <motion.div
              className={styles.imageBlock}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.6, ease: premiumEase }}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={heritageImage.src}
                  alt={heritageImage.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.yearBlock}>
                <span className={styles.est}>Parpia Gold and Jewels</span>
                <span className={styles.year}>Trading LLC</span>
                <span className={styles.in}>Dubai Gold Souk</span>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={2}>
            <div className={styles.content}>
              <span className="section-label">About Us</span>
              <h2 className="section-title">
                Expertise in Gold &amp; Precious Metals
              </h2>
              <p>
                {siteConfig.legalName} is a UAE based company that operates in
                the markets of Africa, Asia and Europe. Based in the heart of UAE,
                our expertise in dealing with gold and other precious metals is
                like none other.
              </p>
              <p>
                The company&apos;s dynamic activity on buying and selling gold
                bars as well as pearls &amp; precious stones along with scrap
                trading. We provide our customers with competitive prices and
                reliable services.
              </p>
              <Link href="/about" className="btn btn-outline">
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
