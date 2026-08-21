"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "../ui/SectionHeading";
import PlaceholderMedia from "../ui/PlaceholderMedia";
import { news } from "@/lib/data/news";

export default function NewsGrid() {
  return (
    <section className="bg-offwhite py-24 md:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Latest" title="News & Updates" />
          <Link href="/news" className="text-sm font-semibold text-orange hover:underline">
            View all news →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {news.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/news#${post.slug}`} className="group block">
                <PlaceholderMedia label={post.category} ratio="video" />
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
                  {post.category} · {post.date}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-charcoal group-hover:text-orange">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60 line-clamp-3">{post.excerpt}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
