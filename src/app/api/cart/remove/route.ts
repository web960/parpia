import { NextResponse } from "next/server";

import { mapCart, type WCCart } from "@/lib/woocommerce/cart-types";
import { wcStoreMutation } from "@/lib/woocommerce/cartSession";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { key?: string };

    if (!body.key) {
      return NextResponse.json({ error: "key is required" }, { status: 400 });
    }

    const { data } = await wcStoreMutation<WCCart>("/cart/remove-item", {
      method: "POST",
      body: JSON.stringify({ key: body.key }),
    });

    return NextResponse.json(mapCart(data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to remove cart item";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
