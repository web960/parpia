import { NextResponse } from "next/server";

import { mapCart, type WCCart } from "@/lib/woocommerce/cart-types";
import { wcStoreGet } from "@/lib/woocommerce/cartSession";

export async function GET() {
  try {
    const { data } = await wcStoreGet<WCCart>("/cart");
    return NextResponse.json(mapCart(data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load cart";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
