import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { draftMode } from "next/headers";

import "@/app/globals.css";

import Footer from "@/components/Globals/Footer/Footer";
import GoldPriceTicker from "@/components/Globals/GoldPriceTicker/GoldPriceTicker";
import Header from "@/components/Globals/Header/Header";
import AppProviders from "@/components/Globals/AppProviders";
import { PreviewNotice } from "@/components/Globals/PreviewNotice/PreviewNotice";
import { siteConfig } from "@/data/site";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();

  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning>
        <AppProviders>
          {isEnabled && <PreviewNotice />}
          <GoldPriceTicker />
          <Header />
          <main>{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
