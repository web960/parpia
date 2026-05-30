import type { Metadata } from "next";

import CartPage from "@/components/Cart/CartPage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your bullion and coin order before checkout.",
};

export default function CartRoute() {
  return <CartPage />;
}
