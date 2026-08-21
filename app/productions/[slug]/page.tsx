import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import { productions } from "@/lib/data/productions";

export function generateStaticParams() {
  return productions.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const production = productions.find((p) => p.slug === params.slug);
  return { title: production?.title ?? "Production" };
}

export default function ProductionDetailPage({ params }: { params: { slug: string } }) {
  const production = productions.find((p) => p.slug === params.slug);
  if (!production) notFound();

  return (
    <article className="bg-offwhite pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container-page">
        <p className="eyebrow mb-4">Production</p>
        <h1 className="text-display-lg font-display font-bold text-charcoal">{production.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal/70">{production.synopsis}</p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <PlaceholderMedia label={`${production.title} — Trailer`} ratio="video" />
          <PlaceholderMedia label="Poster" ratio="portrait" />
        </div>

        {production.seasons.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-charcoal">Seasons</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {production.seasons.map((season) => (
                <div key={season.slug} id={season.slug} className="rounded-2xl border border-charcoal/8 bg-white p-6 shadow-card scroll-mt-24">
                  <PlaceholderMedia label={season.title} ratio="portrait" />
                  <h3 className="mt-5 font-display text-xl font-bold text-charcoal">{season.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{season.synopsis}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {production.awards.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl font-bold text-charcoal">Awards &amp; Recognition</h2>
            <ul className="mt-6 space-y-3">
              {production.awards.map((award) => (
                <li key={award} className="border-b border-charcoal/8 pb-3 text-charcoal/70">
                  {award}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal">Crew</h2>
            <ul className="mt-6 space-y-2 text-charcoal/70">
              {production.crew.map((c) => (
                <li key={c.name}>
                  <span className="font-semibold text-charcoal">{c.role}:</span> {c.name}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal">Gallery</h2>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <PlaceholderMedia label="Still" ratio="square" />
              <PlaceholderMedia label="Still" ratio="square" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
