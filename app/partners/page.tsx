"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import ApertureIcon from "@/components/ui/ApertureIcon";
import { company, recognitions } from "@/lib/data/company";

const ease = [0.16, 1, 0.3, 1] as const;
const KEN_BURNS_DURATION = 28;

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------
   ICONS
------------------------------------------------------------- */

function FilmIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path
        d="M8 5v14M16 5v14M3 10h5M16 10h5M3 14h5M16 14h5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BroadcastIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <circle cx="12" cy="12" r="2.2" />
      <path
        d="M7.5 8.5a6 6 0 0 0 0 7M16.5 8.5a6 6 0 0 1 0 7M4.5 5.5a10 10 0 0 0 0 13M19.5 5.5a10 10 0 0 1 0 13"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MentorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <path
        d="M12 3 2 8l10 5 10-5-10-5Z"
        strokeLinejoin="round"
      />
      <path
        d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
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

/* -------------------------------------------------------------
   DATA
------------------------------------------------------------- */

const opportunities = [
  {
    number: "01",
    icon: FilmIcon,
    title: "Production Sponsorship",
    description:
      "Back a season of Sands of Time or an upcoming original, with brand integration and meaningful visibility.",
    tag: "CREATE",
  },
  {
    number: "02",
    icon: BroadcastIcon,
    title: "Distribution & Streaming",
    description:
      "Bring our catalogue to your platform or territory through licensing, syndication and strategic distribution.",
    tag: "AMPLIFY",
  },
  {
    number: "03",
    icon: MentorIcon,
    title: "Masterclass Partnership",
    description:
      "Support The Main Character Journey and help fund the next generation of Nigerian creative talent.",
    tag: "EMPOWER",
  },
];

const festivals = Array.from(
  new Set(recognitions.map((r) => r.festival))
);

/* -------------------------------------------------------------
   FORM
------------------------------------------------------------- */

function PartnershipForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (formData.get("company-site")) return;

    setSubmitted(true);
  }

  const inputClasses =
    "w-full border-b border-charcoal/15 bg-transparent px-0 py-4 text-[15px] font-light text-charcoal placeholder:text-charcoal/30 transition-colors duration-300 focus:border-charcoal focus:outline-none";

  return (
    <div className="relative overflow-hidden border border-charcoal/10 bg-[#f4f1eb]">

      {/* Decorative number */}
      <div className="pointer-events-none absolute -right-5 -top-12 font-display text-[170px] font-bold leading-none text-charcoal/[0.025]">
        01
      </div>

      <div className="relative p-7 md:p-10 lg:p-12">

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex min-h-[430px] flex-col justify-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange to-gold">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-none stroke-offwhite"
                  strokeWidth={2.2}
                >
                  <path
                    d="M5 13l4 4 10-10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <p className="mt-8 font-body text-3xl font-light tracking-tight text-charcoal">
                Conversation started.
              </p>

              <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-charcoal/55">
                Thank you for reaching out. We&apos;ll review your
                inquiry and get back to you at the email you provided.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onSubmit={handleSubmit}
              className="relative"
            >
              <input
                type="text"
                name="company-site"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="mb-10 flex items-start justify-between">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-charcoal/40">
                    Partnership Inquiry
                  </p>

                  <h3 className="mt-3 max-w-sm font-body text-2xl font-light tracking-tight text-charcoal md:text-3xl">
                    Let&apos;s make something worth remembering.
                  </h3>
                </div>

                <span className="text-orange">
                  <ArrowUpRight />
                </span>
              </div>

              <div className="grid gap-x-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="p-name"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Name
                  </label>

                  <input
                    id="p-name"
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="p-org"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Organization
                  </label>

                  <input
                    id="p-org"
                    name="organization"
                    type="text"
                    className={inputClasses}
                    placeholder="Company or brand"
                  />
                </div>
              </div>

              <div className="mt-7 grid gap-x-8 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="p-email"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Email
                  </label>

                  <input
                    id="p-email"
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="you@company.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="p-interest"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Partnership
                  </label>

                  <select
                    id="p-interest"
                    name="interest"
                    required
                    className={`${inputClasses} cursor-pointer appearance-none`}
                  >
                    <option value="">Select an area</option>

                    {opportunities.map((o) => (
                      <option key={o.title} value={o.title}>
                        {o.title}
                      </option>
                    ))}

                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-7">
                <label
                  htmlFor="p-message"
                  className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                >
                  Message
                </label>

                <textarea
                  id="p-message"
                  name="message"
                  required
                  rows={4}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us what you have in mind"
                />
              </div>

              <button
                type="submit"
                className="group mt-9 inline-flex items-center gap-5 border border-charcoal bg-charcoal px-7 py-4 text-[11px] font-medium uppercase tracking-[0.18em] text-offwhite transition-all duration-300 hover:bg-gradient-to-r hover:from-orange hover:to-gold hover:text-charcoal"
              >
                <span>Start a Conversation</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------
   PAGE
------------------------------------------------------------- */

export default function PartnersPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* =========================================================
          CINEMATIC HERO — fixed background (true position: fixed,
          not background-attachment, so it works identically on iOS
          Safari and desktop). This section must never carry its own
          background color/image class: a background painted directly
          on the section renders ABOVE a negative-z-index fixed child,
          silently hiding it. The fixed layer also ignores <main>'s
          scroll-clearance padding entirely, which is what lets it
          start at the true top of the viewport. Zoom now breathes
          in and out on a loop instead of zooming one way only.
      ========================================================= */}

      <section className="relative min-h-[88vh] overflow-hidden text-offwhite">

        {/* Background */}
        <div className="fixed inset-0 -z-10">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: prefersReducedMotion ? 1 : [1, 1.09, 1] }}
            transition={{
              duration: KEN_BURNS_DURATION,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative h-full w-full"
          >
            <picture className="absolute inset-0 block h-full w-full">
              <source media="(max-width: 767px)" srcSet="/images/hero/tot.png" />
              {/* eslint-disable-next-line @next/next/no-img-element -- native <picture>/<source>
                  art direction isn't supported by next/image; matches the homepage hero. */}
              <img src="/images/hero/tot.png" alt="Sands of Time" className="h-full w-full object-cover" />
            </picture>
          </motion.div>

          {/* Cinematic grading */}
          <div className="absolute inset-0 bg-charcoal/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/20" />
        </div>

        {/* Aperture */}
        <div className="pointer-events-none absolute -right-40 -top-40 opacity-[0.07]">
          <ApertureIcon
            size={560}
            spin={!prefersReducedMotion}
          />
        </div>

        {/* Hero */}
        <div className="container-page relative z-10 flex min-h-[88vh] flex-col justify-between py-8 md:py-10">

          {/* Top */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/55">
                Open for Partnership
              </span>
            </div>

            <span className="font-display text-[10px] text-offwhite/30">
              01 / 04
            </span>
          </div>

          {/* Main content */}
          <div className="grid gap-12 pb-12 lg:grid-cols-[1fr_280px] lg:items-end">

            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.35em] text-offwhite/45">
                For Investors, Brands &amp; Partners
              </p>

              <h1 className="mt-6 max-w-5xl font-body text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.87] tracking-[-0.055em]">
                Build the
                <br />
                <span className="text-offwhite/45">
                  next story
                </span>
                <br />
                with us.
              </h1>

              <div className="mt-9 flex items-start gap-4">
                <span className="mt-2 h-px w-10 shrink-0 bg-orange" />

                <p className="max-w-xl text-sm font-light leading-relaxed text-offwhite/65 md:text-base">
                  We collaborate with sponsors, distribution partners,
                  streaming networks and brands who want to bring
                  authentic African stories to wider audiences.
                </p>
              </div>
            </FadeIn>

            {/* Hero side card */}
            <FadeIn delay={0.15}>
              <div className="border border-white/15 bg-charcoal/40 p-6 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-[0.25em] text-offwhite/40">
                    The opportunity
                  </span>

                  <span className="text-orange">
                    <ArrowUpRight />
                  </span>
                </div>

                <p className="mt-12 font-body text-xl font-light leading-snug">
                  Culture is moving.
                  <br />
                  <span className="text-offwhite/45">
                    Be part of what moves it.
                  </span>
                </p>

                <div className="mt-8 h-px bg-white/10" />

                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-offwhite/35">
                  Film · Culture · Talent · Africa
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Recognition */}
          <FadeIn
            delay={0.2}
            className="border-t border-white/10 pt-5"
          >
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              <span className="text-[9px] uppercase tracking-[0.25em] text-offwhite/30">
                Recognized at
              </span>

              {festivals.map((festival) => (
                <span
                  key={festival}
                  className="font-display text-xs font-semibold text-offwhite/50"
                >
                  {festival}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 right-8 hidden items-center gap-3 md:flex">
          <span className="text-[8px] uppercase tracking-[0.25em] text-offwhite/30">
            Explore
          </span>

          <motion.span
            animate={
              prefersReducedMotion
                ? {}
                : { y: [0, 5, 0] }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-offwhite/40"
          >
            ↓
          </motion.span>
        </div>
      </section>


      {/* =========================================================
          INTRO / STATEMENT
      ========================================================= */}

      <section className="bg-offwhite py-24 md:py-36">
        <div className="container-page">

          <FadeIn>
            <div className="grid gap-10 lg:grid-cols-[0.35fr_1.65fr]">
              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/35">
                Why Partner
              </p>

              <h2 className="max-w-6xl font-body text-[clamp(2.7rem,6vw,6.5rem)] font-light leading-[0.95] tracking-[-0.045em] text-charcoal">
                We don&apos;t just make content.
                <span className="text-charcoal/25">
                  {" "}We create cultural moments people remember.
                </span>
              </h2>
            </div>
          </FadeIn>

          {/* Large visual statement */}
          <FadeIn delay={0.12} className="mt-20">
            <div className="relative min-h-[460px] overflow-hidden bg-charcoal md:min-h-[600px]">

              {/* eslint-disable-next-line @next/next/no-img-element -- decorative
                  contained panel image, not the pinned hero background. */}
              <img
                src="/images/hero/tot.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-charcoal/55" />
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/30 to-transparent" />

              <div className="absolute left-7 top-7 md:left-10 md:top-10">
                <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/45">
                  What we believe
                </span>
              </div>

              <div className="absolute bottom-8 left-7 max-w-3xl md:bottom-12 md:left-12">
                <p className="font-body text-3xl font-light leading-tight tracking-tight text-offwhite md:text-5xl">
                  The strongest partnerships don&apos;t
                  simply fund stories.
                  <span className="text-offwhite/40">
                    {" "}They become part of them.
                  </span>
                </p>
              </div>

              <div className="absolute bottom-8 right-8 hidden md:block">
                <ApertureIcon
                  size={100}
                  className="text-offwhite/20"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>


      {/* =========================================================
          PARTNERSHIP OPPORTUNITIES
      ========================================================= */}

      <section className="bg-[#e8e4dc] py-24 md:py-32">
        <div className="container-page">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
                Ways to Partner
              </p>

              <h2 className="mt-5 max-w-2xl font-body text-[clamp(2.5rem,5vw,5rem)] font-light leading-[0.95] tracking-[-0.04em] text-charcoal">
                Find your place
                <br />
                in the story.
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="max-w-xs text-sm font-light leading-relaxed text-charcoal/50">
                Three ways to create meaningful impact
                through African storytelling.
              </p>
            </FadeIn>
          </div>

          {/* Asymmetric cards */}
          <div className="mt-16 grid gap-4 lg:grid-cols-12">

            {opportunities.map((opportunity, index) => {
              const Icon = opportunity.icon;

              return (
                <FadeIn
                  key={opportunity.title}
                  delay={index * 0.1}
                  className={
                    index === 0
                      ? "lg:col-span-5"
                      : index === 1
                      ? "lg:col-span-4"
                      : "lg:col-span-3"
                  }
                >
                  <article
                    className={`group relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden border border-charcoal/10 bg-offwhite p-7 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_-35px_rgba(0,0,0,0.3)] md:p-9 ${
                      index === 0 ? "lg:min-h-[520px]" : ""
                    }`}
                  >

                    {/* Number */}
                    <div className="flex items-start justify-between">
                      <span className="font-display text-xs text-orange">
                        {opportunity.number}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 text-charcoal transition-all duration-500 group-hover:border-orange group-hover:bg-orange group-hover:text-charcoal">
                        <Icon />
                      </div>
                    </div>

                    <div>
                      <p className="mb-5 text-[8px] uppercase tracking-[0.25em] text-charcoal/30">
                        {opportunity.tag}
                      </p>

                      <h3 className="max-w-md font-body text-2xl font-medium leading-tight tracking-tight text-charcoal md:text-3xl">
                        {opportunity.title}
                      </h3>

                      <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-charcoal/55">
                        {opportunity.description}
                      </p>

                      <div className="mt-8 flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-charcoal/40 transition-colors group-hover:text-orange">
                        <span>Explore</span>
                        <ArrowUpRight />
                      </div>
                    </div>

                    {/* Decorative giant number */}
                    <span className="pointer-events-none absolute -bottom-12 -right-2 font-display text-[170px] font-bold leading-none text-charcoal/[0.025]">
                      {opportunity.number}
                    </span>
                  </article>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>


      {/* =========================================================
          RECOGNITION
      ========================================================= */}

      <section className="bg-charcoal py-24 text-offwhite md:py-32">
        <div className="container-page">

          <FadeIn>
            <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">

              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-offwhite/35">
                  Proof of Work
                </p>

                <h2 className="mt-6 font-body text-4xl font-light leading-tight tracking-tight md:text-5xl">
                  Already being
                  <br />
                  recognized.
                </h2>
              </div>

              <div className="grid grid-cols-2 border-l border-offwhite/10 sm:grid-cols-3">
                {festivals.map((festival, index) => (
                  <div
                    key={festival}
                    className="border-b border-r border-offwhite/10 p-6 md:p-8"
                  >
                    <span className="font-display text-[10px] text-orange/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="mt-8 font-body text-base font-medium text-offwhite/75">
                      {festival}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </FadeIn>
        </div>
      </section>


      {/* =========================================================
          CONTACT
      ========================================================= */}

      <section className="bg-offwhite py-24 md:py-36">
        <div className="container-page">

          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">

            {/* Left */}
            <FadeIn>
              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/40">
                Start a Conversation
              </p>

              <h2 className="mt-6 font-body text-[clamp(3rem,6vw,6rem)] font-light leading-[0.9] tracking-[-0.05em] text-charcoal">
                Have an
                <br />
                idea?
              </h2>

              <p className="mt-8 max-w-sm text-sm font-light leading-relaxed text-charcoal/50">
                Tell us what you&apos;re thinking. The best
                partnerships often start with a simple conversation.
              </p>

              <div className="mt-12">
                <p className="text-[9px] uppercase tracking-[0.25em] text-charcoal/35">
                  Or email us directly
                </p>

                
                  <a href={`mailto:${company.contact.email}?subject=Partnership%20Inquiry`}
                  className="group mt-3 inline-flex items-center gap-3 border-b border-charcoal/15 pb-2 text-sm font-medium text-charcoal"
                >
                  <span>{company.contact.email}</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.1}>
              <PartnershipForm />
            </FadeIn>

          </div>
        </div>
      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className="relative overflow-hidden bg-[#e8e4dc] py-24 md:py-32">

        <div className="pointer-events-none absolute -right-20 -top-20 opacity-[0.035]">
          <ApertureIcon
            size={420}
            spin={!prefersReducedMotion}
          />
        </div>

        <div className="container-page relative">
          <FadeIn className="text-center">

            <p className="text-[9px] uppercase tracking-[0.35em] text-charcoal/35">
              The next chapter
            </p>

            <h2 className="mx-auto mt-7 max-w-5xl font-body text-[clamp(3rem,7vw,7rem)] font-light leading-[0.9] tracking-[-0.055em] text-charcoal">
              Let&apos;s make
              <br />
              something
              <span className="text-charcoal/25">
                {" "}unforgettable.
              </span>
            </h2>

            <div className="mt-10 flex justify-center">
              
                <a href={`mailto:${company.contact.email}?subject=Partnership%20Inquiry`}
                className="group inline-flex items-center gap-6 border border-charcoal bg-charcoal px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-offwhite transition-all duration-300 hover:bg-gradient-to-r hover:from-orange hover:to-gold hover:text-charcoal"
              >
                <span>Get in touch</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>

          </FadeIn>
        </div>
      </section>

    </>
  );
}