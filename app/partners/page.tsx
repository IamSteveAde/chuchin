import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { company } from "@/lib/data/company";

export const metadata: Metadata = { title: "Partners & Sponsors" };

const opportunities = [
  {
    title: "Production Sponsorship",
    description: "Back a season of Sands of Time or an upcoming original, with brand integration and credit."
  },
  {
    title: "Distribution & Streaming",
    description: "Bring our catalogue to your platform or territory through licensing and syndication."
  },
  {
    title: "Masterclass Partnership",
    description: "Support The Main Character Journey and help fund the next generation of Nigerian creatives."
  }
];

export default function PartnersPage() {
  return (
    <section className="bg-offwhite pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Partners & Sponsors"
          title="Build the next story with us."
          description="We collaborate with sponsors, distribution partners, and streaming networks who want to bring authentic African stories to wider audiences."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {opportunities.map((o) => (
            <div key={o.title} className="rounded-2xl border border-charcoal/8 bg-white p-7 shadow-card">
              <h3 className="font-display text-xl font-bold text-charcoal">{o.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{o.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Button href={`mailto:${company.contact.email}?subject=Partnership%20Inquiry`}>Start a Conversation</Button>
        </div>
      </div>
    </section>
  );
}
