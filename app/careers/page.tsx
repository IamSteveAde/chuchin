"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import ApertureIcon from "@/components/ui/ApertureIcon";
import MasterclassCTA from "@/components/sections/MasterclassCTA";

const ease = [0.16, 1, 0.3, 1] as const;
const KEN_BURNS_DURATION = 28;

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

function ClapperIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <path
        d="M3 10.5 4 6l14.5 3-1 4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="3" y="10" width="18" height="9" rx="1.5" />
      <path
        d="m6 6 2.5 3M11 6l2.5 3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CrewIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <path
        d="M3.5 18c.5-3 2.1-4.5 4.5-4.5S12 15 12.5 18M11.5 18c.5-3 2.1-4.5 4.5-4.5s4 1.5 4.5 4.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InternIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <path
        d="M12 4 2 8l10 4 10-4-10-4Z"
        strokeLinejoin="round"
      />
      <path
        d="M6 10v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4"
        strokeLinecap="round"
      />
      <path
        d="M22 8v6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
    >
      <path
        d="M4 16 16 4M16 4H7M16 4v9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ============================================================
   TRACKS
============================================================ */

const tracks = [
  {
    number: "01",
    icon: ClapperIcon,
    tag: "ON SCREEN",
    title: "Casting Calls",
    description:
      "Open roles for current and upcoming productions. Bring your presence, perspective and performance to the story.",
  },
  {
    number: "02",
    icon: CrewIcon,
    tag: "BEHIND THE CAMERA",
    title: "Crew Recruitment",
    description:
      "We are always looking for experienced production talent across departments who know how to bring a vision to life.",
  },
  {
    number: "03",
    icon: InternIcon,
    tag: "START HERE",
    title: "Internships",
    description:
      "Hands-on opportunities for aspiring filmmakers and media professionals ready to learn by doing.",
  },
];

/* ============================================================
   APPLICATION FORM
============================================================ */

function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Honeypot
    if (formData.get("company-site")) {
      return;
    }

    // Connect to your API/email provider here.
    setSubmitted(true);
  }

  const inputClasses =
    "w-full border-b border-charcoal/15 bg-transparent px-0 py-4 text-[15px] font-light text-charcoal placeholder:text-charcoal/30 transition-colors duration-300 focus:border-orange focus:outline-none";

  return (
    <div className="relative overflow-hidden border border-charcoal/10 bg-[#f3f0e9]">

      {/* Decorative giant number */}
      <div className="pointer-events-none absolute -right-8 -top-16 font-display text-[190px] font-bold leading-none text-charcoal/[0.025]">
        02
      </div>

      <div className="relative p-7 md:p-10 lg:p-14">

        <AnimatePresence mode="wait">

          {submitted ? (
            <motion.div
              key="success"
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                ease,
              }}
              className="flex min-h-[500px] flex-col justify-center"
            >

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange to-gold">

                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-none stroke-offwhite"
                  strokeWidth={2.2}
                >
                  <path
                    d="M5 13l4 4 10-10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              <p className="mt-9 font-body text-3xl font-light tracking-tight text-charcoal md:text-4xl">
                Application received.
              </p>

              <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-charcoal/55">
                Thank you for your interest. We&apos;ll review your
                application and reach out at the email you provided
                if there&apos;s a fit.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 w-fit border-b border-charcoal/20 pb-1 text-[9px] uppercase tracking-[0.2em] text-charcoal/50 transition-colors hover:border-orange hover:text-orange"
              >
                Submit another application
              </button>

            </motion.div>
          ) : (

            <motion.form
              key="form"
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
                duration: 0.35,
              }}
              onSubmit={handleSubmit}
            >

              {/* Honeypot */}
              <input
                type="text"
                name="company-site"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              {/* Form heading */}
              <div className="mb-12 flex items-start justify-between">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/40">
                    Application
                  </p>

                  <h3 className="mt-4 max-w-lg font-body text-3xl font-light leading-tight tracking-tight text-charcoal md:text-4xl">
                    Put your name in the frame.
                  </h3>

                </div>

                <span className="hidden text-orange sm:block">
                  <ArrowUpRight />
                </span>

              </div>

              {/* Name / Email */}
              <div className="grid gap-x-10 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="a-name"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Name
                  </label>

                  <input
                    id="a-name"
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Your full name"
                  />
                </div>

                <div className="mt-7 sm:mt-0">
                  <label
                    htmlFor="a-email"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Email
                  </label>

                  <input
                    id="a-email"
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="you@email.com"
                  />
                </div>

              </div>

              {/* Track / Portfolio */}
              <div className="mt-8 grid gap-x-10 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="a-track"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Area of Interest
                  </label>

                  <select
                    id="a-track"
                    name="track"
                    required
                    className={`${inputClasses} cursor-pointer appearance-none`}
                  >
                    <option value="">
                      Select an area
                    </option>

                    {tracks.map((track) => (
                      <option
                        key={track.title}
                        value={track.title}
                      >
                        {track.title}
                      </option>
                    ))}

                    <option value="The Main Character Journey">
                      The Main Character Journey
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>
                </div>

                <div className="mt-7 sm:mt-0">

                  <label
                    htmlFor="a-portfolio"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Portfolio / Reel
                  </label>

                  <input
                    id="a-portfolio"
                    name="portfolio"
                    type="url"
                    className={inputClasses}
                    placeholder="https://..."
                  />

                </div>

              </div>

              {/* Message */}
              <div className="mt-8">

                <label
                  htmlFor="a-message"
                  className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                >
                  Tell Us About You
                </label>

                <textarea
                  id="a-message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us about yourself, your experience and what you're looking for."
                />

              </div>

              {/* Submit */}
              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <button
                  type="submit"
                  className="group inline-flex w-fit items-center gap-6 border border-charcoal bg-charcoal px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-offwhite transition-all duration-300 hover:border-orange hover:bg-gradient-to-r hover:from-orange hover:to-gold hover:text-charcoal"
                >
                  <span>
                    Submit Application
                  </span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <p className="max-w-xs text-[9px] font-light leading-relaxed text-charcoal/35">
                  We&apos;ll only contact you regarding relevant
                  opportunities and productions.
                </p>

              </div>

            </motion.form>

          )}

        </AnimatePresence>

      </div>

    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function CareersPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>

      {/* ========================================================
          HERO — fixed background (true position: fixed, not
          background-attachment, so it works identically on iOS
          Safari and desktop). This section must never carry its
          own background color/image class: a background painted
          directly on the section renders ABOVE a negative-z-index
          fixed child, silently hiding it. The fixed layer also
          ignores <main>'s scroll-clearance padding entirely, which
          is what lets it start at the true top of the viewport.
      ======================================================== */}

      <section className="relative min-h-[88vh] overflow-hidden text-offwhite">

        {/* Background */}
        <div className="fixed inset-0 -z-10">

          <motion.div
            initial={{
              scale: 1,
            }}
            animate={{
              scale: prefersReducedMotion
                ? 1
                : [1, 1.08, 1],
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
                srcSet="/images/hero/masterclassm.png"
              />

              {/* eslint-disable-next-line @next/next/no-img-element -- native <picture>/<source>
                  art direction isn't supported by next/image; matches the homepage hero. */}
              <img
                src="/images/hero/masterclass.png"
                alt="The Main Character Journey"
                className="h-full w-full object-cover"
              />

            </picture>

          </motion.div>

          {/* Cinematic grading */}
          <div className="absolute inset-0 bg-charcoal/35" />

          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/45 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/25" />

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
              className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-orange/[0.08] blur-[150px]"
            />
          )}

        </div>

        {/* Aperture */}
        <div className="pointer-events-none absolute -right-28 -top-28 opacity-[0.08]">
          <ApertureIcon
            size={380}
            spin={!prefersReducedMotion}
          />
        </div>

        {/* Hero content */}
        <div className="container-page relative z-10 flex min-h-[88vh] flex-col justify-between py-8 md:py-10">

          {/* Top metadata */}
          <FadeIn>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />

                <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/50">
                  Careers &amp; Casting
                </span>

              </div>

              <span className="font-mono text-[9px] text-offwhite/25">
                01 / 03
              </span>

            </div>

          </FadeIn>


          {/* Hero copy */}
          <FadeIn
            delay={0.12}
            className="pb-8"
          >

            <div className="mb-7 flex w-fit items-center gap-2 border border-offwhite/15 bg-charcoal/45 px-3 py-2 backdrop-blur-xl">

              <motion.span
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        opacity: [1, 0.25, 1],
                      }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-orange"
              />

              <span className="font-mono text-[9px] tracking-[0.15em] text-offwhite/70">
                OPEN FOR APPLICATIONS
              </span>

            </div>

            <h1 className="max-w-6xl font-body text-[clamp(4rem,9vw,9rem)] font-light leading-[0.84] tracking-[-0.06em] text-offwhite">

              Join the
              <br />

              <span className="text-offwhite/40">
                production.
              </span>

            </h1>

            <div className="mt-9 flex items-start gap-4">

              <span className="mt-2 h-12 w-px shrink-0 bg-gradient-to-b from-orange to-gold" />

              <p className="max-w-xl text-sm font-light leading-relaxed text-offwhite/60 md:text-base">
                Openings, auditions and opportunities for
                actors, filmmakers, production crew and the
                next generation of Nigerian storytellers.
              </p>

            </div>

          </FadeIn>


          {/* Bottom hero strip */}
          <FadeIn
            delay={0.2}
            className="border-t border-offwhite/10 pt-5"
          >

            <div className="flex flex-wrap items-center justify-between gap-5">

              <div className="flex gap-6">

                <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/25">
                  Actors
                </span>

                <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/25">
                  Crew
                </span>

                <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/25">
                  Interns
                </span>

              </div>

              <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/25">
                Lagos · Nigeria
              </span>

            </div>

          </FadeIn>

        </div>

      </section>


      {/* ========================================================
          INTRO STATEMENT
      ======================================================== */}

      <section className="bg-offwhite py-24 md:py-36">

        <div className="container-page">

          <FadeIn>

            <div className="grid gap-10 lg:grid-cols-[0.35fr_1.65fr]">

              <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/35">
                The Opportunity
              </p>

              <h2 className="max-w-6xl font-body text-[clamp(2.8rem,6vw,6.5rem)] font-light leading-[0.92] tracking-[-0.05em] text-charcoal">

                Great productions are built by
                <span className="text-charcoal/25">
                  {" "}great people.
                </span>

              </h2>

            </div>

          </FadeIn>

          <FadeIn
            delay={0.12}
            className="mt-12 lg:ml-[20%]"
          >

            <p className="max-w-2xl text-base font-light leading-relaxed text-charcoal/55 md:text-lg">
              We believe the people behind the camera and in
              front of it are what give every story its identity.
              If you have the talent, curiosity and discipline to
              contribute, there may be a place for you here.
            </p>

          </FadeIn>

        </div>

      </section>


      {/* ========================================================
          WAYS TO JOIN
      ======================================================== */}

      <section className="bg-[#e8e4dc] py-24 md:py-32">

        <div className="container-page">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">

            <FadeIn>

              <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/40">
                Ways to Join
              </p>

              <h2 className="mt-5 font-body text-[clamp(2.7rem,5vw,5rem)] font-light leading-[0.95] tracking-[-0.04em] text-charcoal">
                Find your
                <br />
                place on set.
              </h2>

            </FadeIn>

            <FadeIn delay={0.1}>

              <p className="max-w-xs text-sm font-light leading-relaxed text-charcoal/45">
                Three pathways into the world of Chuchin
                Ultimate Productions.
              </p>

            </FadeIn>

          </div>


          {/* Asymmetric cards */}
          <div className="mt-16 grid gap-4 lg:grid-cols-12">

            {tracks.map((track, i) => {

              const Icon = track.icon;

              return (
                <FadeIn
                  key={track.title}
                  delay={i * 0.1}
                  className={
                    i === 0
                      ? "lg:col-span-5"
                      : i === 1
                      ? "lg:col-span-4"
                      : "lg:col-span-3"
                  }
                >

                  <article
                    className={`group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden border border-charcoal/10 bg-offwhite p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.3)] md:p-9 ${
                      i === 0
                        ? "lg:min-h-[520px]"
                        : ""
                    }`}
                  >

                    {/* Number */}
                    <div className="flex items-start justify-between">

                      <span className="font-mono text-[9px] text-orange">
                        {track.number}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center border border-charcoal/10 text-orange transition-all duration-500 group-hover:border-orange group-hover:bg-orange group-hover:text-charcoal">
                        <Icon />
                      </div>

                    </div>


                    {/* Content */}
                    <div>

                      <p className="mb-5 text-[8px] uppercase tracking-[0.28em] text-charcoal/30">
                        {track.tag}
                      </p>

                      <h3 className="font-body text-2xl font-medium leading-tight tracking-tight text-charcoal md:text-3xl">
                        {track.title}
                      </h3>

                      <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-charcoal/55">
                        {track.description}
                      </p>

                      <div className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-charcoal/35 transition-colors group-hover:text-orange">

                        <span>
                          Explore
                        </span>

                        <ArrowUpRight />

                      </div>

                    </div>


                    {/* Giant background number */}
                    <span className="pointer-events-none absolute -bottom-14 -right-3 font-display text-[180px] font-bold leading-none text-charcoal/[0.025]">
                      {track.number}
                    </span>

                  </article>

                </FadeIn>
              );
            })}

          </div>

        </div>

      </section>


      {/* ========================================================
          APPLICATION
      ======================================================== */}

      <section className="bg-offwhite py-24 md:py-36">

        <div className="container-page">

          <div className="grid gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">

            {/* Left column */}
            <FadeIn>

              <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/35">
                Apply Now
              </p>

              <h2 className="mt-6 font-body text-[clamp(3rem,6vw,6rem)] font-light leading-[0.88] tracking-[-0.055em] text-charcoal">

                Put your
                <br />
                name
                <br />
                in the frame.

              </h2>

              <div className="mt-10 h-px w-12 bg-orange" />

              <p className="mt-8 max-w-sm text-sm font-light leading-relaxed text-charcoal/50">
                Tell us who you are, what you do and where
                you think you could contribute. Your next
                production may start here.
              </p>


              {/* Small side note */}
              <div className="mt-12 border-l border-charcoal/10 pl-5">

                <p className="text-[8px] uppercase tracking-[0.25em] text-charcoal/30">
                  A note for applicants
                </p>

                <p className="mt-3 max-w-xs text-xs font-light leading-relaxed text-charcoal/45">
                  A portfolio or reel is strongly encouraged
                  for creative and production applications.
                </p>

              </div>

            </FadeIn>


            {/* Form */}
            <FadeIn delay={0.1}>

              <ApplicationForm />

            </FadeIn>

          </div>

        </div>

      </section>


      {/* ========================================================
          MASTERCLASS
      ======================================================== */}

      <section id="masterclass">

        <MasterclassCTA />

      </section>


      {/* ========================================================
          FINAL STATEMENT
      ======================================================== */}

      <section className="relative overflow-hidden bg-charcoal py-28 text-offwhite md:py-40">

        <div className="pointer-events-none absolute -right-32 -top-32 opacity-[0.055]">

          <ApertureIcon
            size={460}
            spin={!prefersReducedMotion}
          />

        </div>

        <div className="container-page relative">

          <FadeIn className="text-center">

            <p className="text-[8px] uppercase tracking-[0.35em] text-offwhite/25">
              Your story could be next
            </p>

            <h2 className="mx-auto mt-7 max-w-5xl font-body text-[clamp(3.2rem,7vw,7rem)] font-light leading-[0.88] tracking-[-0.055em]">

              Bring your
              <br />

              <span className="text-offwhite/30">
                talent.
              </span>

            </h2>

            <p className="mx-auto mt-8 max-w-md text-sm font-light leading-relaxed text-offwhite/40">
              We&apos;re always interested in people who care
              deeply about the work.
            </p>

          </FadeIn>

        </div>

      </section>

    </>
  );
}