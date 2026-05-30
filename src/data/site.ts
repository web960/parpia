import { PARPIA_ASSETS } from "./assets";

export const siteConfig = {
  name: "Parpia Gold",
  legalName: "Parpia Gold and Jewels Trading LLC",
  tagline: "The Investment For A Lifetime",
  description:
    "Parpia Gold and Jewels Trading LLC is a UAE based company operating in the markets of Africa, Asia and Europe. Expertise in gold bars, pearls, precious stones and scrap trading from Dubai Gold Souk.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  logo: PARPIA_ASSETS.logo,
  phone: "+971 4 296 4129",
  whatsapp: "+971 58 572 2257",
  email: "info@parpiagold.com",
  address: {
    line1: "4th Floor, Office No. 401, Belselah Gold Centre",
    line2: "Sikkat Al Khail Road, Gold Souk, Deira",
    city: "Dubai",
    country: "U.A.E",
  },
  hours: "Sunday – Thursday: 9:00 – 18:00",
  disclaimer:
    "Live rates provides gold, silver and platinum prices obtained from various sources believed to be reliable, but we do not guarantee their accuracy. Price data are provided without warranty or claim of reliability.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Precious Metal Trading", href: "/services#precious-metals" },
      { label: "Precious Stones & Pearls", href: "/services#stones-pearls" },
      { label: "Gold & Silver Scrap", href: "/services#scrap" },
      { label: "Dealing Services", href: "/services#dealing" },
      { label: "Refining Services", href: "/services#refining" },
      { label: "Storage", href: "/services#storage" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Kilo Bars", href: "/products/kilo-bars" },
      { label: "Tola Bars", href: "/products/tola-bars" },
      { label: "Investment Bars", href: "/products/investment-bars" },
      { label: "Gold & Silver Coins", href: "/products/coins" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "Open Account", href: "/open-account" },
];

export const heroSlides = [
  {
    id: 1,
    eyebrow: "Invest In Gold",
    title: "The Investment For A Lifetime",
    subtitle:
      "Investment-grade bullions and coins from world-renowned refiners. Competitive pricing and reliable services.",
    cta: "View Bullions",
    href: "/products",
    image: PARPIA_ASSETS.heroInvestGold,
  },
  {
    id: 2,
    eyebrow: "Buy & Sell Gold Scrap",
    title: "Get More Cash For Your Scrap Gold",
    subtitle:
      "We offer the best value for trading gold and silver scraps with options to exchange for kilo bars, tola bars and dore bars.",
    cta: "Gold Scrap Services",
    href: "/services#scrap",
    image: PARPIA_ASSETS.heroGoldScrap,
  },
  {
    id: 3,
    eyebrow: "Precious Stones & Pearls",
    title: "Pearls & Precious Stones Trading",
    subtitle:
      "Buying, selling and exchange of natural, cultured and artificial pearls, diamonds, emeralds and precious stones.",
    cta: "Our Services",
    href: "/services#stones-pearls",
    image: PARPIA_ASSETS.heroPreciousStones,
  },
];

export const categories = [
  {
    title: "Bullions",
    description: "Gold and silver kilo, tola and investment bars",
    href: "/products",
    image: PARPIA_ASSETS.kiloBar,
  },
  {
    title: "Coins",
    description: "Gold coins 22K–24K and silver coins in various weights",
    href: "/products/coins",
    image:
      "https://parpiagold.com/wp-content/uploads/2024/03/8f1290_5944fe89fa674140822321d288cb54a4mv2.webp",
  },
  {
    title: "Gold Scrap",
    description: "Buy & sell scrap gold — get more cash for your scrap",
    href: "/services#scrap",
    image: PARPIA_ASSETS.goldJewelry,
  },
  {
    title: "Precious Stones",
    description: "Pearls, diamonds, emeralds and precious stone trading",
    href: "/services#stones-pearls",
    image: PARPIA_ASSETS.heroPreciousStones,
  },
];

export const services = [
  {
    id: "precious-metals",
    title: "Precious Metal Trading",
    description:
      "Buying, selling and exchange of basic ores of gold, silver, platinum and other precious metals. These can be in pre-extraction form of ingots, blocks, threads or chips in pre-forming manufacturing.",
  },
  {
    id: "stones-pearls",
    title: "Precious Stones & Pearls Trading",
    description:
      "Buying, selling and exchange of natural, cultured and artificial pre-formed pearls, diamonds, corundum, emerald, coral, precious stones and other jewellery prior to cutting and polishing.",
  },
  {
    id: "scrap",
    title: "Gold & Silver Scrap",
    description:
      "Our exclusive service in trading gold and silver scraps. We offer the best value with options to exchange for kilo bars, tola bars and dore bars. Specialized conversion of scraps into pure gold or silver bars.",
  },
  {
    id: "dealing",
    title: "Dealing Services",
    description:
      "Invest in gold as a safe haven to protect your wealth. Our dealing services help you invest in gold or silver with state-of-the-art trading platforms.",
  },
  {
    id: "refining",
    title: "Refining Services",
    description:
      "Refining and assaying through highly reputable partners in UAE, Africa and Asia. Melting and transforming scrap jewellery into highest quality gold bars.",
  },
  {
    id: "storage",
    title: "Storage",
    description:
      "Secure storage solutions for your precious metals. Our partners maintain the highest standards of security and accountability.",
  },
];

export const brandShowcases = [
  {
    id: "pamp",
    title: "PAMP Suisse",
    subtitle: "Swiss Excellence — LBMA Good Delivery",
    description:
      "PAMP Suisse gold bars are accredited under LBMA Good Delivery standard. Each bar is individually assayed and sealed in CertiPAMP™ protective packaging with an official Assay Certificate.",
    href: "/products/investment-bars",
    image:
      "https://parpiagold.com/wp-content/uploads/2024/03/8f1290_88c6890bc46f48fbb27cd2299a04d9b8mv2-1.webp",
  },
  {
    id: "valcambi",
    title: "Valcambi Suisse",
    subtitle: "One of the World's Largest Refineries",
    description:
      "Valcambi Suisse is accredited as LBMA Good Delivery. Advanced refining technology ensures 999.9 purity across all production batches with full traceability.",
    href: "/products/investment-bars",
    image:
      "https://parpiagold.com/wp-content/uploads/2024/03/8f1290_9fa37d956d384d60a5d201ab1937a6f9mv2-1.webp",
  },
  {
    id: "credit-suisse",
    title: "Credit Suisse",
    subtitle: "Trusted Swiss Refiner",
    description:
      "Credit Suisse investment bars are recognized globally for quality and authenticity. Available in various weights from 1 gram to 20 grams and beyond.",
    href: "/products/investment-bars",
    image:
      "https://parpiagold.com/wp-content/uploads/2024/03/8f1290_b1b5d0b0c47e40d28a9ef0f601f4c2e9mv2-1.webp",
  },
];

export const stats = [
  { value: "49", label: "Products In Catalog" },
  { value: "3", label: "Continents Served" },
  { value: "999.9", label: "Fine Gold Purity" },
  { value: "24/7", label: "Market Pricing" },
];

export const reviews = [
  {
    name: "Ahmed Al-M.",
    text: "Competitive price and reliable services. Parpia Gold has been my go-to for bullion trading in Dubai Gold Souk.",
    rating: 5,
    date: "Recent",
  },
  {
    name: "Sarah K.",
    text: "Professional team for scrap gold trading. They converted my scrap into pure gold bars with transparent pricing.",
    rating: 5,
    date: "Recent",
  },
  {
    name: "Rajesh P.",
    text: "Excellent range of PAMP and Valcambi bars. The office in Gold Souk is easy to find and staff are knowledgeable.",
    rating: 5,
    date: "Recent",
  },
];

export const faqItems = [
  {
    question: "What products does Parpia Gold offer?",
    answer:
      "We offer kilo bars, tola bars, investment bars (PAMP, Credit Suisse, Valcambi), gold and silver coins, gold & silver scrap trading, precious stones and pearls trading.",
  },
  {
    question: "How are prices determined?",
    answer:
      "Pricing is derived from prevailing international spot markets. Live rates for gold, silver and platinum are provided — contact us for current pricing on specific products.",
  },
  {
    question: "Do you buy scrap gold?",
    answer:
      "Yes. Gold and silver scrap trading is one of our main services. We offer competitive rates and can convert scrap into pure gold or silver bars, kilo bars, or tola bars.",
  },
  {
    question: "Where is your office located?",
    answer:
      "4th Floor, Office No. 401, Belselah Gold Centre, Sikkat Al Khail Road, Gold Souk, Deira, Dubai, U.A.E.",
  },
  {
    question: "Can I visit in person?",
    answer:
      "Yes. Office visits are welcome during business hours. Contact us via phone or WhatsApp to schedule an appointment.",
  },
  {
    question: "Disclaimer on live rates",
    answer: siteConfig.disclaimer,
  },
];

export const trustBadges = [
  "Official UAE Company",
  "Gold Souk, Deira Dubai",
  "PAMP · Valcambi · Credit Suisse",
  "Scrap Gold & Silver Trading",
  "Live Market Pricing",
];

export const footerLinks = {
  products: [
    { label: "Kilo Bars", href: "/products/kilo-bars" },
    { label: "Tola Bars", href: "/products/tola-bars" },
    { label: "Investment Bars", href: "/products/investment-bars" },
    { label: "Gold & Silver Coins", href: "/products/coins" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Open Account", href: "/open-account" },
  ],
  legal: [
    { label: "Disclaimer", href: "/#faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
