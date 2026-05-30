import type { Metadata } from "next";
import Link from "next/link";

import styles from "./not-found.module.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404 Not Found",
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/404-not-found/`,
    },
  };
}

export default function NotFound() {
  return (
    <section className={styles.wrap}>
      <div className="container">
        <span className="section-label" style={{ justifyContent: "center" }}>
          Error 404
        </span>
        <p className={`gold-text ${styles.code}`}>404</p>
        <h1 className={`section-title ${styles.title}`}>Page not found</h1>
        <p className={styles.text}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back to something valuable.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link href="/products" className="btn btn-outline">
            Browse Products
          </Link>
        </div>
      </div>
    </section>
  );
}
