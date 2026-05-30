"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { navLinks, siteConfig } from "@/data/site";

import CartButton from "./CartButton";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <Image
            src={siteConfig.logo}
            alt={siteConfig.legalName}
            width={180}
            height={52}
            className={styles.logoImg}
            priority
          />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li
                key={link.href}
                className={styles.navItem}
                onMouseEnter={() =>
                  link.children && setOpenDropdown(link.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                  {link.children && (
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                    </svg>
                  )}
                </Link>
                {link.children && openDropdown === link.label && (
                  <ul className={styles.dropdown}>
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className={styles.dropdownLink}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <CartButton />
          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
            className={styles.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <Link href="/contact" className="btn btn-primary">
            Contact Us
          </Link>
          <button
            className={`${styles.menuBtn} ${menuOpen ? styles.menuOpen : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <ul className={styles.mobileSub}>
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.mobileCta}>
          <a
            href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
            className="btn btn-outline"
          >
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
