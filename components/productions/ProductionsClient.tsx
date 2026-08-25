"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

import PlaceholderMedia from "@/components/ui/PlaceholderMedia";
import { productions } from "@/lib/data/productions";

const ease = [0.16, 1, 0.3, 1] as const;

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
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

function ScrollArrow() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path
        d="M10 3v13M5.5 11.5 10 16l4.5-4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
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

export default function ProductionsClient() {
  const featured = productions[0];
  const remaining = productions.slice(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;

    if (!video || prefersReducedMotion) return;

    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // Browser blocked autoplay.
      }
    };

    playVideo();

    return () => {
      video.pause();
    };
  }, [prefersReducedMotion]);

  return (
    <main className="overflow-hidden bg-offwhite">

      {/* ========================================================
          CINEMATIC HERO
      ======================================================== */}

      <section className="relative isolate h-[100svh] min-h-[680px] overflow-hidden bg-charcoal text-offwhite">

        {/* VIDEO BACKGROUND */}

        <div className="absolute inset-0 -z-10">

          {!prefersReducedMotion ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover object-center"
              aria-hidden="true"
            >
              <source
                src="/images/happy.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            <div className="absolute inset-0 bg-[#24211e]" />
          )}

          {/* Dark cinematic grade */}
          <div className="absolute inset-0 bg-charcoal/35" />

          {/* Left readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/55 to-charcoal/10" />

          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-charcoal/20" />

          {/* Warm cinematic tint */}
          <div className="absolute inset-0 bg-orange/[0.035] mix-blend-screen" />

        </div>


        {/* ======================================================
            HERO CONTENT
        ====================================================== */}

        <div className="container-page relative z-10 flex h-full flex-col justify-between py-8 md:py-10">

          {/* TOP */}

          <FadeIn>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />

                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-offwhite/60">
                  Chuchin Ultimate Productions
                </span>

              </div>

              <span className="font-mono text-[9px] text-offwhite/35">
                001 / PRODUCTIONS
              </span>

            </div>

          </FadeIn>


          {/* MAIN */}

          <FadeIn
            delay={0.1}
            className="pb-8"
          >

            <p className="mb-7 text-[9px] font-medium uppercase tracking-[0.35em] text-orange">
              Film · Television · Digital
            </p>


            <h1 className="max-w-6xl font-body text-[clamp(4.5rem,11vw,11rem)] font-light leading-[0.78] tracking-[-0.075em] text-offwhite">

              Stories
              <br />

              <span className="text-offwhite/35">
                in motion.
              </span>

            </h1>


            <div className="mt-10 flex max-w-xl items-start gap-4">

              <span className="mt-1 h-12 w-px shrink-0 bg-gradient-to-b from-orange to-gold" />

              <p className="text-sm font-light leading-relaxed text-offwhite/65 md:text-base">
                Original productions created to entertain,
                connect and leave something behind.
              </p>

            </div>


            <div className="mt-9 flex flex-wrap items-center gap-7">

              <a
                href="#productions"
                className="group inline-flex items-center gap-5 border border-offwhite/20 bg-charcoal/30 px-6 py-3.5 text-[9px] font-medium uppercase tracking-[0.2em] text-offwhite/75 backdrop-blur-md transition-all duration-300 hover:border-orange hover:bg-orange hover:text-charcoal"
              >

                <span>
                  Explore Productions
                </span>

                <span className="transition-transform duration-300 group-hover:translate-y-1">
                  ↓
                </span>

              </a>

            </div>

          </FadeIn>


          {/* BOTTOM */}

          <FadeIn
            delay={0.2}
            className="border-t border-offwhite/15 pt-5"
          >

            <div className="flex flex-wrap items-center justify-between gap-5">

              <div className="flex gap-7">

                <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/35">
                  Film
                </span>

                <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/35">
                  TV
                </span>

                <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/35">
                  Web
                </span>

              </div>

              <div className="flex items-center gap-3">

                <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/30">
                  Lagos · Nigeria
                </span>

                <span className="text-orange">
                  <ScrollArrow />
                </span>

              </div>

            </div>

          </FadeIn>

        </div>


        {/* VIDEO STATUS */}

        <div className="absolute bottom-24 right-6 hidden items-center gap-3 md:flex">

          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />

          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-offwhite/35">
            Moving Image
          </span>

        </div>

      </section>


      {/* ========================================================
          INTRO
      ======================================================== */}

      <section
        id="productions"
        className="relative z-10 bg-offwhite py-24 md:py-32"
      >

        <div className="container-page">

          <FadeIn>

            <div className="grid gap-10 lg:grid-cols-[0.35fr_1.65fr]">

              <div>

                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-charcoal/35">
                  The Portfolio
                </p>

                <p className="mt-5 font-mono text-[9px] text-orange">
                  {String(productions.length).padStart(2, "0")} Productions
                </p>

              </div>

              <div>

                <h2 className="max-w-6xl font-body text-[clamp(2.8rem,6vw,6.2rem)] font-light leading-[0.92] tracking-[-0.055em] text-charcoal">

                  Every production
                  <span className="text-charcoal/25">
                    {" "}starts with a reason to tell it.
                  </span>

                </h2>

              </div>

            </div>

          </FadeIn>

        </div>

      </section>


      {/* ========================================================
    FEATURED PRODUCTION
======================================================== */}

{featured && (
  <section className="relative z-10 bg-[#e8e4dc] py-20 md:py-28">

    <div className="container-page">

      <Link
        href={`/productions/${featured.slug}`}
        className="group block"
      >

        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_0.6fr]">

          {/* ==================================================
              FEATURED VIDEO
          ================================================== */}

          <div className="relative overflow-hidden bg-charcoal">

            <div className="relative aspect-[16/9] overflow-hidden">

              <iframe
                src="https://www.youtube.com/embed/fMHjYLxT0AU?autoplay=1&mute=1&loop=1&playlist=fMHjYLxT0AU&playsinline=1&controls=0&rel=0"
                title={`${featured.title} — Featured Production`}
                className="pointer-events-none absolute inset-0 h-full w-full scale-[1.01]"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />

              {/* Cinematic overlay */}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/45 via-transparent to-transparent" />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/10 via-transparent to-charcoal/10" />


              {/* Viewfinder corners */}

              <div className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l border-t border-white/25" />

              <div className="pointer-events-none absolute right-5 top-5 h-8 w-8 border-r border-t border-white/25" />

              <div className="pointer-events-none absolute bottom-5 left-5 h-8 w-8 border-b border-l border-white/25" />

              <div className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b border-r border-white/25" />


              {/* Production number */}

              <div className="absolute left-6 top-6">

                <span className="font-mono text-[9px] text-offwhite/75">
                  01
                </span>

              </div>


              {/* Featured label */}

              <div className="absolute right-5 top-5 border border-offwhite/20 bg-charcoal/65 px-3 py-2 backdrop-blur-xl">

                <div className="flex items-center gap-2">

                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange" />

                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-offwhite/75">
                    Now Playing
                  </span>

                </div>

              </div>


              {/* Bottom video label */}

              <div className="absolute bottom-5 left-6">

                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-offwhite/50">
                  Original Production
                </span>

              </div>

            </div>

          </div>


          {/* ==================================================
              FEATURED COPY
          ================================================== */}

          <div className="pb-2 lg:pl-5">

            <p className="text-[8px] font-medium uppercase tracking-[0.3em] text-orange">
              Flagship Series
            </p>


            <h3 className="mt-5 font-body text-[clamp(2.4rem,4vw,4.5rem)] font-light leading-[0.92] tracking-[-0.045em] text-charcoal transition-colors duration-300 group-hover:text-orange">
              {featured.title}
            </h3>


            <p className="mt-7 max-w-md text-sm font-light leading-relaxed text-charcoal/55">
              {featured.logline}
            </p>


            {/* Metadata */}

            <div className="mt-9 grid grid-cols-2 border-t border-charcoal/10">

              <div className="border-r border-charcoal/10 py-5 pr-5">

                <p className="text-[8px] uppercase tracking-[0.2em] text-charcoal/30">
                  Seasons
                </p>

                <p className="mt-2 font-mono text-sm text-charcoal">
                  {String(featured.seasons.length).padStart(2, "0")}
                </p>

              </div>


              <div className="py-5 pl-5">

                <p className="text-[8px] uppercase tracking-[0.2em] text-charcoal/30">
                  Format
                </p>

                <p className="mt-2 font-mono text-sm text-charcoal">
                  Series
                </p>

              </div>

            </div>


            {/* Explore */}

            <div className="mt-7 flex items-center justify-between">

              <span className="flex items-center gap-4 text-[8px] font-medium uppercase tracking-[0.22em] text-charcoal/40 transition-colors duration-300 group-hover:text-orange">

                <span className="h-px w-8 bg-orange transition-all duration-500 group-hover:w-14" />

                Explore Production

              </span>


              <span className="flex h-11 w-11 items-center justify-center border border-charcoal/15 transition-all duration-300 group-hover:border-orange group-hover:bg-orange">

                <ArrowUpRight />

              </span>

            </div>

          </div>

        </div>

      </Link>

    </div>

  </section>
)}

      {/* ========================================================
          ALL PRODUCTIONS
      ======================================================== */}

      {remaining.length > 0 && (
        <section className="relative z-10 bg-offwhite py-24 md:py-36">

          <div className="container-page">

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <div>

                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-charcoal/35">
                  The Archive
                </p>

                <h2 className="mt-5 font-body text-[clamp(3rem,6vw,6rem)] font-light leading-[0.88] tracking-[-0.055em] text-charcoal">
                  More stories.
                </h2>

              </div>

              <p className="max-w-xs text-sm font-light leading-relaxed text-charcoal/45">
                Explore the productions that make up the
                Chuchin Ultimate Productions catalogue.
              </p>

            </div>


            <div className="mt-16 grid gap-x-8 gap-y-20 md:grid-cols-2">

              {remaining.map((production, index) => (

                <Link
                  key={production.slug}
                  href={`/productions/${production.slug}`}
                  className={`group block ${
                    index % 2 === 1
                      ? "md:mt-24"
                      : ""
                  }`}
                >

                  <div className="relative overflow-hidden bg-charcoal">

                    <div className="aspect-[16/10] transition-transform duration-700 ease-cinematic group-hover:scale-[1.02]">

                      <PlaceholderMedia
                        label={production.title}
                        ratio="video"
                      />

                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="absolute left-5 top-5">

                      <span className="font-mono text-[9px] text-offwhite/70">
                        {String(index + 2).padStart(2, "0")}
                      </span>

                    </div>

                    <div className="absolute right-5 top-5 border border-offwhite/15 bg-charcoal/60 px-3 py-2 backdrop-blur-xl">

                      <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-offwhite/65">
                        {production.seasons.length} Season
                        {production.seasons.length !== 1 ? "s" : ""}
                      </span>

                    </div>

                  </div>


                  <div className="mt-6">

                    <div className="flex items-start justify-between gap-5">

                      <div>

                        <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-charcoal/30">
                          Original Production
                        </p>

                        <h3 className="mt-3 font-body text-2xl font-light tracking-tight text-charcoal transition-colors duration-300 group-hover:text-orange md:text-3xl">
                          {production.title}
                        </h3>

                      </div>

                      <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-charcoal/10 text-charcoal/30 transition-all duration-300 group-hover:border-orange group-hover:bg-orange group-hover:text-charcoal">

                        <ArrowUpRight />

                      </span>

                    </div>


                    <p className="mt-4 max-w-lg text-sm font-light leading-relaxed text-charcoal/55">
                      {production.logline}
                    </p>


                    <div className="mt-6 flex items-center gap-5">

                      <span className="h-px w-8 bg-orange transition-all duration-500 group-hover:w-14" />

                      <span className="text-[8px] font-medium uppercase tracking-[0.22em] text-charcoal/35 transition-colors group-hover:text-orange">
                        Explore Production
                      </span>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </section>
      )}


      {/* ========================================================
          FINAL CTA
      ======================================================== */}

      <section className="relative z-10 overflow-hidden bg-charcoal py-28 text-offwhite md:py-40">

        <div className="pointer-events-none absolute -right-40 -top-40 opacity-[0.05]">

          <div className="h-[520px] w-[520px] rounded-full border border-offwhite/20">

            <div className="absolute inset-[20%] rounded-full border border-offwhite/10" />

            <div className="absolute inset-[40%] rounded-full border border-offwhite/10" />

          </div>

        </div>

        <div className="container-page relative z-10">

          <FadeIn className="text-center">

            <p className="text-[8px] uppercase tracking-[0.35em] text-offwhite/25">
              Chuchin Ultimate Productions
            </p>

            <h2 className="mx-auto mt-7 max-w-5xl font-body text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.85] tracking-[-0.06em]">

              The next story
              <br />

              <span className="text-offwhite/25">
                starts here.
              </span>

            </h2>

            <p className="mx-auto mt-8 max-w-md text-sm font-light leading-relaxed text-offwhite/40">
              Discover the worlds we create and the stories
              we bring to audiences.
            </p>

          </FadeIn>

        </div>

      </section>

    </main>
  );
}