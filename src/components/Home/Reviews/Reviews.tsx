import { reviews } from "@/data/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";

import styles from "./Reviews.module.css";

export default function Reviews() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="Testimonials"
            title="Latest Verified Reviews"
            description="Real feedback from investors and collectors who buy with us at the Dubai Gold Souk."
          />
        </Reveal>

        <div className={styles.grid}>
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i + 1}>
              <blockquote className={styles.card}>
                <div className={styles.stars}>
                  {"★".repeat(review.rating)}
                </div>
                <p>&ldquo;{review.text}&rdquo;</p>
                <footer>
                  <div className={styles.avatar}>
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <cite>{review.name}</cite>
                    <span>{review.date}</span>
                  </div>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
