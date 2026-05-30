import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { productCategories } from "@/data/products";
import ProductCard from "@/components/Products/ProductCard";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";
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
          <Reveal>
            <span className="section-label">Products</span>
            <h1 className={styles.heroTitle}>
              Bullions, Bars &amp; <span className="gold-text">Coins</span>
            </h1>
            <p className={styles.heroText}>
              {productCount} gold and silver products — kilo bars, tola bars,
              investment bars and coins from world-renowned refiners.
            </p>
            <div className={styles.heroMeta}>
              <span>{productCount} products</span>
              <span>999.9 fine gold</span>
              <span>Live market pricing</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.categories}>
        <div className="container">
          <div className={styles.catGrid}>
            {productCategories.map((cat, i) => (
              <Reveal key={cat.id} delay={(i % 5) + 1}>
                <Link href={cat.href} className={styles.catCard}>
                  <div className={styles.catMedia}>
                    <Image
                      src={cat.image}
                      alt=""
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className={styles.catImg}
                    />
                  </div>
                  <div className={styles.catBody}>
                    <h2>{cat.title}</h2>
                    <p>{cat.description}</p>
                    <span className={styles.catLink} aria-hidden="true">
                      View →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.allProducts}>
        <div className="container">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="Full Catalog"
              title="All Products"
              description="Contact us for live pricing on any item in our catalog."
            />
          </Reveal>
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
