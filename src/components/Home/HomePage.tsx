import BrandShowcase from "@/components/Home/BrandShowcase/BrandShowcase";
import Categories from "@/components/Home/Categories/Categories";
import CTA from "@/components/Home/CTA/CTA";
import FAQ from "@/components/Home/FAQ/FAQ";
import FeaturedProducts from "@/components/Home/FeaturedProducts/FeaturedProducts";
import Heritage from "@/components/Home/Heritage/Heritage";
import Hero from "@/components/Home/Hero/Hero";
import Reviews from "@/components/Home/Reviews/Reviews";
import Stats from "@/components/Home/Stats/Stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Heritage />
      <BrandShowcase />
      <Stats />
      <Reviews />
      <FAQ />
      <CTA />
    </>
  );
}
