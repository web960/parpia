import Reveal from "@/components/UI/Reveal";

import styles from "./TrustedBy.module.css";

const partners = [
  "PAMP Suisse",
  "Valcambi Suisse",
  "Credit Suisse",
  "LBMA Good Delivery",
  "999.9 Fine Gold",
  "Dubai Gold Souk",
];

export default function TrustedBy() {
  return (
    <section className={styles.section} aria-label="Trusted standards and refinery partners">
      <div className="container">
        <Reveal>
          <p className={styles.label}>
            Trusted standards &amp; world-class refinery partners
          </p>
        </Reveal>
        <Reveal delay={1}>
          <ul className={styles.row}>
            {partners.map((name) => (
              <li key={name} className={styles.item}>
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
