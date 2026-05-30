import { staticProducts } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";

import { fetchStore } from "./client";
import { mapStoreProduct } from "./mapProduct";
import type { WCStoreProduct } from "./types";

const PER_PAGE = 100;

async function fetchAllStoreProducts(): Promise<WCStoreProduct[]> {
  const products = await fetchStore<WCStoreProduct[]>(
    `/products?per_page=${PER_PAGE}`,
  );
  return products;
}

async function fetchProductsByCategorySlug(
  slug: string,
): Promise<WCStoreProduct[]> {
  return fetchStore<WCStoreProduct[]>(
    `/products?category=${encodeURIComponent(slug)}&per_page=${PER_PAGE}`,
  );
}

export async function getProducts(): Promise<Product[]> {
  try {
    const raw = await fetchAllStoreProducts();
    if (!raw.length) return staticProducts;
    return raw.map(mapStoreProduct);
  } catch (error) {
    console.error("[woocommerce] getProducts fallback:", error);
    return staticProducts;
  }
}

export async function getProductCount(): Promise<number> {
  try {
    const products = await getProducts();
    return products.length;
  } catch {
    return staticProducts.length;
  }
}

export async function getProductsByCategorySlug(
  wcCategorySlug: string,
): Promise<Product[]> {
  try {
    const raw = await fetchProductsByCategorySlug(wcCategorySlug);
    return raw.map(mapStoreProduct);
  } catch (error) {
    console.error(
      `[woocommerce] getProductsByCategorySlug(${wcCategorySlug}) fallback:`,
      error,
    );
    return staticProducts.filter((p) => {
      const slugMap: Record<string, ProductCategory | ProductCategory[]> = {
        "kilo-bars": "kilo",
        "tola-bars": "tola",
        "investment-bars": "investment",
        "silver-bars": "silver",
        "gold-silver-coins": ["gold-coin", "silver-coin"],
      };
      const mapped = slugMap[wcCategorySlug];
      if (!mapped) return false;
      if (Array.isArray(mapped)) return mapped.includes(p.category);
      return p.category === mapped;
    });
  }
}

export async function getProductsByInternalCategory(
  category: ProductCategory | ProductCategory[],
): Promise<Product[]> {
  const all = await getProducts();
  const categories = Array.isArray(category) ? category : [category];
  return all.filter((p) => categories.includes(p.category));
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all.slice(0, 12);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const raw = await fetchStore<WCStoreProduct>(
      `/products/${encodeURIComponent(slug)}`,
    );
    return mapStoreProduct(raw);
  } catch (error) {
    console.error(`[woocommerce] getProductBySlug(${slug}) fallback:`, error);
    return staticProducts.find((p) => p.id === slug) ?? null;
  }
}
