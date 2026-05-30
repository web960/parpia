import type { Metadata } from "next";
import Link from "next/link";

import { productCategories } from "@/data/products";
import ProductCard from "@/components/Products/ProductCard";
import Reveal from "@/components/UI/Reveal";
import { getProductCount, getProducts } from "@/lib/woocommerce/products";

import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse kilo bars, tola bars, investment bars (PAMP, Valcambi, Credit Suisse), gold and silver coins from Parpia Gold.",
};

export const revalidate = 3600;

export default async function ProductsPage() {
  const [products, productCount] = await Promise.all([
    getProducts(),
    getProductCount(),
  ]);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Products</span>
          <h1 className="section-title">Bullions, Bars &amp; Coins</h1>
          <p>
            {productCount} gold and silver products — kilo bars, tola bars,
            investment bars and coins. Contact us for live pricing.
          </p>
        </div>
      </section>

      <section className={styles.categories}>
        <div className="container">
          <div className={styles.catGrid}>
            {productCategories.map((cat) => (
              <Link key={cat.id} href={cat.href} className={styles.catCard}>
                <h2>{cat.title}</h2>
                <p>{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.allProducts}>
        <div className="container">
          <h2 className={styles.sectionHeading}>All Products</h2>
          {products.length > 0 ? (
            <div className={styles.grid}>
              {products.map((product, i) => (
                <Reveal key={product.id} delay={(i % 4) + 1}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon} aria-hidden="true">
                ◇
              </span>
              <h3>No products available right now</h3>
              <p>
                Our inventory updates frequently. Contact us directly for current
                stock and live pricing.
              </p>
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
