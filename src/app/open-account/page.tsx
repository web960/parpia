import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/UI/Reveal";
import { accountForms, openAccountInstructions } from "@/data/openAccount";
import { siteConfig } from "@/data/site";

import styles from "./open-account.module.css";

export const metadata: Metadata = {
  title: "Open Account",
  description:
    "Download account opening forms and trading agreements to start trading with Parpia Gold.",
};

export default function OpenAccountPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Account Opening</span>
          <h1 className="section-title">Open Account</h1>
          <p>{openAccountInstructions}</p>
          <a href={`mailto:${siteConfig.email}`} className={styles.email}>
            {siteConfig.email}
          </a>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            {accountForms.map((form, i) => (
              <Reveal key={form.id} delay={(i % 4) + 1}>
                <article className={styles.card}>
                  <div className={styles.icon} aria-hidden>
                    PDF
                  </div>
                  <h2>{form.title}</h2>
                  <p>{form.description}</p>
                  <a
                    href={form.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    Download PDF
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className={styles.footer}>
              <p>
                After completing the forms, email them to{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
                or contact us if you need assistance.
              </p>
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
