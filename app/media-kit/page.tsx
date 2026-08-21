import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import Button from "@/components/ui/Button";
import { company } from "@/lib/data/company";
import { founder } from "@/lib/data/founder";

export const metadata: Metadata = { title: "Media Kit" };

const assets = [
  { label: "Company Logos", format: "PNG, SVG" },
  { label: "Founder Headshots", format: "JPG" },
  { label: "Production Stills", format: "JPG" },
  { label: "Brand Guidelines", format: "PDF" }
];

export default function MediaKitPage() {
  return (
    <section className="bg-offwhite pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container-page">
        <SectionHeading eyebrow="Press" title="Media Kit" description="Company profile, founder biography, logos, and brand assets." />

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold text-charcoal">Company Bio</h2>
            <p className="mt-4 leading-relaxed text-charcoal/70">{company.bio}</p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-charcoal">Founder Bio</h2>
            <p className="mt-4 leading-relaxed text-charcoal/70">{founder.bio}</p>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-xl font-bold text-charcoal">Downloadable Assets</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {assets.map((a) => (
              <div key={a.label} className="rounded-2xl border border-charcoal/8 bg-white p-5 shadow-card">
                <PlaceholderMedia label={a.format} ratio="square" dark={false} />
                <p className="mt-4 text-sm font-semibold text-charcoal">{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <Button href={`mailto:${company.contact.email}?subject=Media%20Kit%20Request`}>Request Full Press Kit</Button>
        </div>
      </div>
    </section>
  );
}
