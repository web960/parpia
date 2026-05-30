import { UPLOADS_BASE } from "./assets";
import type { Product, ProductCategory } from "@/types/product";

export type { Product, ProductCategory };

type RawProduct = {
  name: string;
  image: string;
  featured?: boolean;
};

const img = (file: string) =>
  file.startsWith("http") ? file : `${UPLOADS_BASE}${file}`;

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inferBrand(name: string): string | undefined {
  if (/PAMP/i.test(name)) return "PAMP Suisse";
  if (/VALCAMBI/i.test(name)) return "Valcambi";
  if (/CREDIT SUISSE/i.test(name)) return "Credit Suisse";
  return undefined;
}

function inferCategory(name: string): ProductCategory {
  if (/SILVER COIN/i.test(name)) return "silver-coin";
  if (/GOLD COIN/i.test(name)) return "gold-coin";
  if (/TOLA/i.test(name)) return "tola";
  if (/KG GOLD BAR|995|9999/i.test(name) && !/PAMP|VALCAMBI|CREDIT/i.test(name))
    return "kilo";
  if (/SILVER BAR/i.test(name)) return "silver";
  if (
    /PAMP|VALCAMBI|CREDIT SUISSE|Multigram|Oz/i.test(name) &&
    /GOLD BAR/i.test(name)
  )
    return "investment";
  if (/SILVER/i.test(name)) return "silver";
  return "investment";
}

function inferHref(category: ProductCategory): string {
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

function inferPurity(name: string): string | undefined {
  if (/9999/.test(name)) return "999.9";
  if (/999/.test(name)) return "999";
  if (/995/.test(name)) return "995.0";
  if (/24K/.test(name)) return "24K";
  if (/22K/.test(name)) return "22K";
  return undefined;
}

function buildProduct(raw: RawProduct): Product {
  const category = inferCategory(raw.name);
  const id = slugify(raw.name);
  return {
    id,
    woocommerceId: 0,
    name: raw.name,
    sku: id.toUpperCase().replace(/-/g, "_"),
    category,
    brand: inferBrand(raw.name),
    purity: inferPurity(raw.name),
    image: img(raw.image),
    href: inferHref(category),
    productUrl: `/product/${id}`,
    permalink: "",
    featured: raw.featured,
    inStock: true,
    purchasable: false,
  };
}

/** Static fallback catalog — used when WooCommerce API is unavailable */
const rawProducts: RawProduct[] = [
  {
    name: "1 KG GOLD BAR 995",
    image: "8f1290_df7f7833cdb546fc8dd95f14fbdee117mv2-1.webp",
    featured: true,
  },
  {
    name: "1 KG GOLD BAR 9999",
    image: "8f1290_b0e9dfa1e38f4083a3fe8466a22dd1a8mv2-1.webp",
    featured: true,
  },
  {
    name: "250g SILVER BAR",
    image: "8f1290_8c8fd486dfae4d5082c5a48695f86a3dmv2-1.webp",
  },
  {
    name: "1 KG SILVER BAR",
    image: "8f1290_384ca7f452c14716a4092d1b225c37d2mv2-1.webp",
    featured: true,
  },
  { name: "1 TOLA GOLD BAR 999", image: "8f1290_7b0d9c25334f45dbb746fbeda545337dmv2-1.webp" },
  { name: "2 TOLA GOLD BAR 999", image: "8f1290_6eaee65c619c4ecdb9b2884bc47ee7c4mv2-1.webp" },
  { name: "3 TOLA GOLD BAR 999", image: "8f1290_58d77710000c44ff91593fcb497b807bmv2-1.webp" },
  {
    name: "5 TOLA GOLD BAR 999",
    image: "8f1290_ea86ad1d34494910a2c0919977af3616mv2-1.webp",
    featured: true,
  },
  { name: "10 TOLA GOLD BAR 999", image: "ddwdfg-1.webp" },
  {
    name: "1G PAMP SUISSE GOLD BAR 9999",
    image: "ddwdfg-1.webp",
    featured: true,
  },
  { name: "1g CREDIT SUISSE GOLD BAR 9999", image: "8f1290_36121a72caf24239a39a05f90caf0b43mv2-1.webp" },
  { name: "5g PAMP SUISSE GOLD BAR 9999", image: "8f1290_fd20c03c4b6840b3be541d3a84b63611mv2-1.webp" },
  { name: "5g CREDIT SUISSE GOLD BAR 9999", image: "8f1290_a3356a84924e407faae953cde5c170e0mv2-1.webp" },
  { name: "5g VALCAMBI SUISSE GOLD BAR 9999", image: "8f1290_0eb7d30a8a164c21be3251b5fe2f6308mv2-1.webp" },
  {
    name: "8x1g (Multigram) PAMP SUISSE GOLD BAR 9999",
    image: "8f1290_b3e2d8e5b4b14afbb179bb11c08d3ac8mv2-1.webp",
  },
  {
    name: "10g PAMP SUISSE GOLD BAR 9999",
    image: "8f1290_ad52dfa666c24ba9acc41313cc7d7e53mv2-1.webp",
    featured: true,
  },
  { name: "10g CREDIT SUISSE GOLD BAR 9999", image: "8f1290_b1b5d0b0c47e40d28a9ef0f601f4c2e9mv2-1.webp" },
  {
    name: "12x1g (Multigram) PAMP SUISSE GOLD BAR 9999",
    image: "8f1290_2230eb40a28a4d00bb3f45066b72e7ebmv2-1.webp",
  },
  { name: "1/2 Oz PAMP SUISSE GOLD BAR 9999", image: "8f1290_66205ee45a804c9db731ef7a82570acemv2-1.webp" },
  { name: "20g CREDIT SUISSE GOLD BAR 9999", image: "8f1290_de73da32830d4fb7bdb67baec78459eamv2-1.webp" },
  {
    name: "25x1g (Multigram) PAMP SUISSE GOLD BAR 9999",
    image: "8f1290_7dcb2c6de2e64c9a88fed2f4f68e9185mv2-1-1.webp",
  },
  {
    name: "1 Oz PAMP SUISSE GOLD BAR 9999",
    image: "8f1290_6b33df2f10cc42e49904592254bc426cmv2-1.webp",
    featured: true,
  },
  { name: "1 Oz VALCAMBI SUISSE GOLD BAR 9999", image: "8f1290_f18d7fa9e91544edb1992496c5433413mv2-1.webp" },
  { name: "50g PAMP SUISSE GOLD BAR 9999", image: "8f1290_407ed933d66041dba2db43a6200996b3mv2-1.webp" },
  {
    name: "100g PAMP SUISSE GOLD BAR 9999",
    image: "8f1290_88c6890bc46f48fbb27cd2299a04d9b8mv2-1.webp",
    featured: true,
  },
  { name: "100g VALCAMBI SUISSE GOLD BAR 9999", image: "8f1290_9fa37d956d384d60a5d201ab1937a6f9mv2-1.webp" },
  { name: "500g PAMP SUISSE GOLD BAR 9999", image: "8f1290_ed807e7176ba44ecb138c35950140ab4mv2-1.webp" },
  { name: "2.5g SILVER BAR", image: "8f1290_d352c865216f4babbf81fcb8847865c5mv2-1.webp" },
  { name: "10g SILVER BAR", image: "8f1290_a5571b830381470aa3b0ce85adb1b17dmv2-1.webp" },
  { name: "1/2 Oz SILVER BAR", image: "8f1290_2f185f9534d34130bf2cf4a9abf7b230mv2-1.webp" },
  { name: "1 Oz SILVER BAR", image: "8f1290_8699ecfb1afb4ee9b86426afa47ec485mv2-1.webp" },
  { name: "50g SILVER BAR", image: "8f1290_8c2867c28b094e0ea7bfcfadf2419ea3mv2-1.webp" },
  { name: "100g SILVER BAR", image: "8f1290_c2e6be83872a4eeea04170a56c364c49mv2.webp" },
  { name: "1g GOLD COIN 22K", image: "8f1290_d056b86169574bed8342a47fe8cfdd8amv2.webp" },
  {
    name: "1g GOLD COIN 24K",
    image: "8f1290_5944fe89fa674140822321d288cb54a4mv2.webp",
    featured: true,
  },
  { name: "2g GOLD COIN 22K", image: "8f1290_809ebf2e92074928a9b6ff730cfe34b5mv2.webp" },
  { name: "2g GOLD COIN 24K", image: "8f1290_d77e7f66eeee4042a960dfa14bcc0a25mv2.webp" },
  { name: "4g GOLD COIN 22K", image: "8f1290_d2bc16f0a88a47198f7313ba23378ab6mv2.webp" },
  { name: "4g GOLD COIN 24K", image: "8f1290_0c359a1f48504978aef7ca011f759f2bmv2.webp" },
  { name: "8g GOLD COIN 22K", image: "8f1290_0e787050e81d4e62b69d367320f8ab8dmv2.webp" },
  {
    name: "8g GOLD COIN 24K",
    image: "8f1290_b55937462b8c4fc6ae0f5148c3e7031fmv2.webp",
    featured: true,
  },
  { name: "10g GOLD COIN 22K", image: "8f1290_b3f8db086f444833a431bfa4704ea05amv2.webp" },
  { name: "10g GOLD COIN 24K", image: "8f1290_525327641dc04591922f89ea58c6b6b9mv2.webp" },
  { name: "1g SILVER COIN 999", image: "8f1290_b0aa3e6d44f9421c93a3061b4d87157bmv2.webp" },
  { name: "2g SILVER COIN 999", image: "8f1290_f40dfd8bea9942cbb4f178540ada675amv2.webp" },
  { name: "4g SILVER COIN 999", image: "8f1290_80b7cbe77c1948de8a1f53ee227e2308mv2.webp" },
  { name: "8g SILVER COIN 999", image: "8f1290_ac0522195d434c6f96b76077bf03ad84mv2.webp" },
  { name: "10g SILVER COIN 999", image: "8f1290_984011401cdf460085b7996412bc3a53mv2.webp" },
  { name: "20g SILVER COIN 999", image: "8f1290_115fe1af32a2437785aa27a71ec7a4dcmv2-1.webp" },
];

/** @deprecated Use getProducts() from @/lib/woocommerce/products */
export const staticProducts: Product[] = rawProducts.map(buildProduct);

export const productCategories = [
  {
    id: "kilo",
    title: "Kilo Bars",
    description:
      "Gold and silver kilo bar options from 995.0 to 999.9 purity. Contact us for buying and selling.",
    href: "/products/kilo-bars",
    image: img("8f1290_97e975c3b777423f8e9a4673371f6d4amv2-1.webp"),
  },
  {
    id: "tola",
    title: "Tola Bars",
    description:
      "Gold tola bar options in various weights. Traditional units for regional investors.",
    href: "/products/tola-bars",
    image: img("8f1290_7b0d9c25334f45dbb746fbeda545337dmv2-1.webp"),
  },
  {
    id: "investment",
    title: "Investment Bars",
    description:
      "PAMP, Credit Suisse and Valcambi investment-grade bars. 999.9 fine gold.",
    href: "/products/investment-bars",
    image: img("8f1290_88c6890bc46f48fbb27cd2299a04d9b8mv2-1.webp"),
  },
  {
    id: "silver",
    title: "Silver Bars",
    description: "Fine silver bullion bars in various weights.",
    href: "/products/silver-bars",
    image: img("8f1290_c2e6be83872a4eeea04170a56c364c49mv2.webp"),
  },
  {
    id: "coins",
    title: "Gold & Silver Coins",
    description:
      "Gold coins from 22K to 24K and silver coins in various weights.",
    href: "/products/coins",
    image: img("8f1290_5944fe89fa674140822321d288cb54a4mv2.webp"),
  },
];

export const productCategoryPages = {
  "kilo-bars": {
    title: "Kilo Bars",
    description: "Gold and silver kilo bar options from 995.0 to 999.9 purity.",
    wcCategorySlug: "kilo-bars",
  },
  "tola-bars": {
    title: "Tola Bars",
    description: "Gold tola bar options in various weights.",
    wcCategorySlug: "tola-bars",
  },
  "investment-bars": {
    title: "Investment Bars",
    description: "PAMP, Credit Suisse and Valcambi investment-grade bars.",
    wcCategorySlug: "investment-bars",
  },
  "silver-bars": {
    title: "Silver Bars",
    description: "Fine silver bullion bars in various weights.",
    wcCategorySlug: "silver-bars",
  },
  coins: {
    title: "Gold & Silver Coins",
    description: "Gold coins 22K–24K and silver coins.",
    wcCategorySlug: "gold-silver-coins",
  },
  "gold-bars": {
    title: "Investment Bars",
    description: "PAMP, Credit Suisse and Valcambi gold bars.",
    wcCategorySlug: "investment-bars",
  },
} as const;

export type ProductCategorySlug = keyof typeof productCategoryPages;
