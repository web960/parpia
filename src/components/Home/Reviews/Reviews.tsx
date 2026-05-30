import { reviews } from "@/data/site";
import Reveal from "@/components/UI/Reveal";

import styles from "./Reviews.module.css";

export default function Reviews() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <div className={styles.header}>
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">Latest Verified Reviews</h2>
          </div>
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
