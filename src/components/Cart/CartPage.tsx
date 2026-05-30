"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { useCart } from "@/context/CartContext";

import styles from "./CartPage.module.css";

export default function CartPage() {
  const { cart, loading, error, updateItem, removeItem } = useCart();
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);

  const handleQuantity = async (key: string, quantity: number) => {
    if (quantity < 1) return;
    setUpdatingKey(key);
    await updateItem(key, quantity);
    setUpdatingKey(null);
  };

  const handleRemove = async (key: string) => {
    setUpdatingKey(key);
    await removeItem(key);
    setUpdatingKey(null);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className="container">
          <p className={styles.loading}>Loading cart…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <span className="section-label">Your Cart</span>
        <h1 className="section-title">Shopping Cart</h1>

        {error && <p className={styles.error}>{error}</p>}

        {cart.items.length === 0 ? (
          <div className={styles.empty}>
            <p>Your cart is empty.</p>
            <Link href="/products/" className="btn btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.items}>
              {cart.items.map((item) => (
                <article key={item.key} className={styles.item}>
                  <div className={styles.itemImage}>
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className={styles.image}
                      />
                    ) : null}
                  </div>
                  <div className={styles.itemBody}>
                    <h2>{item.name}</h2>
                    <p className={styles.sku}>SKU: {item.sku}</p>
                    <p className={styles.unitPrice}>{item.unitPrice}</p>
                    <div className={styles.qtyRow}>
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.key, item.quantity - 1)}
                        disabled={updatingKey === item.key || item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => handleQuantity(item.key, item.quantity + 1)}
                        disabled={updatingKey === item.key}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={styles.itemAside}>
                    <p className={styles.lineTotal}>{item.lineTotal}</p>
                    <button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => handleRemove(item.key)}
                      disabled={updatingKey === item.key}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className={styles.summary}>
              <h2>Order Summary</h2>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{cart.subtotal}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.total}`}>
                <span>Total</span>
                <span>{cart.total}</span>
              </div>
              <p className={styles.note}>
                Final pricing may be confirmed based on live spot rates before fulfillment.
              </p>
              <Link href="/checkout/" className="btn btn-primary">
                Proceed to Checkout
              </Link>
              <Link href="/products/" className={styles.continueLink}>
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
