import Link from "next/link";

import { categories } from "@/data/site";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";

import CategoryCard from "./CategoryCard";
import styles from "./Categories.module.css";

export default function Categories() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <SectionHeading
            index="01"
            eyebrow="Our Products"
            title="Shop by Category"
            description="From investment-grade kilo bars to collectible coins — explore the vault by what you're looking for."
            action={
              <Link href="/products" className="btn btn-outline">
                View All Products
              </Link>
            }
          />
        </Reveal>

        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <Reveal key={cat.href} delay={i + 1}>
              <CategoryCard
                href={cat.href}
                title={cat.title}
                description={cat.description}
                image={cat.image}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
