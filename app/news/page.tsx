import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import { news } from "@/lib/data/news";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <section className="bg-offwhite pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Newsroom"
          title="News & Updates"
          description="Premieres, industry recognition, and behind-the-scenes stories."
        />

        <div className="mt-14 space-y-10">
          {news.map((post) => (
            <article
              key={post.slug}
              id={post.slug}
              className="grid scroll-mt-24 gap-8 border-b border-charcoal/8 pb-10 md:grid-cols-[16rem_1fr]"
            >
              <PlaceholderMedia label={post.category} ratio="video" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                  {post.category} · {post.date}
                </p>
                <h2 className="mt-2 font-display text-2xl font-bold text-charcoal">{post.title}</h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal/70">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
