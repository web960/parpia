"use client";

import { useState } from "react";

import { useCart } from "@/context/CartContext";

import styles from "./AddToCartButton.module.css";

type AddToCartButtonProps = {
  productId: number;
  purchasable?: boolean;
  inStock?: boolean;
  className?: string;
  label?: string;
};

export default function AddToCartButton({
  productId,
  purchasable = true,
  inStock = true,
  className = "",
  label = "Add to Cart",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [pending, setPending] = useState(false);
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return (
      <button className={`${styles.btn} ${styles.disabled} ${className}`} disabled>
        Out of Stock
      </button>
    );
  }

  if (!purchasable) {
    return (
      <a href="/contact/" className={`${styles.btn} ${styles.outline} ${className}`}>
        Contact for Price
      </a>
    );
  }

  const handleClick = async () => {
    setPending(true);
    const ok = await addItem(productId, 1);
    setPending(false);
    if (ok) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.btn} ${styles.primary} ${className}`}
      onClick={handleClick}
      disabled={pending}
    >
      {pending ? "Adding…" : added ? "Added ✓" : label}
    </button>
  );
}
