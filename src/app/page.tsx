import { HeroSection } from "@/components/hero";
import { AboutUs } from "@/components/home/about-us";
import { FeaturedVehicles } from "@/components/home/featured-vehicles";
import { ServicesOverview } from "@/components/home/services-overview";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutUs />
      <FeaturedVehicles />
      <ServicesOverview />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </div>
  );
}
