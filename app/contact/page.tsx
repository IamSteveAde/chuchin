import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/data/company";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="bg-offwhite pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container-page grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="Get In Touch" title="Let's talk." />
          <div className="mt-10 space-y-6 text-charcoal/75">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">Email</p>
              <a href={`mailto:${company.contact.email}`} className="mt-1 block font-display text-lg font-semibold text-charcoal hover:text-orange">
                {company.contact.email}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">Phone</p>
              <a href={`tel:${company.contact.phone.replace(/\s/g, "")}`} className="mt-1 block font-display text-lg font-semibold text-charcoal hover:text-orange">
                {company.contact.phone}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/40">Address</p>
              <p className="mt-1 font-medium text-charcoal">{company.contact.address}</p>
            </div>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
