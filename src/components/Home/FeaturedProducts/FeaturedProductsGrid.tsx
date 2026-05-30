"use client";

import Link from "next/link";
import { useState } from "react";

import type { Product } from "@/types/product";
import ProductCard from "@/components/Products/ProductCard";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";

import styles from "./FeaturedProducts.module.css";

type Filter = "all" | "investment" | "kilo" | "coins";

type FeaturedProductsGridProps = {
  products: Product[];
};

export default function FeaturedProductsGrid({
  products,
}: FeaturedProductsGridProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = products.filter((p) => {
    if (filter === "all") return true;
    if (filter === "investment") return p.category === "investment";
    if (filter === "kilo") return p.category === "kilo" || p.category === "tola";
    if (filter === "coins")
      return p.category === "gold-coin" || p.category === "silver-coin";
    return true;
  });

  return (
    <section className={styles.section}>
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Featured"
            title="Our Products"
            description="Contact us for live pricing on all bullions, coins and bars."
          />
        </Reveal>

        <Reveal delay={1}>
          <div className={styles.filters}>
            {(
              [
                ["all", "All Products"],
                ["investment", "Investment Bars"],
                ["kilo", "Kilo & Tola"],
                ["coins", "Coins"],
              ] as const
            ).map(([f, label]) => (
              <button
                key={f}
                className={`${styles.filterBtn} ${filter === f ? styles.active : ""}`}
                onClick={() => setFilter(f)}
              >
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <div className={styles.grid}>
          {filtered.map((product, i) => (
            <Reveal key={product.id} delay={(i % 4) + 1}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className={styles.cta}>
            <Link href="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
