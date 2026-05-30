import { NextResponse } from "next/server";

import { mapCart, type WCCart } from "@/lib/woocommerce/cart-types";
import { wcStoreMutation } from "@/lib/woocommerce/cartSession";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      productId?: number;
      quantity?: number;
    };

    if (!body.productId) {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 },
      );
    }

    const { data } = await wcStoreMutation<WCCart>("/cart/add-item", {
      method: "POST",
      body: JSON.stringify({
        id: body.productId,
        quantity: body.quantity ?? 1,
      }),
    });

    return NextResponse.json(mapCart(data));
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add item to cart";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
