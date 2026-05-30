import type { Product, ProductCategory } from "@/types/product";

import type { WCStoreProduct } from "./types";

/** SKUs marked featured in the original catalog import */
export const FEATURED_SKUS = new Set([
  "1_KG_GOLD_BAR_995",
  "1_KG_GOLD_BAR_9999",
  "1_KG_SILVER_BAR",
  "5_TOLA_GOLD_BAR_999",
  "1G_PAMP_SUISSE_GOLD_BAR_9999",
  "10G_PAMP_SUISSE_GOLD_BAR_9999",
  "1_OZ_PAMP_SUISSE_GOLD_BAR_9999",
  "100G_PAMP_SUISSE_GOLD_BAR_9999",
  "1G_GOLD_COIN_24K",
  "8G_GOLD_COIN_24K",
]);

const SLUG_TO_CATEGORY: Record<string, ProductCategory> = {
  "kilo-bars": "kilo",
  "tola-bars": "tola",
  "investment-bars": "investment",
  "silver-bars": "silver",
  "gold-coins": "gold-coin",
  "silver-coins": "silver-coin",
};

function categoryFromSlug(slug: string): ProductCategory | null {
  if (SLUG_TO_CATEGORY[slug]) return SLUG_TO_CATEGORY[slug];
  if (slug.includes("gold-coin")) return "gold-coin";
  if (slug.includes("silver-coin")) return "silver-coin";
  return null;
}

function inferCategoryFromName(name: string): ProductCategory {
  if (/SILVER COIN/i.test(name)) return "silver-coin";
  if (/GOLD COIN/i.test(name)) return "gold-coin";
  if (/TOLA/i.test(name)) return "tola";
  if (/KG GOLD BAR|995|9999/i.test(name) && !/PAMP|VALCAMBI|CREDIT/i.test(name))
    return "kilo";
  if (/SILVER BAR/i.test(name)) return "silver";
  if (/PAMP|VALCAMBI|CREDIT SUISSE|Multigram|Oz/i.test(name) && /GOLD BAR/i.test(name))
    return "investment";
  return "investment";
}

export function mapWCCategoryToInternal(
  categories: WCStoreProduct["categories"],
  productName: string,
): ProductCategory {
  for (const cat of categories) {
    const mapped = categoryFromSlug(cat.slug);
    if (mapped) return mapped;
  }
  return inferCategoryFromName(productName);
}

function categoryHref(category: ProductCategory): string {
  switch (category) {
    case "kilo":
      return "/products/kilo-bars";
    case "tola":
      return "/products/tola-bars";
    case "investment":
      return "/products/investment-bars";
    case "silver":
      return "/products/silver-bars";
    case "gold-coin":
    case "silver-coin":
      return "/products/coins";
    default:
      return "/products";
  }
}

function getAttribute(product: WCStoreProduct, name: string): string | undefined {
  const attr = product.attributes.find(
    (a) => a.name.toLowerCase() === name.toLowerCase(),
  );
  return attr?.terms[0]?.name || undefined;
}

function formatPrice(product: WCStoreProduct): string | undefined {
  const { price, currency_minor_unit, currency_prefix, currency_suffix } =
    product.prices;
  if (!price || price === "0") return undefined;
  const amount = Number(price) / 10 ** currency_minor_unit;
  return `${currency_prefix}${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}${currency_suffix}`;
}

const PLACEHOLDER_IMAGE =
  "https://lavenderblush-cheetah-517173.hostingersite.com/wp-content/uploads/woocommerce-placeholder.webp";

export function mapStoreProduct(product: WCStoreProduct): Product {
  const category = mapWCCategoryToInternal(product.categories, product.name);

  return {
    id: product.slug,
    woocommerceId: product.id,
    name: product.name,
    sku: product.sku,
    category,
    brand: getAttribute(product, "Brand"),
    purity:
      getAttribute(product, "Purity") ||
      product.tags.find((t) => /999|22K|24K/i.test(t.name))?.name,
    image: product.images[0]?.src ?? PLACEHOLDER_IMAGE,
    images: product.images.map((img) => img.src),
    href: categoryHref(category),
    productUrl: `/product/${product.slug}`,
    permalink: product.permalink,
    featured: FEATURED_SKUS.has(product.sku),
    price: formatPrice(product),
    inStock: product.is_in_stock,
    purchasable: product.is_purchasable,
    shortDescription: product.short_description?.replace(/<[^>]+>/g, "").trim(),
    description: product.description,
  };
}
