import { NextResponse } from "next/server";

import type { WCCheckoutPayload, WCCheckoutResult } from "@/lib/woocommerce/cart-types";
import { wcStoreMutation } from "@/lib/woocommerce/cartSession";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WCCheckoutPayload;

    if (!body.billing_address?.email || !body.billing_address?.first_name) {
      return NextResponse.json(
        { error: "Billing name and email are required" },
        { status: 400 },
      );
    }

    const { data } = await wcStoreMutation<WCCheckoutResult>("/checkout", {
      method: "POST",
      body: JSON.stringify({
        billing_address: body.billing_address,
        shipping_address: body.shipping_address ?? body.billing_address,
        payment_method: body.payment_method ?? "bacs",
        customer_note: body.customer_note ?? "",
      }),
    });

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
