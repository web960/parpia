import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import AddToCartButton from "@/components/Products/AddToCartButton";
import { getProductBySlug } from "@/lib/woocommerce/products";

import styles from "./product.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.name,
    description: product.shortDescription ?? product.name,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className={styles.page}>
      <div className="container">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/products/">Products</Link>
          <span aria-hidden>/</span>
          <Link href={product.href}>{product.category.replace("-", " ")}</Link>
          <span aria-hidden>/</span>
          <span>{product.name}</span>
        </nav>

        <div className={styles.layout}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            </div>
          </div>

          <div className={styles.info}>
            {product.brand && (
              <span className={styles.brand}>{product.brand}</span>
            )}
            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.meta}>
              {product.purity && <span>Purity: {product.purity}</span>}
              {product.sku && <span>SKU: {product.sku}</span>}
              <span>{product.inStock ? "In stock" : "Out of stock"}</span>
            </div>

            <div className={styles.priceBlock}>
              {product.price ? (
                <p className={styles.price}>{product.price}</p>
              ) : (
                <p className={styles.priceNote}>Price on request — contact us for live spot pricing</p>
              )}
            </div>

            <div className={styles.actions}>
              <AddToCartButton
                productId={product.woocommerceId}
                purchasable={product.purchasable}
                inStock={product.inStock}
              />
              <Link href="/contact/" className={`btn btn-ghost ${styles.secondaryBtn}`}>
                Ask About This Product
              </Link>
            </div>

            {product.shortDescription && (
              <p className={styles.shortDesc}>{product.shortDescription}</p>
            )}

            {product.description && (
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
