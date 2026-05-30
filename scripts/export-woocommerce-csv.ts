/**
 * Exports products from src/data/products.ts to a WooCommerce import CSV.
 * Column headers match the WooCommerce product importer mapping screen.
 * Run: npm run export:woocommerce
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { staticProducts as products } from "../src/data/products";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outFile = path.join(__dirname, "..", "woocommerce-products-import.csv");

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

const categoryMap: Record<string, string> = {
  kilo: "Kilo Bars",
  tola: "Tola Bars",
  investment: "Investment Bars",
  silver: "Silver Bars",
  "gold-coin": "Gold & Silver Coins > Gold Coins",
  "silver-coin": "Gold & Silver Coins > Silver Coins",
};

/** Dummy USD prices for import/testing — not live spot rates */
function estimateDummyPrice(name: string, category: string): string {
  const upper = name.toUpperCase();

  if (/1\s*KG\s*GOLD\s*BAR\s*9999/.test(upper)) return "105000";
  if (/1\s*KG\s*GOLD\s*BAR\s*995/.test(upper)) return "98000";
  if (/1\s*KG\s*SILVER\s*BAR/.test(upper)) return "950";
  if (/250G?\s*SILVER\s*BAR/.test(upper)) return "240";

  const tolaMatch = upper.match(/(\d+)\s*TOLA\s*GOLD/);
  if (tolaMatch) return String(Number(tolaMatch[1]) * 1300);

  const ozGoldMatch = upper.match(/(\d+(?:\/\d+)?)\s*OZ\s*.*GOLD\s*BAR/i);
  if (ozGoldMatch) {
    const part = ozGoldMatch[1];
    if (part.includes("/")) {
      const [num, den] = part.split("/").map(Number);
      return String(Math.round((3400 * num) / den));
    }
    return String(Number(part) * 3400);
  }

  const multigramMatch = upper.match(/(\d+)X1G?\s*\(?MULTIGRAM\)?/i);
  if (multigramMatch) return String(Number(multigramMatch[1]) * 115);

  const gramGoldBarMatch = upper.match(/(\d+(?:\.\d+)?)\s*G\s*.*GOLD\s*BAR/i);
  if (gramGoldBarMatch) return String(Math.round(Number(gramGoldBarMatch[1]) * 115));

  const gramSilverBarMatch = upper.match(/(\d+(?:\.\d+)?)\s*G\s*SILVER\s*BAR/i);
  if (gramSilverBarMatch) {
    const grams = Number(gramSilverBarMatch[1]);
    return String(Math.max(3, Math.round(grams * 1.15)));
  }

  const gramGoldCoinMatch = upper.match(/(\d+(?:\.\d+)?)\s*G\s*GOLD\s*COIN\s*24K/i);
  if (gramGoldCoinMatch) return String(Math.round(Number(gramGoldCoinMatch[1]) * 118));

  const gramGoldCoin22Match = upper.match(/(\d+(?:\.\d+)?)\s*G\s*GOLD\s*COIN\s*22K/i);
  if (gramGoldCoin22Match) return String(Math.round(Number(gramGoldCoin22Match[1]) * 105));

  const gramSilverCoinMatch = upper.match(/(\d+(?:\.\d+)?)\s*G\s*SILVER\s*COIN/i);
  if (gramSilverCoinMatch) return String(Math.max(2, Math.round(Number(gramSilverCoinMatch[1]) * 2.5)));

  const defaults: Record<string, string> = {
    kilo: "98000",
    tola: "1300",
    investment: "1150",
    silver: "35",
    "gold-coin": "118",
    "silver-coin": "5",
  };

  return defaults[category] ?? "99";
}

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

const lines = [row([...WOOCOMMERCE_COLUMNS])];

for (const product of products) {
  const sku = product.id.toUpperCase().replace(/-/g, "_");
  const specs = [product.brand, product.purity, product.weight]
    .filter(Boolean)
    .join(" · ");

  const shortDescription =
    specs || "Investment-grade bullion. Contact us for live pricing.";

  const description = `<p>${product.name}</p><p>${specs || "Fine precious metal product from Parpia Gold and Jewels Trading LLC."}</p><p><em>Dummy price for testing — live spot rates apply at checkout.</em></p>`;

  const tags = [product.brand, product.purity].filter(Boolean).join(", ");
  const dummyPrice = estimateDummyPrice(product.name, product.category);

  lines.push(
    row([
      "simple",
      sku,
      product.name,
      "1",
      product.featured ? "1" : "0",
      "visible",
      shortDescription,
      description,
      dummyPrice,
      categoryMap[product.category] ?? "Products",
      tags,
      product.image,
      "1",
      "",
      "Purity",
      product.purity ?? "",
      "1",
      "Brand",
      product.brand ?? "",
      "1",
    ]),
  );
}

// UTF-8 BOM helps Excel and some importers detect encoding
fs.writeFileSync(outFile, "\uFEFF" + lines.join("\r\n"), "utf8");
console.log(`Exported ${products.length} products (${WOOCOMMERCE_COLUMNS.length} columns) to:\n${outFile}`);
