"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { navLinks, siteConfig } from "@/data/site";
import { premiumEase, springTransition } from "@/lib/motion";

import CartButton from "./CartButton";
import styles from "./Header.module.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
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
        </motion.div>

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
                    <motion.svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="currentColor"
                      aria-hidden
                      animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: premiumEase }}
                    >
                      <path
                        d="M1 1l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </motion.svg>
                  )}
                </Link>
                <AnimatePresence>
                  {link.children && openDropdown === link.label && (
                    <motion.ul
                      className={styles.dropdown}
                      style={{ x: "-50%" }}
                      initial={
                        prefersReducedMotion
                          ? { opacity: 0, x: "-50%" }
                          : { opacity: 0, y: -10, scale: 0.96, x: "-50%" }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0, x: "-50%" }
                          : { opacity: 0, y: -8, scale: 0.96, x: "-50%" }
                      }
                      transition={{ duration: 0.28, ease: premiumEase }}
                    >
                      {link.children.map((child, i) => (
                        <motion.li
                          key={child.href}
                          initial={
                            prefersReducedMotion ? false : { opacity: 0, x: -8 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.25 }}
                        >
                          <Link href={child.href} className={styles.dropdownLink}>
                            {child.label}
                          </Link>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
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
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <Link href="/contact" className="btn btn-primary">
              Contact Us
            </Link>
          </motion.div>
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

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            aria-hidden={false}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { x: "100%", opacity: 0.5 }
            }
            animate={{ x: 0, opacity: 1 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { x: "100%", opacity: 0.5 }
            }
            transition={prefersReducedMotion ? { duration: 0.2 } : springTransition}
          >
            <nav aria-label="Mobile navigation">
              <ul>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, x: 24 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, ease: premiumEase }}
                  >
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
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className={styles.mobileCta}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, ease: premiumEase }}
            >
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="btn btn-outline"
              >
                Call {siteConfig.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
