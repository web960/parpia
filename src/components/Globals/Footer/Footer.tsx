import Image from "next/image";
import Link from "next/link";

import { footerLinks, siteConfig, trustBadges } from "@/data/site";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.trust}>
        <div className="container">
          <ul className={styles.trustList}>
            {trustBadges.map((badge) => (
              <li key={badge}>
                <span className={styles.check}>✓</span>
                {badge}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.main}`}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
              src={siteConfig.logo}
              alt={siteConfig.legalName}
              width={160}
              height={46}
              className={styles.logoImg}
            />
          </Link>
          <p className={styles.desc}>{siteConfig.description}</p>
          <div className={styles.contact}>
            <p>{siteConfig.address.line1}</p>
            <p>{siteConfig.address.line2}</p>
            <p>
              {siteConfig.address.city}, {siteConfig.address.country}
            </p>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
              {siteConfig.phone}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp: {siteConfig.whatsapp}
            </a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </div>

        <div className={styles.links}>
          <div>
            <h3>Products</h3>
            <ul>
              {footerLinks.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Legal</h3>
            <ul>
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className={styles.disclaimer}>{siteConfig.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
