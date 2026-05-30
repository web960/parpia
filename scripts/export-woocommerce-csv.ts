/**
 * Exports products from WooCommerce Store API to a WooCommerce import CSV.
 * Run: npm run export:woocommerce
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(__dirname, "..", "woocommerce-products-import.csv");

const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace(/\/$/, "");

/** Exact column order for WooCommerce → Products → Import */
export const WOOCOMMERCE_COLUMNS = [
  "Type",
  "SKU",
  "Name",
  "Published",
  "Is featured?",
  "Visibility in catalog",
  "Short description",
  "Description",
  "Regular price",
  "Categories",
  "Tags",
  "Images",
  "In stock?",
  "Stock",
  "Attribute 1 name",
  "Attribute 1 value(s)",
  "Attribute 1 visible",
  "Attribute 2 name",
  "Attribute 2 value(s)",
  "Attribute 2 visible",
] as const;

type WCProduct = {
  name: string;
  sku: string;
  short_description: string;
  description: string;
  categories: { name: string }[];
  tags: { name: string }[];
  attributes: { name: string; terms: { name: string }[] }[];
  images: { src: string }[];
  prices: {
    regular_price: string;
    currency_minor_unit: number;
  };
  is_in_stock: boolean;
};

function escapeCsv(value: string): string {
  if (value === "") return "";
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function row(values: string[]): string {
  return values.map(escapeCsv).join(",");
}

function formatPrice(prices: WCProduct["prices"]): string {
  const { regular_price, currency_minor_unit } = prices;
  if (!regular_price || regular_price === "0") return "";
  const amount = Number(regular_price) / 10 ** currency_minor_unit;
  return String(amount);
}

function getAttribute(product: WCProduct, name: string): string {
  const attr = product.attributes.find(
    (a) => a.name.toLowerCase() === name.toLowerCase(),
  );
  return attr?.terms[0]?.name ?? "";
}

async function fetchProducts(): Promise<WCProduct[]> {
  if (!WP_URL) {
    throw new Error("NEXT_PUBLIC_WORDPRESS_API_URL is not configured");
  }

  const response = await fetch(`${WP_URL}/wp-json/wc/store/v1/products?per_page=100`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`WooCommerce Store API error (${response.status})`);
  }

  return response.json() as Promise<WCProduct[]>;
}

async function main() {
  const products = await fetchProducts();
  const lines = [row([...WOOCOMMERCE_COLUMNS])];

  for (const product of products) {
    const categories = product.categories.map((c) => c.name).join(" > ");
    const tags = product.tags.map((t) => t.name).join(", ");
    const images = product.images.map((i) => i.src).join(", ");

    lines.push(
      row([
        "simple",
        product.sku,
        product.name,
        "1",
        "0",
        "visible",
        product.short_description?.replace(/<[^>]+>/g, "").trim() ?? "",
        product.description ?? "",
        formatPrice(product.prices),
        categories,
        tags,
        images,
        product.is_in_stock ? "1" : "0",
        "",
        "Purity",
        getAttribute(product, "Purity"),
        "1",
        "Brand",
        getAttribute(product, "Brand"),
        "1",
      ]),
    );
  }

  fs.writeFileSync(outFile, "\uFEFF" + lines.join("\r\n"), "utf8");
  console.log(
    `Exported ${products.length} products (${WOOCOMMERCE_COLUMNS.length} columns) to:\n${outFile}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
