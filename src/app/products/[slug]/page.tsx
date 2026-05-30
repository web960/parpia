import type { Metadata } from "next";
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
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Products</span>
          <h1 className="section-title">{meta.title}</h1>
          <p>{meta.description}</p>
        </div>
      </section>

      <section className={styles.allProducts}>
        <div className="container">
          <div className={styles.grid}>
            {items.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) + 1}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
