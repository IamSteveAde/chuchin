"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { company } from "@/lib/data/company";
import { founder } from "@/lib/data/founder";
import { productions } from "@/lib/data/productions";
import ApertureIcon from "@/components/ui/ApertureIcon";

const ease = [0.16, 1, 0.3, 1] as const;
const SLIDE_DURATION = 4500;

/* ============================================================
   SLIDES
============================================================ */

const frames = [
  {
    id: "on-set",
    caption: "On Set — Lagos",
    image: "/images/founder/set.png",
    gradient: "from-[#2a2622] to-[#1a1815]",
  },
  {
    id: "sands-of-time",
    caption: "Sands of Time — Production Still",
    image: "/images/founder/sot.PNG",
    gradient: "from-[#241f19] to-[#151210]",
  },
  {
    id: "founder-directing",
    caption: "Stellamaris Chinasa Duru — Directing",
    image: "/images/founder/1.jpg",
    gradient: "from-[#28221c] to-[#171310]",
  },
];

/* ============================================================
   META
============================================================ */

const meta = [
  {
    label: "Founder",
    value: founder.name,
  },
  {
    label: "Flagship Series",
    value: productions[0].title,
  },
  {
    label: "Based In",
    value: "Lagos, Nigeria",
  },
];

/* ============================================================
   FADE IN
============================================================ */

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-100px",
      }}
      transition={{
        duration: 0.9,
        delay,
        ease,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   ICONS
============================================================ */

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <path
        d="M4 16 16 4M16 4H7M16 4v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

/* ============================================================
   COMPANY INTRO
============================================================ */

export default function CompanyIntro() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ----------------------------------------------------------
     AUTOMATIC SLIDESHOW
  ---------------------------------------------------------- */

  useEffect(() => {
    if (paused || prefersReducedMotion) {
      return;
    }

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % frames.length);
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [paused, prefersReducedMotion]);

  const frame = frames[index];

  /* ----------------------------------------------------------
     RENDER
  ---------------------------------------------------------- */

  return (
    <section className="relative overflow-hidden border-b border-charcoal/8 bg-offwhite py-24 md:py-36">

      {/* ========================================================
          BACKGROUND ATMOSPHERE
      ======================================================== */}

      <div className="pointer-events-none absolute -right-32 -top-40 opacity-[0.025]">
        <ApertureIcon
          size={560}
          spin={!prefersReducedMotion}
        />
      </div>

      <div className="pointer-events-none absolute -bottom-64 -left-40 h-[30rem] w-[30rem] rounded-full bg-orange/[0.025] blur-[130px]" />

      {/* Large editorial section number */}
      <div className="pointer-events-none absolute right-[4vw] top-16 select-none font-display text-[18rem] font-bold leading-none tracking-[-0.08em] text-charcoal/[0.025] md:text-[25rem]">
        01
      </div>

      {/* ========================================================
          MAIN
      ======================================================== */}

      <div className="container-page relative">

        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-24">

          {/* ====================================================
              CINEMATIC IMAGE
          ==================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 1,
              ease,
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
          >

            {/* Film strip perforations */}
            <div className="pointer-events-none absolute -left-7 bottom-10 top-10 hidden w-2 flex-col justify-between md:flex">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="h-[7px] w-[7px] rounded-[1px] bg-charcoal/10"
                />
              ))}
            </div>

            {/* Back print */}
            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 hidden h-full w-full rotate-[2.5deg] border border-charcoal/10 bg-white md:block"
            />

            {/* Second print */}
            <div
              aria-hidden="true"
              className="absolute -bottom-4 -left-3 hidden h-full w-full -rotate-[1.5deg] border border-charcoal/5 bg-[#f7f5f0] md:block"
            />

            {/* Main image frame */}
            <div
              className="relative aspect-[4/5] overflow-hidden bg-charcoal shadow-[0_30px_80px_-35px_rgba(0,0,0,0.35)]"
              style={{
                clipPath:
                  "polygon(0 0, 100% 0, 100% 91%, 91% 100%, 0 100%)",
              }}
            >

              {/* Base gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${frame.gradient}`}
              />

              {/* Image transition */}
              <AnimatePresence mode="sync">

                <motion.div
                  key={frame.id}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.1,
                    ease,
                  }}
                  className="absolute inset-0"
                >

                  <motion.img
                    src={frame.image}
                    alt={frame.caption}
                    initial={{
                      scale: 1.02,
                    }}
                    animate={{
                      scale: prefersReducedMotion ? 1 : 1.075,
                    }}
                    transition={{
                      duration: SLIDE_DURATION / 1000 + 1,
                      ease: "linear",
                    }}
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                    className="h-full w-full object-cover"
                  />

                </motion.div>

              </AnimatePresence>

              {/* Cinematic grading */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-charcoal/15" />

              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/20 via-transparent to-transparent" />

              {/* ==================================================
                  VIEWFINDER CORNERS
              ================================================== */}

              <div className="pointer-events-none absolute left-5 top-5 h-7 w-7 border-l border-t border-white/35" />

              <div className="pointer-events-none absolute right-5 top-5 h-7 w-7 border-r border-t border-white/35" />

              <div className="pointer-events-none absolute bottom-5 left-5 h-7 w-7 border-b border-l border-white/35" />

              <div className="pointer-events-none absolute bottom-5 right-5 h-7 w-7 border-b border-r border-white/35" />

              {/* ==================================================
                  RECORDING INDICATOR
              ================================================== */}

              <div className="absolute right-5 top-5 flex items-center gap-2">

                {!prefersReducedMotion && (
                  <motion.span
                    animate={{
                      opacity: [1, 0.25, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="h-1.5 w-1.5 rounded-full bg-orange"
                  />
                )}

                <span className="font-mono text-[9px] tracking-[0.2em] text-white/65">
                  REC
                </span>

              </div>

              {/* ==================================================
                  IMAGE CAPTION
              ================================================== */}

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-5">

                <div>
                  <p className="text-[8px] uppercase tracking-[0.3em] text-white/40">
                    Chuchin Ultimate Productions
                  </p>

                  <p className="mt-2 max-w-[240px] text-[10px] font-medium uppercase tracking-[0.18em] text-white/80">
                    {frame.caption}
                  </p>
                </div>

                <span className="hidden text-white/40 sm:block">
                  <PlayIcon />
                </span>

              </div>

            </div>

            {/* ==================================================
                SLIDESHOW CONTROLS
            ================================================== */}

            <div className="mt-7 flex items-center justify-between">

              <div className="flex items-center gap-2">

                {frames.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show frame ${i + 1}: ${item.caption}`}
                    aria-current={i === index}
                    className="group relative h-[3px] w-10 overflow-hidden bg-charcoal/10"
                  >

                    {i === index && (
                      <motion.span
                        key={`${frame.id}-progress`}
                        initial={{
                          scaleX: 0,
                        }}
                        animate={{
                          scaleX:
                            paused || prefersReducedMotion
                              ? 0.35
                              : 1,
                        }}
                        transition={{
                          duration: paused
                            ? 0.3
                            : SLIDE_DURATION / 1000,
                          ease: "linear",
                        }}
                        className="absolute inset-0 origin-left bg-gradient-to-r from-orange to-gold"
                      />
                    )}

                    {i < index && (
                      <span className="absolute inset-0 bg-charcoal/30" />
                    )}

                  </button>
                ))}

              </div>

              <span className="font-mono text-[9px] tracking-[0.15em] text-charcoal/30">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(frames.length).padStart(2, "0")}
              </span>

            </div>

          </motion.div>


          {/* ====================================================
              TEXT CONTENT
          ==================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              margin: "-100px",
            }}
            transition={{
              duration: 1,
              delay: 0.12,
              ease,
            }}
            className="relative"
          >

            {/* Eyebrow */}
            <div className="flex items-center gap-4">

              <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-charcoal/40">
                Who We Are
              </span>

              <span className="h-px w-8 bg-orange" />

              <span className="font-mono text-[9px] text-charcoal/25">
                01
              </span>

            </div>


            {/* Main heading */}
            <h2 className="mt-7 max-w-3xl font-body text-[clamp(2.8rem,5.5vw,5.7rem)] font-light leading-[0.94] tracking-[-0.05em] text-charcoal">
              {company.tagline}
            </h2>


            {/* Intro copy */}
            <div className="mt-9 flex max-w-2xl gap-4">

              <span className="mt-2 h-12 w-px shrink-0 bg-gradient-to-b from-orange to-gold" />

              <p className="text-base font-light leading-relaxed text-charcoal/60 md:text-lg">
                {company.bio}
              </p>

            </div>


            {/* ==================================================
                COMPANY META
            ================================================== */}

            <div className="mt-12 border-y border-charcoal/10">

              <dl className="grid sm:grid-cols-3">

                {meta.map((item, i) => (
                  <div
                    key={item.label}
                    className={`py-6 ${
                      i !== 0
                        ? "border-t border-charcoal/10 sm:border-l sm:border-t-0 sm:pl-6"
                        : ""
                    }`}
                  >

                    <dt className="text-[8px] font-medium uppercase tracking-[0.25em] text-charcoal/35">
                      {item.label}
                    </dt>

                    <dd className="mt-3 max-w-[170px] font-body text-sm font-medium leading-snug text-charcoal">
                      {item.value}
                    </dd>

                  </div>
                ))}

              </dl>

            </div>


            {/* ==================================================
                CTA
            ================================================== */}

            <div className="mt-10 flex flex-wrap items-center gap-7">

              <Link
                href="/about"
                className="group inline-flex items-center gap-4 border-b border-charcoal/20 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-charcoal transition-colors duration-300 hover:border-orange hover:text-orange"
              >

                <span>
                  Read our full story
                </span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </Link>

              <span className="text-[9px] uppercase tracking-[0.2em] text-charcoal/25">
                Lagos · Nigeria
              </span>

            </div>

          </motion.div>

        </div>


        {/* ========================================================
            BOTTOM BRAND LINE
        ======================================================== */}

        <FadeIn
          delay={0.2}
          className="mt-24 md:mt-32"
        >

          <div className="flex items-center justify-between border-t border-charcoal/10 pt-5">

            <span className="text-[8px] uppercase tracking-[0.3em] text-charcoal/25">
              Stories · People · Culture
            </span>

            <span className="font-mono text-[8px] tracking-[0.15em] text-charcoal/20">
              CUP / 001
            </span>

          </div>

        </FadeIn>

      </div>

    </section>
  );
}