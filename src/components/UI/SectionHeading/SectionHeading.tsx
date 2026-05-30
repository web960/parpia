import type { ReactNode } from "react";

import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional element shown opposite the title (e.g. a "View all" link). Split align only. */
  action?: ReactNode;
  /** Decorative editorial index, e.g. "01". Rendered as an oversized faint numeral. */
  index?: string;
  /** "split" = asymmetric editorial header; "center" = classic stacked. */
  align?: "split" | "center";
  /** Renders the title as an <h1> instead of the default <h2>. */
  as?: "h1" | "h2";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  index,
  align = "split",
  as = "h2",
  className = "",
}: SectionHeadingProps) {
  const Title = as;

  return (
    <div
      className={`${styles.heading} ${styles[align]} ${className}`}
      data-align={align}
    >
      <div className={styles.lead}>
        {index && (
          <span className={styles.index} aria-hidden="true">
            {index}
          </span>
        )}
        <div className={styles.leadText}>
          {eyebrow && <span className="section-label">{eyebrow}</span>}
          <Title className="section-title">{title}</Title>
        </div>
      </div>

      {(description || action) && (
        <div className={styles.aside}>
          {description && <p className={styles.description}>{description}</p>}
          {action && <div className={styles.action}>{action}</div>}
        </div>
      )}
    </div>
  );
}
