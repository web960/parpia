import type { Metadata } from "next";

import Reveal from "@/components/UI/Reveal";
import { siteConfig } from "@/data/site";

import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${siteConfig.name} for gold bar pricing, UAE delivery, and showroom visits.`,
};

const telHref = `tel:${siteConfig.phone.replace(/\s/g, "")}`;
const waHref = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`;
const mapQuery = encodeURIComponent(
  `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.city}`,
);
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&z=16&output=embed`;

const contactDetails = [
  {
    label: "Office",
    value: (
      <>
        {siteConfig.address.line1}
        <br />
        {siteConfig.address.line2}
        <br />
        {siteConfig.address.city}, {siteConfig.address.country}
      </>
    ),
  },
  { label: "Phone", value: siteConfig.phone, href: telHref },
  {
    label: "WhatsApp",
    value: siteConfig.whatsapp,
    href: waHref,
    external: true,
  },
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "Hours", value: siteConfig.hours },
];

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <Reveal>
            <span className="section-label">Contact</span>
            <h1 className={styles.heroTitle}>
              Get in <span className="gold-text">touch</span>
            </h1>
            <p className={styles.heroText}>
              Visit our Gold Souk showroom or reach out for real-time pricing and
              private client services.
            </p>
            <div className={styles.quickActions}>
              <a href={telHref} className="btn btn-primary">
                Call Us
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                WhatsApp
              </a>
              <a href={`mailto:${siteConfig.email}`} className="btn btn-outline">
                Email
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.grid}>
            <Reveal>
              <div className={styles.info}>
                {contactDetails.map((detail) => (
                  <div key={detail.label} className={styles.item}>
                    <h3>{detail.label}</h3>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        {...(detail.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p>{detail.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={2}>
              <form className={styles.form}>
                <h2>Send a Message</h2>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">Name</label>
                    <input id="name" type="text" placeholder="Your name" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" type="tel" placeholder="+971 ..." />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" placeholder="you@example.com" />
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

      <section className={styles.mapSection}>
        <div className="container">
          <Reveal>
            <div className={styles.mapFrame}>
              <iframe
                title={`Map to ${siteConfig.name}`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
