"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { cardHover, premiumEase } from "@/lib/motion";

import styles from "./Categories.module.css";

type CategoryCardProps = {
  href: string;
  title: string;
  description: string;
  image: string;
};

export default function CategoryCard({
  href,
  title,
  description,
  image,
}: CategoryCardProps) {
  return (
    <motion.div whileHover={cardHover} transition={{ duration: 0.45, ease: premiumEase }}>
      <Link href={href} className={styles.card}>
        <div className={styles.imageWrap}>
          <motion.div
            className={styles.imageMotion}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7, ease: premiumEase }}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className={styles.image}
            />
          </motion.div>
          <div className={styles.imageOverlay} />
        </div>
        <div className={styles.cardBody}>
          <h3>{title}</h3>
          <p>{description}</p>
          <motion.span
            className={styles.arrow}
            whileHover={{ x: 6 }}
            transition={{ duration: 0.3, ease: premiumEase }}
          >
            Explore →
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}
