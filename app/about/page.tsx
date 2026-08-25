"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import RecognitionStrip from "@/components/sections/RecognitionStrip";
import MasterclassCTA from "@/components/sections/MasterclassCTA";
import ApertureIcon from "@/components/ui/ApertureIcon";
import { company } from "@/lib/data/company";
import { founder, masterclass } from "@/lib/data/founder";
import {
  oneLiner,
  snapshot,
  differentiators,
  mission,
  vision,
  values,
  industry,
  founderRecognitionSummary
} from "@/lib/data/about";

const ease = [0.16, 1, 0.3, 1] as const;
const KEN_BURNS_DURATION = 24;

function FadeIn({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 15L15 3M15 3H6M15 3V12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Falls back to a quiet tonal gradient (no broken-image icon) if the file
// isn't there yet — same safety net used in the homepage's About slideshow.
function StripImage({ src, gradient, className = "" }: { src: string; gradient: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-charcoal ${className}`}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element -- graceful onError fallback needs a plain <img>
        <img
          src={src}
          alt=""
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      )}
    </div>
  );
}

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const [founderImageFailed, setFounderImageFailed] = useState(false);

return (
  <>
      {/* =========================================================
          HERO — fixed background (true position: fixed, not
          background-attachment, so it works identically on iOS Safari
          and desktop). This section must never carry its own background
          color/image class: a background painted directly on the
          section renders ABOVE a negative-z-index fixed child, silently
          hiding it — the exact bug the homepage hero hit. The fixed
          layer also ignores <main>'s scroll-clearance padding entirely,
          which is what lets it start at the true top of the viewport.
      ========================================================= */}
      <section className="relative min-h-screen overflow-hidden text-offwhite">
        <div className="fixed inset-0 -z-10">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: prefersReducedMotion ? 1 : 1.06 }}
            transition={{ duration: KEN_BURNS_DURATION, ease: "linear" }}
            className="relative h-full w-full"
          >
            <picture className="absolute inset-0 block h-full w-full">
              <source media="(max-width: 767px)" srcSet="/images/hero/sum.png" />
              {/* eslint-disable-next-line @next/next/no-img-element -- native <picture>/<source>
                  art direction isn't supported by next/image; matches the homepage hero. */}
              <img src="/images/hero/simm.png" alt="Chuchin Ultimate Productions" className="h-full w-full object-cover" />
            </picture>
          </motion.div>

          {/* Legibility scrim — same recipe as the homepage hero */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/25 to-transparent" />

          {/* One quiet ambient glow — same restrained single-accent rule used everywhere else */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{ x: [0, 35, -15, 0], y: [0, -20, 15, 0] }}
              transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -right-36 -top-36 h-[36rem] w-[36rem] rounded-full bg-orange/[0.08] blur-[160px]"
            />
          )}
        </div>

        {/* Decorative aperture mark */}
        <div className="pointer-events-none absolute -right-36 -top-36 opacity-[0.08]">
          <ApertureIcon size={420} spin />
        </div>

        <div className="container-page relative z-10 flex min-h-screen flex-col justify-between py-8 md:py-10">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-offwhite/60">Our Story</p>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-offwhite/50">
              <span className="hidden sm:block">Creative Excellence</span>
              <span className="h-px w-8 bg-offwhite/30" />
              <span>01</span>
            </div>
          </div>

          {/* Hero content */}
          <div className="grid gap-12 pb-4 lg:grid-cols-[1fr_320px] lg:items-end">
            <FadeIn className="max-w-5xl">
              <p className="mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-offwhite/65">
                <span className="h-px w-8 bg-orange" />
                Who We Are
              </p>

              <h1 className="max-w-5xl font-body text-[clamp(3.4rem,8vw,7.5rem)] font-light leading-[0.9] tracking-[-0.055em] text-offwhite">
                We are building
                <br />
                <span className="text-offwhite/55">the future of</span>
                <br />
                African creativity.
              </h1>

              <div className="mt-10 flex flex-wrap items-center gap-5">
                <div className="h-px w-12 bg-orange" />
                <p className="max-w-lg text-sm font-light leading-relaxed text-offwhite/65 md:text-base">
                  {company.bio}
                </p>
              </div>
            </FadeIn>

            {/* Floating hero card */}
            <FadeIn delay={0.15}>
              <div className="border border-white/15 bg-charcoal/50 p-6 backdrop-blur-xl md:p-7">
                <div className="flex items-start justify-between">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/40">Our Perspective</span>
                  <span className="text-orange">
                    <ArrowIcon />
                  </span>
                </div>

                <p className="mt-10 font-body text-xl font-light leading-snug text-offwhite">{oneLiner}</p>

                <div className="mt-8 h-px bg-white/10" />

                <div className="mt-5 flex items-end justify-between">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-offwhite/40">Based In</span>
                  <span className="font-display text-sm text-offwhite/70">{snapshot[1].value}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom scroll cue */}
        <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-white/10">
          <div className="container-page flex items-center justify-between py-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/40">Scroll to explore</span>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="text-offwhite/50"
            >
              ↓
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================
          VISUAL INTRO
      ========================================================= */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="container-page">
          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-charcoal/40">The Company</p>
              <h2 className="max-w-4xl font-body text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] tracking-tight text-charcoal">
                We don&apos;t simply participate in the industry.
                <span className="text-charcoal/35"> We are shaping where it goes next.</span>
              </h2>
            </div>
          </FadeIn>

          {/* Image strip — drop real stills at /images/about/4.jpg, 5.jpg,
              6.jpg; each falls back to a tonal gradient until they exist. */}
          <FadeIn delay={0.1} className="mt-16">
            <div className="grid h-[420px] grid-cols-12 gap-3 md:h-[520px]">
              <StripImage
                src="/images/founder/1.JPG"
                gradient="from-[#2a2622] to-[#1a1815]"
                className="col-span-7 md:col-span-6"
              />
              <StripImage
                src="/images/founder/2.JPG"
                gradient="from-[#241f19] to-[#151210]"
                className="col-span-5 md:col-span-3"
              />
              <StripImage
                src="/images/founder/3.JPG"
                gradient="from-[#28221c] to-[#171310]"
                className="col-span-12 hidden md:col-span-3 md:block"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-12 grid gap-10 lg:grid-cols-2">
            <p className="max-w-xl text-lg font-light leading-relaxed text-charcoal/70">{company.bio}</p>
            <p className="max-w-xl text-lg font-light leading-relaxed text-charcoal/60">{company.extendedBio}</p>
          </FadeIn>

          {/* Snapshot */}
          <FadeIn delay={0.2} className="mt-16">
            <dl className="grid grid-cols-2 gap-y-10 border-t border-charcoal/10 pt-8 sm:grid-cols-4">
              {snapshot.map((item) => (
                <div key={item.label}>
                  <dt className="text-[9px] font-medium uppercase tracking-[0.25em] text-charcoal/40">
                    {item.label}
                  </dt>
                  <dd className="mt-2 font-body text-base font-medium text-charcoal">{item.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      {/* =========================================================
          DIFFERENTIATORS
      ========================================================= */}
      <section className="bg-[#e9e6df] py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr]">
            <FadeIn>
              <div className="sticky top-12">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-charcoal/40">
                  What Makes Us Distinct
                </p>
                <h2 className="mt-6 max-w-sm font-body text-4xl font-light leading-tight tracking-tight text-charcoal md:text-5xl">
                  Different by design.
                </h2>
                <div className="mt-8 h-px w-12 bg-orange" />
              </div>
            </FadeIn>

            <div className="border-t border-charcoal/10">
              {differentiators.map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.06}>
                  <article className="group grid gap-6 border-b border-charcoal/10 py-10 md:grid-cols-[70px_1fr_1fr] md:items-start">
                    <span className="font-display text-sm font-semibold text-orange/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-body text-2xl font-medium tracking-tight text-charcoal transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="max-w-md text-sm font-light leading-relaxed text-charcoal/55">
                      {item.description}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MISSION / VISION
      ========================================================= */}
      <section className="bg-offwhite py-24 md:py-36">
        <div className="container-page">
          <FadeIn>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-charcoal/40">Direction</p>
          </FadeIn>

          <div className="mt-12 grid gap-px overflow-hidden border border-charcoal/10 bg-charcoal/10 lg:grid-cols-2">
            <FadeIn className="bg-offwhite p-10 md:p-16 lg:p-20">
              <span className="font-display text-xs font-semibold text-orange">01</span>
              <p className="mt-12 text-[10px] font-medium uppercase tracking-[0.3em] text-charcoal/40">Mission</p>
              <p className="mt-7 font-body text-3xl font-light leading-tight tracking-tight text-charcoal md:text-4xl">
                {mission}
              </p>
            </FadeIn>

            <FadeIn delay={0.12} className="bg-charcoal p-10 md:p-16 lg:p-20">
              <span className="font-display text-xs font-semibold text-orange">02</span>
              <p className="mt-12 text-[10px] font-medium uppercase tracking-[0.3em] text-offwhite/40">Vision</p>
              <p className="mt-7 font-body text-3xl font-light leading-tight tracking-tight text-offwhite md:text-4xl">
                {vision}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}
      <section className="bg-offwhite pb-28 md:pb-36">
        <div className="container-page">
          <FadeIn>
            <div className="flex items-end justify-between border-b border-charcoal/10 pb-7">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-charcoal/40">Core Values</p>
                <h2 className="mt-5 font-body text-4xl font-light tracking-tight text-charcoal md:text-5xl">
                  The principles behind the work.
                </h2>
              </div>
              <span className="hidden font-display text-xs text-charcoal/30 md:block">
                {String(values.length).padStart(2, "0")} PRINCIPLES
              </span>
            </div>
          </FadeIn>

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value, i) => (
              <FadeIn
                key={value.title}
                delay={i * 0.06}
                className="border-b border-charcoal/10 p-7 first:pl-0 sm:border-r lg:border-b-0 lg:p-8 lg:first:pl-0 lg:last:border-r-0"
              >
                <span className="font-display text-xs text-orange/70">{String(i + 1).padStart(2, "0")}</span>
                <div className="mt-8 h-px w-8 bg-gradient-to-r from-orange to-gold" />
                <h3 className="mt-6 font-body text-lg font-medium text-charcoal">{value.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-charcoal/50">{value.description}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FOUNDER
      ========================================================= */}
      <section className="bg-[#e9e6df] py-24 md:py-36">
        <div className="container-page">
          <div className="mb-14 flex items-end justify-between">
            <FadeIn>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-charcoal/40">Leadership</p>
              <h2 className="mt-5 font-body text-4xl font-light tracking-tight text-charcoal md:text-5xl">
                The person behind the vision.
              </h2>
            </FadeIn>
            <span className="hidden font-display text-xs text-charcoal/30 md:block">01 / FOUNDER</span>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <FadeIn className="relative mx-auto w-full max-w-lg">
              <div className="absolute -left-5 -top-5 hidden h-full w-full rotate-2 border border-charcoal/10 bg-offwhite md:block" />

              <div
                className="relative aspect-[4/5] overflow-hidden bg-charcoal shadow-2xl"
                style={{ clipPath: "polygon(9% 0, 100% 0, 100% 100%, 0 100%, 0 9%)" }}
              >
                {!founderImageFailed ? (
                  // eslint-disable-next-line @next/next/no-img-element -- onError fallback needs a plain <img>
                  <img
                    src={founder.photo}
                    alt={founder.name}
                    onError={() => setFounderImageFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-950" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/50">Founder</p>
                </div>
              </div>

              <div className="absolute -bottom-7 -right-5 flex h-20 w-20 items-center justify-center rounded-full border border-charcoal/10 bg-offwhite shadow-xl">
                <span className="bg-gradient-to-br from-orange to-gold bg-clip-text font-display text-4xl font-bold leading-none text-transparent">
                  “
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-charcoal/40">
                Founder &amp; Chief Executive Officer
              </p>
              <h2 className="mt-6 max-w-xl font-body text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.95] tracking-[-0.04em] text-charcoal">
                {founder.name}
              </h2>
              <div className="mt-8 h-px w-14 bg-orange" />
              <blockquote className="mt-8 max-w-2xl font-body text-2xl font-light italic leading-relaxed text-charcoal/70 md:text-3xl">
                “{founder.quote}”
              </blockquote>
              <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-charcoal/60">{founder.bio}</p>
              <p className="mt-6 max-w-xl text-sm font-light leading-relaxed text-charcoal/45">
                {founderRecognitionSummary}
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal/10 bg-offwhite">
                  <ApertureIcon size={18} />
                </div>
                <p className="text-sm font-light text-charcoal/55">
                  Convener of{" "}
                  <a href="/careers#masterclass" className="font-medium text-charcoal transition-colors hover:text-orange">
                    {masterclass.name}
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* =========================================================
          INDUSTRY / NOLLYWOOD
      ========================================================= */}
      <section className="relative overflow-hidden bg-charcoal py-28 text-offwhite md:py-40">
        {!prefersReducedMotion && (
          <motion.div
            animate={{ x: [0, 35, -15, 0], y: [0, -20, 15, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-orange/[0.08] blur-[150px]"
          />
        )}
        <div className="pointer-events-none absolute -bottom-24 -left-24 opacity-[0.055]">
          <ApertureIcon size={420} spin />
        </div>

        <div className="container-page relative">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
            <FadeIn>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-offwhite/40">
                Where We Sit in Nollywood
              </p>
              <h2 className="mt-6 max-w-md font-body text-4xl font-light leading-tight tracking-tight text-offwhite md:text-5xl">
                Culture moves when creativity moves.
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="max-w-3xl text-xl font-light leading-relaxed text-offwhite/65 md:text-2xl">
                {industry.intro}
              </p>
            </FadeIn>
          </div>

          <div className="mt-20 grid gap-0 border-t border-offwhite/10 lg:grid-cols-3">
            {industry.points.map((point, i) => (
              <FadeIn
                key={point}
                delay={i * 0.1}
                className="border-b border-offwhite/10 py-10 lg:border-b-0 lg:border-r lg:px-10 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <span className="font-display text-sm font-semibold text-orange/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-5 max-w-sm text-sm font-light leading-relaxed text-offwhite/55">{point}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

       <RecognitionStrip />
      <MasterclassCTA />
    </>
  );
}