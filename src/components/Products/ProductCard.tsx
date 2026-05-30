"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import type { Product } from "@/types/product";
import AddToCartButton from "@/components/Products/AddToCartButton";
import { cardHover, premiumEase } from "@/lib/motion";

import styles from "./ProductCard.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      className={styles.card}
      whileHover={cardHover}
      transition={{ duration: 0.45, ease: premiumEase }}
    >
      <Link
        href={product.productUrl}
        className={styles.imageWrap}
        aria-hidden="true"
        tabIndex={-1}
      >
        <motion.div
          className={styles.imageMotion}
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: premiumEase }}
        >
          <Image
            src={product.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
        </motion.div>
      </Link>
      <div className={styles.body}>
        {product.brand && (
          <span className={styles.brand}>{product.brand}</span>
        )}
        <h3>
          <Link href={product.productUrl}>{product.name}</Link>
        </h3>
        {(product.purity || product.weight) && (
          <p className={styles.specs}>
            {[product.purity, product.weight].filter(Boolean).join(" · ")}
          </p>
        )}
        {product.price && <p className={styles.price}>{product.price}</p>}
        <div className={styles.footer}>
          <AddToCartButton
            productId={product.woocommerceId}
            purchasable={product.purchasable}
            inStock={product.inStock}
          />
        </div>
      </div>
    </motion.article>
  );
}
