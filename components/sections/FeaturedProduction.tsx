"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import ApertureIcon from "../ui/ApertureIcon";
import { productions } from "@/lib/data/productions";

const ease = [0.16, 1, 0.3, 1] as const;

function embedUrl(youtubeId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: youtubeId,
    controls: "0",
    modestbranding: "1",
    rel: "0",
    playsinline: "1",
    showinfo: "0"
  });
  return `https://www.youtube.com/embed/${youtubeId}?${params.toString()}`;
}

function watchUrl(youtubeId: string) {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

export default function FeaturedProduction() {
  const flagship = productions[0];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-y border-offwhite/10 bg-gradient-to-br from-charcoal via-charcoal-950 to-[#2a1508] py-24 text-offwhite md:py-32">
      {/* Quiet ambient glow — same restrained single-accent language as the hero */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-40 top-0 h-[36rem] w-[36rem] rounded-full bg-orange/[0.07] blur-[160px]"
        />
      )}

      <div className="container-page relative">
        {/* ---- Header ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/45">Flagship Series</p>
          <h2 className="mt-6 font-body text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.15] tracking-tight text-offwhite">
            {flagship.title}
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-offwhite/55">{flagship.logline}</p>
        </motion.div>

        {/* ---- Double feature: two autoplaying season panels, staggered like
              prints laid across a light table rather than a rigid grid ---- */}
        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:gap-6">
          {/* Decorative connector — desktop only, sits in the gap between panels */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:flex">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-offwhite/15 bg-charcoal/80 backdrop-blur-md">
              <ApertureIcon size={26} spin />
            </div>
          </div>

          {flagship.seasons.map((season, i) => (
            <motion.a
              key={season.slug}
              href={season.youtubeId ? watchUrl(season.youtubeId) : `/productions/${flagship.slug}#${season.slug}`}
              target={season.youtubeId ? "_blank" : undefined}
              rel={season.youtubeId ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease }}
              className={`group relative block aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-offwhite/10 bg-charcoal shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-cinematic hover:-translate-y-1 ${
                i === 0 ? "lg:rotate-[-1deg]" : "lg:mt-14 lg:rotate-[1deg]"
              }`}
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 91%, 92% 100%, 0 100%)" }}
            >
              {season.youtubeId ? (
                <>
                  <iframe
                    src={embedUrl(season.youtubeId)}
                    title={season.title}
                    loading="lazy"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    className="pointer-events-none absolute inset-0 h-full w-full scale-[1.35] object-cover"
                  />
                  {/* Muted indicator — same HUD-chip language as the About slideshow */}
                  <div className="pointer-events-none absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-offwhite/15 bg-charcoal/70 px-3 py-1.5 backdrop-blur-sm">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-none stroke-offwhite/80" strokeWidth={1.8}>
                      <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
                      <path d="M17 9l4 6M21 9l-4 6" strokeLinecap="round" />
                    </svg>
                    <span className="font-mono text-[10px] tracking-wider text-offwhite/80">MUTED</span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-950" />
              )}

              {/* Hover scrim + on-brand "play" cue, in place of a generic triangle icon */}
              <div className="absolute inset-0 bg-charcoal/15 transition-colors duration-500 ease-cinematic group-hover:bg-charcoal/40" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-cinematic group-hover:opacity-100">
                <div className="flex flex-col items-center gap-3">
                  <ApertureIcon size={44} spin open={false} />
                  <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-offwhite">
                    Watch on YouTube ↗
                  </span>
                </div>
              </div>

              {/* Bottom caption */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent p-6 pt-16">
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange">Season {i + 1}</p>
                <h3 className="mt-2 font-body text-2xl font-light tracking-tight text-offwhite">{season.title}</h3>
                <p className="mt-2 max-w-xs text-sm font-light leading-relaxed text-offwhite/55">{season.synopsis}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ---- Supporting synopsis + CTA ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="mt-20 max-w-2xl lg:mt-16"
        >
          <p className="text-base font-light leading-relaxed text-offwhite/60">{flagship.synopsis}</p>
          <Link
            href={`#`}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-offwhite"
          >
            <span className="relative">
              View Production
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-offwhite transition-transform duration-300 ease-cinematic group-hover:scale-x-100" />
            </span>
            <span aria-hidden="true" className="transition-transform duration-300 ease-cinematic group-hover:translate-x-1">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}