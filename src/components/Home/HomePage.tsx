import BrandShowcase from "@/components/Home/BrandShowcase/BrandShowcase";
import Categories from "@/components/Home/Categories/Categories";
import CTA from "@/components/Home/CTA/CTA";
import FAQ from "@/components/Home/FAQ/FAQ";
import FeaturedProducts from "@/components/Home/FeaturedProducts/FeaturedProducts";
import Heritage from "@/components/Home/Heritage/Heritage";
import Hero from "@/components/Home/Hero/Hero";
import InvestmentPillars from "@/components/Home/InvestmentPillars/InvestmentPillars";
import Reviews from "@/components/Home/Reviews/Reviews";
import ShowroomBanner from "@/components/Home/ShowroomBanner/ShowroomBanner";
import Stats from "@/components/Home/Stats/Stats";
import TradingProcess from "@/components/Home/TradingProcess/TradingProcess";
import TrustedBy from "@/components/Home/TrustedBy/TrustedBy";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Categories />
      <FeaturedProducts />
      <ShowroomBanner />
      <Heritage />
      <InvestmentPillars />
      <BrandShowcase />
      <Stats />
      <TradingProcess />
      <Reviews />
      <FAQ />
      <CTA />
    </>
  );
}
