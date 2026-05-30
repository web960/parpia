import type { Metadata } from "next";

import Reveal from "@/components/UI/Reveal";
import { siteConfig } from "@/data/site";

import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} for gold bar pricing, UAE delivery, and showroom visits.`,
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Contact</span>
          <h1 className="section-title">Get In Touch</h1>
          <p>
            Visit our Gold Souk showroom or reach out for real-time pricing and
            private client services.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <Reveal>
              <div className={styles.info}>
                <div className={styles.item}>
                  <h3>Office</h3>
                  <p>
                    {siteConfig.address.line1}
                    <br />
                    {siteConfig.address.line2}
                    <br />
                    {siteConfig.address.city}, {siteConfig.address.country}
                  </p>
                </div>
                <div className={styles.item}>
                  <h3>Phone</h3>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                    {siteConfig.phone}
                  </a>
                </div>
                <div className={styles.item}>
                  <h3>WhatsApp</h3>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {siteConfig.whatsapp}
                  </a>
                </div>
                <div className={styles.item}>
                  <h3>Email</h3>
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                </div>
                <div className={styles.item}>
                  <h3>Hours</h3>
                  <p>{siteConfig.hours}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <form className={styles.form}>
                <h2>Send a Message</h2>
                <div className={styles.field}>
                  <label htmlFor="name">Name</label>
                  <input id="name" type="text" placeholder="Your name" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className={styles.field}>
                  <label htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" placeholder="+971 ..." />
                </div>
                <div className={styles.field}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your inquiry..."
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
