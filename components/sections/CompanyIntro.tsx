"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { company } from "@/lib/data/company";
import { founder } from "@/lib/data/founder";
import { productions } from "@/lib/data/productions";

const ease = [0.16, 1, 0.3, 1] as const;
const SLIDE_DURATION = 4500;

// Drop real stills at these paths; each falls back to a quiet tonal
// gradient (no broken-image icon) until the file exists.
const frames = [
  { id: "on-set", caption: "On Set — Lagos", image: "/images/founder/set.png", gradient: "from-[#2a2622] to-[#1a1815]" },
  { id: "sands-of-time", caption: "Sands of Time — Production Still", image: "/images/founder/sot.PNG", gradient: "from-[#241f19] to-[#151210]" },
  { id: "founder-directing", caption: "Stellamaris Duru — Directing", image: "/images/founder/1.jpg", gradient: "from-[#28221c] to-[#171310]" }
];

const meta = [
  { label: "Founder", value: founder.name },
  { label: "Flagship Series", value: productions[0].title },
  { label: "Based In", value: "Lagos, Nigeria" }
];

export default function CompanyIntro() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % frames.length);
    }, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, prefersReducedMotion]);

  const frame = frames[index];

  return (
    <section className="relative overflow-hidden border-b border-charcoal/8 bg-offwhite py-24 md:py-32">
      <div className="container-page grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-24">
        {/* ---- Image slideshow: a small cinematic viewfinder, not a stock photo box ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          {/* Film-perforation ticks running down the left margin — a quiet
              nod to the reel motif in the logo, unique to this brand. */}
          <div className="pointer-events-none absolute -left-7 bottom-6 top-6 hidden w-2 flex-col justify-between sm:flex">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="h-2 w-2 rounded-[2px] bg-charcoal/10" />
            ))}
          </div>

          {/* Offset card peeking out behind — stacked-photo depth */}
          <div
            aria-hidden="true"
            className="absolute -right-4 -top-4 hidden h-full w-full rotate-2 rounded-[1.75rem] border border-charcoal/10 bg-white sm:block"
          />

          {/* Main frame — corner is clipped like a print pulled from a sleeve */}
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] shadow-card"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 9% 100%, 0 89%)" }}
          >
            <AnimatePresence mode="sync">
              <motion.div
                key={frame.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease }}
                className="absolute inset-0"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: prefersReducedMotion ? 1 : 1.06 }}
                  transition={{ duration: SLIDE_DURATION / 1000 + 0.6, ease: "linear" }}
                  className="h-full w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- small
                      inline slideshow crossfade; next/image's fill + AnimatePresence
                      key-swap fights the exit transition here. */}
                  <img
                    src={frame.image}
                    alt={frame.caption}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Gradient sits beneath the <img> as a permanent base tone, so a
                missing file quietly shows color instead of a broken icon. */}
            <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${frame.gradient}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent" />

            {/* Viewfinder HUD — small REC readout, top right */}
            <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-charcoal/70 px-3 py-1.5 backdrop-blur-sm">
              {!prefersReducedMotion && (
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="h-1.5 w-1.5 rounded-full bg-orange"
                />
              )}
              <span className="font-mono text-[10px] tracking-wider text-offwhite/80">REC</span>
            </div>

            {/* Museum-placard caption, bottom left */}
            <div className="absolute bottom-4 left-4 max-w-[80%] rounded-full bg-charcoal/75 px-4 py-2 backdrop-blur-sm">
              <p className="truncate text-[10px] font-medium uppercase tracking-[0.2em] text-offwhite/85">
                {frame.caption}
              </p>
            </div>
          </div>

          {/* Slide ticks — same quiet language as the hero, tuned for a light background */}
          <div className="mt-6 flex items-center gap-2">
            {frames.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setIndex(i)}
                aria-label={`Show frame ${i + 1}: ${f.caption}`}
                aria-current={i === index}
                className="group relative h-[2px] w-8 overflow-hidden rounded-full bg-charcoal/12 transition-colors duration-300 hover:bg-charcoal/25"
              >
                {i === index && (
                  <motion.span
                    key={`${frame.id}-progress`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused || prefersReducedMotion ? undefined : 1 }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                    className="absolute inset-0 origin-left bg-gradient-to-r from-orange to-gold"
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-charcoal/40" />}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---- Copy ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">Who We Are</p>

          <h2 className="mt-6 font-body text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.15] tracking-tight text-charcoal">
            {company.tagline}
          </h2>

          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-charcoal/65">{company.bio}</p>

          <dl className="mt-11 grid max-w-lg grid-cols-1 gap-6 border-t border-charcoal/10 pt-8 sm:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/40">
                  {item.label}
                </dt>
                <dd className="mt-1.5 font-body text-sm font-medium text-charcoal">{item.value}</dd>
              </div>
            ))}
          </dl>

          <Link href="/#" className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-charcoal">
            <span className="relative">
              Read our full story
              <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-charcoal transition-transform duration-300 ease-cinematic group-hover:scale-x-100" />
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