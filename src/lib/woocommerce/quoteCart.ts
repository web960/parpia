import { cookies } from "next/headers";

export type QuoteCartItem = {
  key: string;
  productId: number;
  slug: string;
  name: string;
  sku: string;
  image: string;
  quantity: number;
};

export const QUOTE_CART_COOKIE = "pg_quote_cart";

export async function getQuoteCart(): Promise<QuoteCartItem[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(QUOTE_CART_COOKIE)?.value;
  if (!raw) return [];
  try {
    return JSON.parse(raw) as QuoteCartItem[];
  } catch {
    return [];
  }
}

export async function saveQuoteCart(items: QuoteCartItem[]) {
  const cookieStore = await cookies();
  cookieStore.set(QUOTE_CART_COOKIE, JSON.stringify(items), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function addQuoteItem(item: Omit<QuoteCartItem, "key" | "quantity"> & { quantity?: number }) {
  const items = await getQuoteCart();
  const key = `quote-${item.productId}`;
  const existing = items.find((i) => i.key === key);

  if (existing) {
    existing.quantity += item.quantity ?? 1;
  } else {
    items.push({
      key,
      productId: item.productId,
      slug: item.slug,
      name: item.name,
      sku: item.sku,
      image: item.image,
      quantity: item.quantity ?? 1,
    });
  }

  await saveQuoteCart(items);
  return items;
}

export async function updateQuoteItem(key: string, quantity: number) {
  const items = await getQuoteCart();
  const item = items.find((i) => i.key === key);
  if (!item) return items;
  if (quantity < 1) return removeQuoteItem(key);
  item.quantity = quantity;
  await saveQuoteCart(items);
  return items;
}

export async function removeQuoteItem(key: string) {
  const items = (await getQuoteCart()).filter((i) => i.key !== key);
  await saveQuoteCart(items);
  return items;
}

export async function clearQuoteCart() {
  const cookieStore = await cookies();
  cookieStore.delete(QUOTE_CART_COOKIE);
}

export function mapQuoteToCartView(items: QuoteCartItem[]) {
  return items.map((item) => ({
    key: item.key,
    productId: item.productId,
    slug: item.slug,
    name: item.name,
    sku: item.sku,
    quantity: item.quantity,
    image: item.image,
    lineTotal: "Price on request",
    unitPrice: "Price on request",
    isQuote: true as const,
  }));
}
