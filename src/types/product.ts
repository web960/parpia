export type ProductCategory =
  | "kilo"
  | "tola"
  | "investment"
  | "silver"
  | "gold-coin"
  | "silver-coin";

export type Product = {
  id: string;
  woocommerceId: number;
  name: string;
  sku: string;
  category: ProductCategory;
  brand?: string;
  purity?: string;
  weight?: string;
  image: string;
  images?: string[];
  href: string;
  productUrl: string;
  permalink: string;
  featured?: boolean;
  price?: string;
  inStock: boolean;
  purchasable: boolean;
  shortDescription?: string;
  description?: string;
};

export type ProductCategoryMeta = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  wcCategorySlug: string;
};
