import { getFeaturedProducts } from "@/lib/woocommerce/products";

import FeaturedProductsGrid from "./FeaturedProductsGrid";

export const revalidate = 3600;

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();
  return <FeaturedProductsGrid products={products} />;
}
