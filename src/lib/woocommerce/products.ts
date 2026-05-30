import type { Product, ProductCategory } from "@/types/product";

import { fetchStore } from "./client";
import { mapStoreProduct } from "./mapProduct";
import type { WCStoreProduct } from "./types";

const PER_PAGE = 100;

async function fetchAllStoreProducts(): Promise<WCStoreProduct[]> {
  return fetchStore<WCStoreProduct[]>(`/products?per_page=${PER_PAGE}`);
}

async function fetchProductsByCategorySlug(
  slug: string,
): Promise<WCStoreProduct[]> {
  return fetchStore<WCStoreProduct[]>(
    `/products?category=${encodeURIComponent(slug)}&per_page=${PER_PAGE}`,
  );
}

export async function getProducts(): Promise<Product[]> {
  const raw = await fetchAllStoreProducts();
  return raw.map(mapStoreProduct);
}

export async function getProductCount(): Promise<number> {
  const products = await getProducts();
  return products.length;
}

export async function getProductsByCategorySlug(
  wcCategorySlug: string,
): Promise<Product[]> {
  const raw = await fetchProductsByCategorySlug(wcCategorySlug);
  return raw.map(mapStoreProduct);
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
  } catch {
    return null;
  }
}
