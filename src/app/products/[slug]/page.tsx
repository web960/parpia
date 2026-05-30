import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  productCategoryPages,
  type ProductCategorySlug,
} from "@/data/products";
import ProductCard from "@/components/Products/ProductCard";
import Reveal from "@/components/UI/Reveal";
import { getProductsByCategorySlug } from "@/lib/woocommerce/products";

import styles from "../products.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export function generateStaticParams() {
  return Object.keys(productCategoryPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = productCategoryPages[slug as ProductCategorySlug];
  return {
    title: meta?.title ?? "Products",
    description: meta?.description,
  };
}

export default async function CategoryProductsPage({ params }: Props) {
  const { slug } = await params;
  const meta = productCategoryPages[slug as ProductCategorySlug];

  if (!meta) {
    notFound();
  }

  const items = await getProductsByCategorySlug(meta.wcCategorySlug);

  return (
    <div className={styles.page}>
      <section className={styles.heroBanner}>
        <div className={styles.heroBannerMedia}>
          <Image
            src={meta.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBannerImg}
          />
        </div>
        <div className="container">
          <div className={styles.heroBannerInner}>
            <Link href="/products" className={styles.breadcrumb}>
              ← All Products
            </Link>
            <span className="section-label">Products</span>
            <h1 className={styles.heroTitle}>{meta.title}</h1>
            <p className={styles.heroText}>{meta.description}</p>
          </div>
        </div>
      </section>

      <section className={styles.allProducts}>
        <div className="container">
          {items.length > 0 ? (
            <div className={styles.grid}>
              {items.map((product, i) => (
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
              <h3>No {meta.title.toLowerCase()} in stock right now</h3>
              <p>
                Inventory updates frequently. Contact us for current stock and
                live pricing on {meta.title.toLowerCase()}.
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
