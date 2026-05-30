import type { Metadata } from "next";
import Link from "next/link";

import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";
import { accountForms, openAccountInstructions } from "@/data/openAccount";
import { siteConfig } from "@/data/site";

import styles from "./open-account.module.css";

export const metadata: Metadata = {
  title: "Open Account",
  description:
    "Download account opening forms and trading agreements to start trading with Parpia Gold.",
};

const steps = [
  {
    title: "Download the forms",
    description:
      "Grab the account opening form, trading agreement and any documents listed below.",
  },
  {
    title: "Complete & sign",
    description:
      "Fill in your details and attach the supporting documents requested on each form.",
  },
  {
    title: "Send to us",
    description: (
      <>
        Email the completed forms to{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
      </>
    ),
  },
  {
    title: "Start trading",
    description:
      "Once verified, our desk activates your account and shares live pricing.",
  },
];

export default function OpenAccountPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <span className="section-label">Account Opening</span>
            <h1 className={styles.heroTitle}>
              Open an <span className="gold-text">account</span>
            </h1>
            <p className={styles.heroText}>{openAccountInstructions}</p>
            <a href={`mailto:${siteConfig.email}`} className={styles.email}>
              {siteConfig.email}
            </a>
          </Reveal>
        </div>
      </section>

      <section className={styles.steps}>
        <div className="container">
          <ol className={styles.stepGrid}>
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={(i % 4) + 1}>
                <li className={styles.step}>
                  <span className={styles.stepNum}>{`0${i + 1}`}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Documents"
              title="Forms & agreements"
              description="Download, complete and return the documents below to open your account."
            />
          </Reveal>
          <div className={styles.grid}>
            {accountForms.map((form, i) => (
              <Reveal key={form.id} delay={(i % 4) + 1}>
                <article className={styles.card}>
                  <div className={styles.icon} aria-hidden="true">
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                  </div>
                  <div className={styles.cardBody}>
                    <h2>{form.title}</h2>
                    <p>{form.description}</p>
                  </div>
                  <a
                    href={form.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.download}
                  >
                    Download PDF
                    <span aria-hidden="true">↓</span>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className={styles.footer}>
              <h2>Need a hand?</h2>
              <p>
                After completing the forms, email them to{" "}
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or
                contact us and our team will guide you through the process.
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
