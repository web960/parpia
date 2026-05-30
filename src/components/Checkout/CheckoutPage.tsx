"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "@/context/CartContext";

import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, loading } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company: "",
    address_1: "",
    address_2: "",
    city: "Dubai",
    country: "AE",
    customer_note: "",
    payment_method: "bacs",
  });

  useEffect(() => {
    if (!loading && cart.items.length === 0 && !orderId) {
      router.replace("/cart/");
    }
  }, [loading, cart.items.length, orderId, router]);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billing_address: {
            first_name: form.first_name,
            last_name: form.last_name,
            company: form.company,
            address_1: form.address_1,
            address_2: form.address_2,
            city: form.city,
            country: form.country,
            email: form.email,
            phone: form.phone,
          },
          payment_method: form.payment_method,
          customer_note: form.customer_note,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");

      if (data.payment_result?.redirect_url) {
        window.location.href = data.payment_result.redirect_url;
        return;
      }

      setOrderId(data.order_id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || (!orderId && cart.items.length === 0)) {
    return (
      <div className={styles.page}>
        <div className="container">
          <p>Loading…</p>
        </div>
      </div>
    );
  }

  if (orderId) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.success}>
            <span className="section-label">Order Received</span>
            <h1 className="section-title">Thank You</h1>
            <p>
              Your order <strong>#{orderId}</strong> has been placed. Our team will
              contact you to confirm live pricing and payment details.
            </p>
            <Link href="/products/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <span className="section-label">Checkout</span>
        <h1 className="section-title">Complete Your Order</h1>

        <div className={styles.layout}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <section>
              <h2>Contact &amp; Billing</h2>
              <div className={styles.grid}>
                <label>
                  First name
                  <input
                    required
                    value={form.first_name}
                    onChange={(e) => update("first_name", e.target.value)}
                  />
                </label>
                <label>
                  Last name
                  <input
                    required
                    value={form.last_name}
                    onChange={(e) => update("last_name", e.target.value)}
                  />
                </label>
                <label className={styles.full}>
                  Email
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </label>
                <label className={styles.full}>
                  Phone
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </label>
                <label className={styles.full}>
                  Company (optional)
                  <input
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                  />
                </label>
                <label className={styles.full}>
                  Address
                  <input
                    required
                    value={form.address_1}
                    onChange={(e) => update("address_1", e.target.value)}
                  />
                </label>
                <label className={styles.full}>
                  Address line 2
                  <input
                    value={form.address_2}
                    onChange={(e) => update("address_2", e.target.value)}
                  />
                </label>
                <label>
                  City
                  <input
                    required
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                  />
                </label>
                <label>
                  Country
                  <input
                    required
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                  />
                </label>
              </div>
            </section>

            <section>
              <h2>Payment</h2>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment_method === "bacs"}
                  onChange={() => update("payment_method", "bacs")}
                />
                Bank transfer (direct payment)
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment_method === "cod"}
                  onChange={() => update("payment_method", "cod")}
                />
                Pay on collection / invoice
              </label>
            </section>

            <section>
              <h2>Order Notes</h2>
              <label className={styles.full}>
                Special instructions
                <textarea
                  rows={4}
                  value={form.customer_note}
                  onChange={(e) => update("customer_note", e.target.value)}
                  placeholder="Account number, delivery preferences, etc."
                />
              </label>
            </section>

            {error && <p className={styles.error}>{error}</p>}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={submitting}
            >
              {submitting ? "Placing order…" : "Place Order"}
            </button>
          </form>

          <aside className={styles.summary}>
            <h2>Your Order</h2>
            <ul className={styles.itemList}>
              {cart.items.map((item) => (
                <li key={item.key}>
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>{item.lineTotal}</span>
                </li>
              ))}
            </ul>
            <div className={styles.totalRow}>
              <span>Total</span>
              <span>{cart.total}</span>
            </div>
            <p className={styles.disclaimer}>
              Live bullion prices will be confirmed before payment is processed.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
