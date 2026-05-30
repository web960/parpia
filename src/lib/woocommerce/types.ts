export type WCStoreCategory = {
  id: number;
  name: string;
  slug: string;
  parent: number;
};

export type WCStoreAttribute = {
  name: string;
  terms: { name: string; slug: string }[];
};

export type WCStoreProduct = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  permalink: string;
  short_description: string;
  description: string;
  categories: WCStoreCategory[];
  tags: { name: string; slug: string }[];
  attributes: WCStoreAttribute[];
  images: { src: string; thumbnail: string; alt: string }[];
  prices: {
    price: string;
    regular_price: string;
    currency_code: string;
    currency_prefix: string;
    currency_suffix: string;
    currency_minor_unit: number;
  };
  is_in_stock: boolean;
  is_purchasable: boolean;
};
