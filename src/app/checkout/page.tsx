import type { Metadata } from "next";

import CheckoutPage from "@/components/Checkout/CheckoutPage";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Parpia Gold order.",
};

export default function CheckoutRoute() {
  return <CheckoutPage />;
}
