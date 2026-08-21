import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import { productions } from "@/lib/data/productions";

export const metadata: Metadata = { title: "Productions" };

export default function ProductionsPage() {
  return (
    <section className="bg-offwhite pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container-page">
        <SectionHeading eyebrow="Portfolio" title="Productions" description="Our film, TV, and web series work." />

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          {productions.map((p) => (
            <Link
              key={p.slug}
              href={`/productions/${p.slug}`}
              className="group block rounded-2xl border border-charcoal/8 bg-white p-6 shadow-card transition-transform duration-300 ease-cinematic hover:-translate-y-1"
            >
              <PlaceholderMedia label={p.title} ratio="video" />
              <h3 className="mt-6 font-display text-2xl font-bold text-charcoal group-hover:text-orange">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{p.logline}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                {p.seasons.length} Season{p.seasons.length !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
