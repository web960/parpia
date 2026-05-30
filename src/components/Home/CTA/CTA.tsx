import Link from "next/link";

import { siteConfig } from "@/data/site";
import Reveal from "@/components/UI/Reveal";

import styles from "./CTA.module.css";

export default function CTA() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <div className={styles.inner}>
            <div className={styles.content}>
              <span className="section-label">Get Started</span>
              <h2 className="section-title">
                Ready to Invest in{" "}
                <span className="gold-text">Physical Gold?</span>
              </h2>
              <p>
                Visit our Gold Souk showroom or contact us for real-time pricing,
                private UAE delivery, and expert guidance.
              </p>
            </div>
            <div className={styles.actions}>
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className={styles.phone}
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
