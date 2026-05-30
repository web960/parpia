import type { WCStoreProduct } from "./types";

export type WCCartItem = {
  key: string;
  id: number;
  quantity: number;
  name: string;
  sku: string;
  short_description: string;
  images: { src: string; thumbnail: string }[];
  prices: {
    price: string;
    regular_price: string;
    currency_prefix: string;
    currency_suffix: string;
    currency_minor_unit: number;
  };
  totals: {
    line_subtotal: string;
    line_total: string;
  };
};

export type WCCart = {
  items: WCCartItem[];
  items_count: number;
  totals: {
    total_items: string;
    total_price: string;
    currency_prefix: string;
    currency_suffix: string;
    currency_minor_unit: number;
  };
};

export type WCCheckoutAddress = {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state?: string;
  postcode?: string;
  country: string;
  email: string;
  phone: string;
};

export type WCCheckoutPayload = {
  billing_address: WCCheckoutAddress;
  shipping_address?: WCCheckoutAddress;
  payment_method: string;
  customer_note?: string;
};

export type WCCheckoutResult = {
  order_id: number;
  status: string;
  payment_result?: {
    payment_status: string;
    redirect_url?: string;
  };
};

export function formatWCMoney(
  amount: string,
  prices: {
    currency_minor_unit?: number;
    currency_prefix?: string;
    currency_suffix?: string;
  },
): string {
  if (!amount || amount === "0") return "Price on request";
  const minor = prices.currency_minor_unit ?? 2;
  const value = Number(amount) / 10 ** minor;
  return `${prices.currency_prefix ?? ""}${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}${prices.currency_suffix ?? ""}`;
}

export function mapCartItem(item: WCCartItem) {
  return {
    key: item.key,
    productId: item.id,
    name: item.name,
    sku: item.sku,
    quantity: item.quantity,
    image: item.images[0]?.thumbnail ?? item.images[0]?.src ?? "",
    lineTotal: formatWCMoney(item.totals.line_total, item.prices),
    unitPrice: formatWCMoney(item.prices.price, item.prices),
  };
}

export type CartView = {
  items: ReturnType<typeof mapCartItem>[];
  itemsCount: number;
  subtotal: string;
  total: string;
};

export function mapCart(cart: WCCart): CartView {
  return {
    items: cart.items.map(mapCartItem),
    itemsCount: cart.items_count,
    subtotal: formatWCMoney(cart.totals.total_items, cart.totals),
    total: formatWCMoney(cart.totals.total_price, cart.totals),
  };
}
