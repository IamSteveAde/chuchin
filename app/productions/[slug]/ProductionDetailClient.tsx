"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

import ApertureIcon from "@/components/ui/ApertureIcon";
import type {
  Production,
  BroadcastSlot,
  Season,
} from "@/lib/data/productions";

const ease = [0.16, 1, 0.3, 1] as const;
const KEN_BURNS_DURATION = 28;

/* ============================================================
   DAYS
============================================================ */

const dayOrder: BroadcastSlot["day"][] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
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
        y: 26,
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
      className="h-5 w-5"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
    </svg>
  );
}

function VolumeMutedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 fill-none stroke-current"
      strokeWidth={1.7}
      aria-hidden="true"
    >
      <path
        d="M11 5 6 9H3v6h3l5 4V5Z"
        strokeLinejoin="round"
      />
      <path
        d="m17 9 4 6M21 9l-4 6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth={1.4}
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="4.5" />
      <path
        d="m8.5 11.5-1 8 4.5-2.5 4.5 2.5-1-8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   NETWORK
============================================================ */

function initials(name: string) {
  const words = name
    .replace(/\(.*\)/, "")
    .trim()
    .split(/\s+/);

  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

function NetworkLogo({
  network,
  logo,
}: {
  network: string;
  logo?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (logo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- onError fallback needs a plain <img>
      <img
        src={logo}
        alt={network}
        onError={() => setFailed(true)}
        className="h-full w-full object-contain p-3"
      />
    );
  }

  return (
    <span className="font-display text-sm font-semibold text-charcoal/35">
      {initials(network)}
    </span>
  );
}

/* ============================================================
   BROADCAST CARD
============================================================ */

function BroadcastCard({
  slot,
}: {
  slot: BroadcastSlot;
}) {
  return (
    <div className="group relative flex items-center gap-5 border-b border-charcoal/10 py-5 transition-colors duration-300 hover:border-orange/40">

      <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-charcoal/10 bg-white transition-colors duration-300 group-hover:border-orange/30">
        <NetworkLogo
          network={slot.network}
          logo={slot.logo}
        />
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate font-body text-sm font-medium text-charcoal">
          {slot.network}
        </p>

        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-orange">
          {slot.time}
        </p>

      </div>

      <ArrowUpRight />

    </div>
  );
}

/* ============================================================
   SEASON PANEL
============================================================ */

function SeasonPanel({
  season,
  index,
}: {
  season: Season;
  index: number;
}) {
  const videoId =
    season.fullEpisodeYoutubeId ??
    season.youtubeId;

  function embedUrl(id: string) {
    const params = new URLSearchParams({
      autoplay: "1",
      mute: "1",
      loop: "1",
      playlist: id,
      controls: "0",
      modestbranding: "1",
      rel: "0",
      playsinline: "1",
    });

    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }

  const content = (
    <div
      className="group relative overflow-hidden bg-charcoal shadow-[0_30px_70px_-35px_rgba(0,0,0,0.4)]"
      style={{
        clipPath:
          "polygon(0 0, 100% 0, 100% 92%, 92% 100%, 0 100%)",
      }}
    >

      {/* ======================================================
          VIDEO / BACKGROUND
      ====================================================== */}

      <div className="relative aspect-[4/5] overflow-hidden">

        {season.localVideoSrc ? (
          <>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption -- silent
                autoplaying preview, not primary viewing content */}
            <video
              src={season.localVideoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />

            <div className="pointer-events-none absolute right-5 top-5 z-10 flex items-center gap-2 border border-offwhite/15 bg-charcoal/70 px-3 py-2 backdrop-blur-xl">
              <VolumeMutedIcon />

              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-offwhite/70">
                Preview
              </span>
            </div>
          </>
        ) : videoId ? (
          <>
            <iframe
              src={embedUrl(videoId)}
              title={season.title}
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture"
              className="pointer-events-none absolute inset-0 h-full w-full scale-[1.38]"
            />

            <div className="pointer-events-none absolute right-5 top-5 z-10 flex items-center gap-2 border border-offwhite/15 bg-charcoal/70 px-3 py-2 backdrop-blur-xl">
              <VolumeMutedIcon />

              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-offwhite/70">
                Preview
              </span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#28231e] to-[#11100e]" />
        )}

        {/* Image grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/15 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/30 via-transparent to-transparent" />

        {/* Viewfinder */}
        <div className="pointer-events-none absolute left-5 top-5 h-7 w-7 border-l border-t border-white/25" />

        <div className="pointer-events-none absolute right-5 top-5 h-7 w-7 border-r border-t border-white/25" />

        <div className="pointer-events-none absolute bottom-5 left-5 h-7 w-7 border-b border-l border-white/25" />

        <div className="pointer-events-none absolute bottom-5 right-5 h-7 w-7 border-b border-r border-white/25" />


        {/* Hover — only for the YouTube-linked case; a local video has no
            external page to send visitors to. */}
        {videoId && !season.localVideoSrc && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20 opacity-0 transition-all duration-500 group-hover:bg-charcoal/40 group-hover:opacity-100">

            <div className="flex flex-col items-center gap-4 text-center">

              <div className="flex h-14 w-14 items-center justify-center border border-white/25 bg-charcoal/50 backdrop-blur-xl">
                <PlayIcon />
              </div>

              <span className="text-[9px] uppercase tracking-[0.25em] text-offwhite">
                Watch Episode ↗
              </span>

            </div>

          </div>
        )}


        {/* Season information */}
        <div className="absolute inset-x-0 bottom-0 p-7 pt-24">

          <div className="flex items-end justify-between gap-5">

            <div>

              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange">
                Season {String(index + 1).padStart(2, "0")}
              </p>

              <h3 className="mt-3 font-body text-2xl font-light tracking-tight text-offwhite md:text-3xl">
                {season.title}
              </h3>

              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-offwhite/55">
                {season.synopsis}
              </p>

            </div>

            <span className="hidden text-offwhite/30 md:block">
              <ArrowUpRight />
            </span>

          </div>

        </div>

      </div>

    </div>
  );

  // A local video has no external page to link to — only the YouTube
  // case wraps the panel in a link out to the real video page.
  if (!videoId || season.localVideoSrc) {
    return (
      <div
        id={season.slug}
        className="scroll-mt-28"
      >
        {content}
      </div>
    );
  }

  return (
    <a
      id={season.slug}
      href={`https://www.youtube.com/watch?v=${videoId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block scroll-mt-28"
    >
      {content}
    </a>
  );
}

/* ============================================================
   HERO — fixed background (true position: fixed, not
   background-attachment, so it works identically on iOS Safari
   and desktop). This section must never carry its own background
   color/image class: a background painted directly on the section
   renders ABOVE a negative-z-index fixed child, silently hiding
   it. The fixed layer also ignores <main>'s scroll-clearance
   padding entirely, which is what lets it start at the true top
   of the viewport.
============================================================ */

function ProductionHero({
  production,
}: {
  production: Production;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] overflow-hidden text-offwhite">

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="fixed inset-0 -z-10">

        <motion.div
          initial={{
            scale: 1,
          }}
          animate={{
            scale: prefersReducedMotion ? 1 : [1, 1.09, 1],
          }}
          transition={{
            duration: KEN_BURNS_DURATION,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative h-full w-full"
        >

          <picture className="absolute inset-0 block h-full w-full">

            <source
              media="(max-width: 767px)"
              srcSet="/images/hero/tot.png"
            />

            {/* eslint-disable-next-line @next/next/no-img-element -- native <picture>/<source>
                art direction isn't supported by next/image; matches the homepage hero. */}
            <img
              src="/images/hero/tot.png"
              alt={production.title}
              className="h-full w-full object-cover object-center"
            />

          </picture>

        </motion.div>


        {/* Grade */}
        <div className="absolute inset-0 bg-charcoal/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/45 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-charcoal/25" />


        {/* Ambient orange */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{
              x: [0, 30, -15, 0],
              y: [0, -20, 15, 0],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-orange/[0.08] blur-[150px]"
          />
        )}

      </div>


      {/* Aperture */}
      <div className="pointer-events-none absolute -right-32 -top-32 opacity-[0.08]">
        <ApertureIcon
          size={430}
          spin={!prefersReducedMotion}
        />
      </div>


      {/* ======================================================
          HERO CONTENT
      ====================================================== */}

      <div className="container-page relative z-10 flex min-h-[92vh] flex-col justify-between py-10 md:py-14">

        <FadeIn>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/45">
                Original Production
              </span>

            </div>

            <span className="font-mono text-[9px] text-offwhite/25">
              CUP / ORIGINAL
            </span>

          </div>

        </FadeIn>


        <FadeIn
          delay={0.1}
          className="pb-8"
        >

          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-orange">
            Flagship Series
          </p>

          <h1 className="mt-6 max-w-6xl font-body text-[clamp(4rem,9vw,9rem)] font-light leading-[0.83] tracking-[-0.065em] text-offwhite">
            {production.title}
          </h1>

          <div className="mt-9 flex max-w-2xl items-start gap-4">

            <span className="mt-2 h-12 w-px shrink-0 bg-gradient-to-b from-orange to-gold" />

            <p className="text-sm font-light leading-relaxed text-offwhite/60 md:text-base">
              {production.synopsis}
            </p>

          </div>

          <div className="mt-9 flex flex-wrap items-center gap-6">

            <span className="border border-offwhite/15 bg-charcoal/40 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-offwhite/60 backdrop-blur-xl">
              {production.seasons.length} Season
              {production.seasons.length !== 1 ? "s" : ""}
            </span>

            <a
              href="#seasons"
              className="group inline-flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.2em] text-offwhite/60 transition-colors hover:text-orange"
            >
              Explore the series

              <span className="transition-transform duration-300 group-hover:translate-y-1">
                ↓
              </span>
            </a>

          </div>

        </FadeIn>


        <FadeIn
          delay={0.2}
          className="border-t border-white/10 pt-5"
        >

          <div className="flex items-center justify-between">

            <span className="text-[8px] uppercase tracking-[0.3em] text-offwhite/25">
              Story · Culture · Entertainment
            </span>

            <span className="text-[8px] uppercase tracking-[0.3em] text-offwhite/25">
              Lagos · Nigeria
            </span>

          </div>

        </FadeIn>

      </div>

    </section>
  );
}

/* ============================================================
   MAIN PAGE
============================================================ */

export default function ProductionDetailClient({
  production,
}: {
  production: Production;
}) {
  const scheduleByDay = dayOrder
    .map((day) => ({
      day,
      slots: (production.broadcastSchedule ?? []).filter(
        (slot) => slot.day === day
      ),
    }))
    .filter((group) => group.slots.length > 0);

  return (
    <>

      {/* ======================================================
          HERO
      ====================================================== */}

      <ProductionHero production={production} />


      {/* ======================================================
          SERIES INTRO
      ====================================================== */}

      <section className="relative z-10 bg-offwhite py-24 md:py-36">

        <div className="container-page">

          <FadeIn>

            <div className="grid gap-10 lg:grid-cols-[0.35fr_1.65fr]">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/35">
                  The Series
                </p>

                <p className="mt-5 font-mono text-[9px] text-orange">
                  001
                </p>

              </div>

              <div>

                <h2 className="max-w-6xl font-body text-[clamp(2.8rem,6vw,6.2rem)] font-light leading-[0.92] tracking-[-0.055em] text-charcoal">
                  A story worth
                  <span className="text-charcoal/25">
                    {" "}returning to.
                  </span>
                </h2>

                <p className="mt-10 max-w-2xl text-base font-light leading-relaxed text-charcoal/55 md:text-lg">
                  {production.synopsis}
                </p>

              </div>

            </div>

          </FadeIn>


          {/* Production facts */}
          <FadeIn
            delay={0.12}
            className="mt-16"
          >

            <div className="grid border-y border-charcoal/10 sm:grid-cols-3">

              <div className="py-6 sm:pr-8">
                <p className="text-[8px] uppercase tracking-[0.25em] text-charcoal/30">
                  Seasons
                </p>

                <p className="mt-3 font-body text-2xl font-light text-charcoal">
                  {production.seasons.length}
                </p>
              </div>

              <div className="border-t border-charcoal/10 py-6 sm:border-l sm:border-t-0 sm:px-8">
                <p className="text-[8px] uppercase tracking-[0.25em] text-charcoal/30">
                  Broadcast
                </p>

                <p className="mt-3 font-body text-2xl font-light text-charcoal">
                  {scheduleByDay.length > 0
                    ? "Nationwide"
                    : "Digital"}
                </p>
              </div>

              <div className="border-t border-charcoal/10 py-6 sm:border-l sm:border-t-0 sm:pl-8">
                <p className="text-[8px] uppercase tracking-[0.25em] text-charcoal/30">
                  Production
                </p>

                <p className="mt-3 font-body text-2xl font-light text-charcoal">
                  Original
                </p>
              </div>

            </div>

          </FadeIn>

        </div>

      </section>


      {/* ======================================================
          SEASONS
      ====================================================== */}

      <section
        id="seasons"
        className="relative z-10 bg-[#e8e4dc] py-24 md:py-36"
      >

        <div className="container-page">

          <FadeIn>

            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/35">
                  The Archive
                </p>

                <h2 className="mt-5 font-body text-[clamp(3rem,6vw,6rem)] font-light leading-[0.88] tracking-[-0.055em] text-charcoal">
                  Watch the
                  <br />
                  story unfold.
                </h2>

              </div>

              <p className="max-w-xs text-sm font-light leading-relaxed text-charcoal/45">
                Explore every season and revisit the moments
                that shaped the series.
              </p>

            </div>

          </FadeIn>


          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">

            {production.seasons.map((season, index) => (
              <FadeIn
                key={season.slug}
                delay={index * 0.1}
              >
                <SeasonPanel
                  season={season}
                  index={index}
                />
              </FadeIn>
            ))}

          </div>

        </div>

      </section>


      {/* ======================================================
          BROADCAST
      ====================================================== */}

      {scheduleByDay.length > 0 && (
        <section className="relative z-10 bg-offwhite py-24 md:py-36">

          <div className="container-page">

            <FadeIn>

              <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/35">
                    Where to Watch
                  </p>

                  <h2 className="mt-5 font-body text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.92] tracking-[-0.05em] text-charcoal">
                    Find your
                    <br />
                    timebelt.
                  </h2>

                  <p className="mt-7 max-w-sm text-sm font-light leading-relaxed text-charcoal/50">
                    Catch {production.title} across our broadcast
                    partners nationwide.
                  </p>

                </div>


                <div>

                  {scheduleByDay.map((group, index) => (
                    <FadeIn
                      key={group.day}
                      delay={index * 0.04}
                    >

                      <div className="border-t border-charcoal/10 py-5">

                        <div className="flex items-center justify-between">

                          <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-orange">
                            {group.day}
                          </p>

                          <span className="font-mono text-[8px] text-charcoal/25">
                            {String(group.slots.length).padStart(2, "0")}
                          </span>

                        </div>

                        <div className="mt-2 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">

                          {group.slots.map((slot) => (
                            <BroadcastCard
                              key={`${slot.network}-${slot.day}-${slot.time}`}
                              slot={slot}
                            />
                          ))}

                        </div>

                      </div>

                    </FadeIn>
                  ))}

                </div>

              </div>

            </FadeIn>

          </div>

        </section>
      )}


      {/* ======================================================
          AWARDS
      ====================================================== */}

      {production.awards.length > 0 && (
        <section className="relative z-10 bg-[#e8e4dc] py-24 md:py-36">

          <div className="container-page">

            <FadeIn>

              <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/35">
                    Recognition
                  </p>

                  <h2 className="mt-5 font-body text-[clamp(2.8rem,5vw,5rem)] font-light leading-[0.92] tracking-[-0.05em] text-charcoal">
                    Work that
                    <br />
                    travelled.
                  </h2>

                </div>


                <div>

                  <div className="border-t border-charcoal/10">

                    {production.awards.map((award, index) => (
                      <motion.div
                        key={award}
                        initial={{
                          opacity: 0,
                          x: 15,
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.7,
                          delay: index * 0.06,
                          ease,
                        }}
                        className="group flex items-center gap-6 border-b border-charcoal/10 py-7"
                      >

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-charcoal/10 text-orange transition-colors duration-300 group-hover:border-orange">
                          <AwardIcon />
                        </div>

                        <p className="font-body text-base font-light leading-relaxed text-charcoal/70 md:text-lg">
                          {award}
                        </p>

                      </motion.div>
                    ))}

                  </div>

                </div>

              </div>

            </FadeIn>

          </div>

        </section>
      )}


      {/* ======================================================
          CREW
      ====================================================== */}

      {production.crew.length > 0 && (
        <section className="relative z-10 bg-offwhite py-24 md:py-36">

          <div className="container-page">

            <FadeIn>

              <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/35">
                    Behind the Scenes
                  </p>

                  <h2 className="mt-5 font-body text-[clamp(3rem,6vw,6rem)] font-light leading-[0.88] tracking-[-0.055em] text-charcoal">
                    The people
                    <br />
                    behind it.
                  </h2>

                </div>

                <p className="max-w-xs text-sm font-light leading-relaxed text-charcoal/45">
                  Every production is a collaboration between
                  people with different disciplines and one shared
                  vision.
                </p>

              </div>

            </FadeIn>


            <div className="mt-16 grid gap-px border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2">

              {production.crew.map((member, index) => (
                <FadeIn
                  key={`${member.name}-${member.role}`}
                  delay={index * 0.06}
                >

                  <div className="group relative min-h-[180px] bg-offwhite p-7 transition-colors duration-300 hover:bg-[#f0ede6] md:p-9">

                    <div className="flex items-start justify-between">

                      <span className="font-mono text-[9px] text-orange">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-charcoal/20 transition-colors group-hover:text-orange">
                        <ArrowUpRight />
                      </span>

                    </div>

                    <div className="mt-14">

                      <p className="text-[8px] uppercase tracking-[0.25em] text-charcoal/30">
                        {member.role}
                      </p>

                      <p className="mt-3 font-body text-xl font-light text-charcoal">
                        {member.name}
                      </p>

                    </div>

                  </div>

                </FadeIn>
              ))}

            </div>

          </div>

        </section>
      )}


      {/* ======================================================
          FINAL CTA
      ====================================================== */}

      <section className="relative z-10 overflow-hidden bg-charcoal py-28 text-offwhite md:py-40">

        <div className="pointer-events-none absolute -right-40 -top-40 opacity-[0.055]">

          <ApertureIcon
            size={500}
            spin
          />

        </div>

        <div className="container-page relative">

          <FadeIn className="text-center">

            <p className="text-[8px] uppercase tracking-[0.35em] text-offwhite/25">
              Continue exploring
            </p>

            <h2 className="mx-auto mt-7 max-w-5xl font-body text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.85] tracking-[-0.06em]">

              There&apos;s more
              <br />

              <span className="text-offwhite/30">
                to the story.
              </span>

            </h2>

            <div className="mt-12 flex justify-center">

              <a
                href="#seasons"
                className="group inline-flex items-center gap-5 border border-offwhite/20 px-8 py-4 text-[9px] uppercase tracking-[0.22em] text-offwhite/65 transition-all duration-300 hover:border-orange hover:bg-orange hover:text-charcoal"
              >

                <span>
                  Explore Seasons
                </span>

                <span className="transition-transform duration-300 group-hover:translate-y-1">
                  ↓
                </span>

              </a>

            </div>

          </FadeIn>

        </div>

      </section>

    </>
  );
}