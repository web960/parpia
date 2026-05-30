import { UPLOADS_BASE } from "./assets";

const img = (file: string) =>
  file.startsWith("http") ? file : `${UPLOADS_BASE}${file}`;

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
    image: img("8f1290_97e975c3b777423f8e9a4673371f6d4amv2-1.webp"),
  },
  "tola-bars": {
    title: "Tola Bars",
    description: "Gold tola bar options in various weights.",
    wcCategorySlug: "tola-bars",
    image: img("8f1290_7b0d9c25334f45dbb746fbeda545337dmv2-1.webp"),
  },
  "investment-bars": {
    title: "Investment Bars",
    description: "PAMP, Credit Suisse and Valcambi investment-grade bars.",
    wcCategorySlug: "investment-bars",
    image: img("8f1290_88c6890bc46f48fbb27cd2299a04d9b8mv2-1.webp"),
  },
  "silver-bars": {
    title: "Silver Bars",
    description: "Fine silver bullion bars in various weights.",
    wcCategorySlug: "silver-bars",
    image: img("8f1290_c2e6be83872a4eeea04170a56c364c49mv2.webp"),
  },
  coins: {
    title: "Gold & Silver Coins",
    description: "Gold coins 22K–24K and silver coins.",
    wcCategorySlug: "gold-silver-coins",
    image: img("8f1290_5944fe89fa674140822321d288cb54a4mv2.webp"),
  },
  "gold-bars": {
    title: "Investment Bars",
    description: "PAMP, Credit Suisse and Valcambi gold bars.",
    wcCategorySlug: "investment-bars",
    image: img("8f1290_88c6890bc46f48fbb27cd2299a04d9b8mv2-1.webp"),
  },
} as const;

export type ProductCategorySlug = keyof typeof productCategoryPages;
