import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { masterclass } from "@/lib/data/founder";
import { company } from "@/lib/data/company";

export const metadata: Metadata = { title: "Careers & Casting" };

const tracks = [
  { title: "Casting Calls", description: "Open roles for our current and upcoming productions. Check back for auditions." },
  { title: "Crew Recruitment", description: "We're always looking for experienced production crew across departments." },
  { title: "Internships", description: "Hands-on opportunities for aspiring filmmakers and media professionals." }
];

export default function CareersPage() {
  return (
    <>
      <section className="bg-offwhite pt-16 pb-24 md:pt-24 md:pb-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Careers & Casting"
            title="Join the production."
            description="Openings, auditions, and crew recruitment for Chuchin Ultimate Productions."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {tracks.map((t) => (
              <div key={t.title} className="rounded-2xl border border-charcoal/8 bg-white p-7 shadow-card">
                <h3 className="font-display text-xl font-bold text-charcoal">{t.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-24 text-offwhite md:py-28" id="masterclass">
        <div className="container-page max-w-2xl">
          <p className="eyebrow mb-4">Masterclass</p>
          <h2 className="text-display-lg font-display font-bold">{masterclass.name}</h2>
          <p className="mt-6 text-base leading-relaxed text-offwhite/70 md:text-lg">{masterclass.description}</p>
          <Button href={`mailto:${company.contact.email}?subject=Main%20Character%20Journey%20Registration`} variant="ghost" className="mt-9">
            {masterclass.cta}
          </Button>
        </div>
      </section>
    </>
  );
}
