import Hero from "@/components/sections/Hero";
import CompanyIntro from "@/components/sections/CompanyIntro";
import FeaturedProduction from "@/components/sections/FeaturedProduction";
import RecognitionStrip from "@/components/sections/RecognitionStrip";
import FounderSpotlight from "@/components/sections/FounderSpotlight";
import MasterclassCTA from "@/components/sections/MasterclassCTA";

import PartnersCTA from "@/components/sections/PartnersCTA";
import NewsletterFooter from "@/components/sections/NewsletterFooter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <FeaturedProduction />
      <RecognitionStrip />
      <FounderSpotlight />
      <MasterclassCTA />
     
      <PartnersCTA />
      <NewsletterFooter />
    </>
  );
}
