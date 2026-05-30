"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

import styles from "./CartButton.module.css";

export default function CartButton() {
  const { cart } = useCart();
  const count = cart.itemsCount;

  return (
    <Link href="/cart/" className={styles.cartBtn} aria-label={`Cart, ${count} items`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 6h15l-1.5 9h-12L6 6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M6 6 5 3H2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      </svg>
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </Link>
  );
}
