import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import RecognitionStrip from "@/components/sections/RecognitionStrip";
import MasterclassCTA from "@/components/sections/MasterclassCTA";
import { company } from "@/lib/data/company";
import { founder } from "@/lib/data/founder";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="bg-offwhite pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container-page">
          <SectionHeading eyebrow="Our Story" title="Telling Africa's stories, on our own terms." />
          <div className="mt-14 grid gap-14 lg:grid-cols-2">
            <p className="text-lg leading-relaxed text-charcoal/75">{company.bio}</p>
            <p className="text-lg leading-relaxed text-charcoal/75">{company.extendedBio}</p>
          </div>
        </div>
      </section>

      <section className="bg-offwhite pb-24 md:pb-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <PlaceholderMedia label={founder.name} ratio="portrait" />
          <div>
            <p className="eyebrow mb-4">Founder &amp; CEO</p>
            <h2 className="text-display-lg font-display font-bold text-charcoal">{founder.name}</h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal/70">{founder.bio}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-charcoal/70">{founder.extendedBio}</p>
          </div>
        </div>
      </section>

      <RecognitionStrip />
      <MasterclassCTA />
    </>
  );
}
