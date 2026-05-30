"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

import { CartProvider } from "@/context/CartContext";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>{children}</CartProvider>
    </MotionConfig>
  );
}
