"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CartView } from "@/lib/woocommerce/cart-types";

const emptyCart: CartView = {
  items: [],
  itemsCount: 0,
  subtotal: "$0.00",
  total: "$0.00",
};

type CartContextValue = {
  cart: CartView;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  addItem: (productId: number, quantity?: number) => Promise<boolean>;
  updateItem: (key: string, quantity: number) => Promise<boolean>;
  removeItem: (key: string) => Promise<boolean>;
};

const CartContext = createContext<CartContextValue | null>(null);

async function fetchCart(): Promise<CartView> {
  const res = await fetch("/api/cart/", { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Failed to load cart");
  return data as CartView;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartView>(emptyCart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchCart();
      setCart(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cart unavailable");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const addItem = useCallback(
    async (productId: number, quantity = 1) => {
      try {
        setError(null);
        const res = await fetch("/api/cart/add/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, quantity }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Could not add to cart");
        setCart(data as CartView);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not add to cart");
        return false;
      }
    },
    [],
  );

  const updateItem = useCallback(async (key: string, quantity: number) => {
    try {
      setError(null);
      const res = await fetch("/api/cart/update/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not update cart");
      setCart(data as CartView);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update cart");
      return false;
    }
  }, []);

  const removeItem = useCallback(async (key: string) => {
    try {
      setError(null);
      const res = await fetch("/api/cart/remove/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not remove item");
      setCart(data as CartView);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not remove item");
      return false;
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      loading,
      error,
      refresh,
      addItem,
      updateItem,
      removeItem,
    }),
    [cart, loading, error, refresh, addItem, updateItem, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
