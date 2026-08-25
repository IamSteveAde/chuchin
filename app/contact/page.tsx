"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import ApertureIcon from "@/components/ui/ApertureIcon";
import { company } from "@/lib/data/company";

const ease = [0.16, 1, 0.3, 1] as const;
const KEN_BURNS_DURATION = 30;

/* ============================================================
   ANIMATION
============================================================ */

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

/* ============================================================
   ICONS
============================================================ */

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path
        d="m4 7 8 6 8-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <path
        d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V19c0 .6-.4 1-1 1C9.5 20 4 14.5 4 7.4c0-.6.4-1 1-1h3.1c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1.1L6.6 10.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5 fill-none stroke-current"
      strokeWidth={1.4}
    >
      <path
        d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.3" />
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

function ArrowDown() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
    >
      <path
        d="M10 3v13M5 11l5 5 5-5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const socialIcons: Record<string, () => JSX.Element> = {
  instagram: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth={1.5}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.2"
        cy="6.8"
        r="0.8"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),

  youtube: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth={1.5}
    >
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path
        d="m10 9.5 5 2.5-5 2.5v-5Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),

  twitter: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth={1.5}
    >
      <path
        d="M4 4l16 16M20 4 4 20"
        strokeLinecap="round"
      />
    </svg>
  ),

  facebook: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth={1.5}
    >
      <path
        d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9Z"
        strokeLinejoin="round"
      />
    </svg>
  ),

  linkedin: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth={1.5}
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path
        d="M7.5 10.5v6M7.5 7.5v.01M11.5 16.5v-3.5c0-1.2 1-2 2.2-2 1.1 0 1.8.8 1.8 2v3.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

/* ============================================================
   CONTACT DATA
============================================================ */

const infoCards = [
  {
    icon: EmailIcon,
    label: "Email",
    value: company.contact.email,
    href: `mailto:${company.contact.email}`,
    number: "01",
  },
  {
    icon: PhoneIcon,
    label: "Phone",
    value: company.contact.phone,
    href: `tel:${company.contact.phone.replace(/\s/g, "")}`,
    number: "02",
  },
  {
    icon: PinIcon,
    label: "Studio",
    value: company.contact.address,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      company.contact.address
    )}`,
    number: "03",
  },
];

/* ============================================================
   CONTACT FORM
============================================================ */

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (formData.get("company-site")) return;

    setSubmitted(true);
  }

  const inputClasses =
    "w-full border-b border-charcoal/15 bg-transparent px-0 py-4 text-[15px] font-light text-charcoal placeholder:text-charcoal/30 transition-all duration-300 focus:border-orange focus:outline-none";

  return (
    <div className="relative overflow-hidden border border-charcoal/10 bg-[#f2efe8]">

      {/* Giant decorative number */}
      <div className="pointer-events-none absolute -right-8 -top-16 font-display text-[190px] font-bold leading-none text-charcoal/[0.025]">
        01
      </div>

      <div className="relative p-7 md:p-10 lg:p-14">

        <AnimatePresence mode="wait">

          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex min-h-[520px] flex-col justify-center"
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
                Message received.
              </p>

              <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-charcoal/55">
                Thank you for reaching out. We&apos;ll review your
                message and respond to the email you provided.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 w-fit border-b border-charcoal/20 pb-1 text-[10px] uppercase tracking-[0.2em] text-charcoal/60 transition-colors hover:text-orange"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
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

              <div className="mb-12 flex items-start justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-charcoal/40">
                    Contact Form
                  </p>

                  <h3 className="mt-4 max-w-lg font-body text-3xl font-light leading-tight tracking-tight text-charcoal md:text-4xl">
                    Tell us what you&apos;re thinking.
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
                    htmlFor="c-name"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Your Name
                  </label>

                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    className={inputClasses}
                    placeholder="Full name"
                  />
                </div>

                <div className="mt-7 sm:mt-0">
                  <label
                    htmlFor="c-email"
                    className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                  >
                    Email Address
                  </label>

                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    className={inputClasses}
                    placeholder="you@email.com"
                  />
                </div>

              </div>

              {/* Subject */}
              <div className="mt-8">
                <label
                  htmlFor="c-subject"
                  className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                >
                  Subject
                </label>

                <input
                  id="c-subject"
                  name="subject"
                  type="text"
                  required
                  className={inputClasses}
                  placeholder="What would you like to talk about?"
                />
              </div>

              {/* Message */}
              <div className="mt-8">
                <label
                  htmlFor="c-message"
                  className="text-[9px] font-medium uppercase tracking-[0.2em] text-charcoal/40"
                >
                  Your Message
                </label>

                <textarea
                  id="c-message"
                  name="message"
                  required
                  rows={5}
                  className={`${inputClasses} resize-none`}
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              {/* Button */}
              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <button
                  type="submit"
                  className="group inline-flex w-fit items-center gap-6 border border-charcoal bg-charcoal px-8 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-offwhite transition-all duration-300 hover:bg-gradient-to-r hover:from-orange hover:to-gold hover:text-charcoal"
                >
                  <span>Send Message</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </button>

                <p className="max-w-xs text-[10px] font-light leading-relaxed text-charcoal/35">
                  We read every message personally and aim to respond
                  within a few business days.
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

export default function ContactPage() {
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

        {/* Cinematic background */}
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
              <source media="(max-width: 767px)" srcSet="/images/hero/contact.png" />
              {/* eslint-disable-next-line @next/next/no-img-element -- native <picture>/<source>
                  art direction isn't supported by next/image; matches the homepage hero. */}
              <img src="/images/hero/contact.png" alt="Chuchin Ultimate Productions" className="h-full w-full object-cover object-center" />
            </picture>
          </motion.div>

          {/* Color grading */}
          <div className="absolute inset-0 bg-charcoal/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/95 via-charcoal/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/20" />

          {/* Orange atmosphere */}
          {!prefersReducedMotion && (
            <motion.div
              animate={{
                x: [0, 30, -15, 0],
                y: [0, -20, 15, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-orange/[0.08] blur-[150px]"
            />
          )}
        </div>

        {/* Aperture */}
        <div className="pointer-events-none absolute -right-36 -top-36 opacity-[0.08]">
          <ApertureIcon
            size={500}
            spin={!prefersReducedMotion}
          />
        </div>

        {/* Content */}
        <div className="container-page relative z-10 flex min-h-[88vh] flex-col justify-between py-8 md:py-10">

          {/* Top line */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/50">
                Contact
              </span>
            </div>

            <span className="font-display text-[10px] text-offwhite/25">
              01 / 03
            </span>

          </div>

          {/* Main hero */}
          <div className="grid gap-14 pb-10 lg:grid-cols-[1fr_300px] lg:items-end">

            <FadeIn>

              <p className="text-[10px] uppercase tracking-[0.35em] text-offwhite/40">
                Get in touch
              </p>

              <h1 className="mt-6 max-w-5xl font-body text-[clamp(4rem,9vw,9rem)] font-light leading-[0.82] tracking-[-0.06em]">
                Let&apos;s
                <br />
                <span className="text-offwhite/40">
                  talk.
                </span>
              </h1>

              <div className="mt-10 flex items-start gap-4">

                <span className="mt-2 h-px w-10 shrink-0 bg-orange" />

                <p className="max-w-lg text-sm font-light leading-relaxed text-offwhite/60 md:text-base">
                  Questions, collaborations, ideas or simply want
                  to say hello? We&apos;d love to hear from you.
                </p>

              </div>

            </FadeIn>

            {/* Side message */}
            <FadeIn delay={0.15}>

              <div className="border border-white/15 bg-charcoal/40 p-6 backdrop-blur-xl">

                <div className="flex items-center justify-between">

                  <span className="text-[9px] uppercase tracking-[0.25em] text-offwhite/35">
                    Start here
                  </span>

                  <span className="text-orange">
                    <ArrowDown />
                  </span>

                </div>

                <p className="mt-12 font-body text-xl font-light leading-snug text-offwhite">
                  Every good story
                  <br />
                  <span className="text-offwhite/40">
                    starts with a conversation.
                  </span>
                </p>

                <div className="mt-8 h-px bg-white/10" />

                <p className="mt-5 text-[9px] uppercase tracking-[0.2em] text-offwhite/30">
                  Film · Culture · Talent · Africa
                </p>

              </div>

            </FadeIn>

          </div>

          {/* Bottom */}
          <FadeIn
            delay={0.2}
            className="border-t border-white/10 pt-5"
          >
            <div className="flex items-center justify-between">

              <span className="text-[9px] uppercase tracking-[0.25em] text-offwhite/25">
                Scroll to explore
              </span>

              <span className="text-offwhite/30">
                ↓
              </span>

            </div>
          </FadeIn>

        </div>
      </section>


      {/* ========================================================
          CONTACT DETAILS
      ======================================================== */}

      <section className="bg-offwhite py-24 md:py-32">

        <div className="container-page">

          <FadeIn>

            <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">

              <div>

                <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/35">
                  Find Us
                </p>

                <h2 className="mt-5 max-w-sm font-body text-4xl font-light leading-tight tracking-tight text-charcoal md:text-5xl">
                  However you reach us,
                  <span className="text-charcoal/25">
                    {" "}we&apos;re listening.
                  </span>
                </h2>

              </div>

              <div className="grid border-t border-charcoal/10 md:grid-cols-3 md:border-l">

                {infoCards.map((card, index) => {

                  const Icon = card.icon;

                  return (
                    <motion.a
                      key={card.label}
                      href={card.href}
                      target={
                        card.label === "Studio"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        card.label === "Studio"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.08,
                        ease,
                      }}
                      className="group relative border-b border-charcoal/10 p-7 transition-colors duration-300 hover:bg-[#e8e4dc] md:border-b-0 md:border-r"
                    >

                      <div className="flex items-start justify-between">

                        <span className="font-display text-[10px] text-orange">
                          {card.number}
                        </span>

                        <span className="text-charcoal/35 transition-colors group-hover:text-orange">
                          <ArrowUpRight />
                        </span>

                      </div>

                      <div className="mt-14">

                        <Icon />

                        <p className="mt-6 text-[9px] uppercase tracking-[0.25em] text-charcoal/35">
                          {card.label}
                        </p>

                        <p className="mt-3 font-body text-sm font-medium leading-relaxed text-charcoal">
                          {card.value}
                        </p>

                      </div>

                    </motion.a>
                  );
                })}

              </div>

            </div>

          </FadeIn>


          {/* Socials */}
          <FadeIn
            delay={0.2}
            className="mt-16 flex flex-col gap-5 border-t border-charcoal/10 pt-7 sm:flex-row sm:items-center sm:justify-between"
          >

            <div className="flex items-center gap-4">

              <span className="text-[9px] uppercase tracking-[0.25em] text-charcoal/35">
                Follow the journey
              </span>

              <div className="h-px w-8 bg-charcoal/15" />

            </div>

            <div className="flex gap-2">

              {Object.entries(company.social).map(
                ([platform, href]) => {

                  const Icon = socialIcons[platform];

                  if (!Icon) return null;

                  return (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="flex h-9 w-9 items-center justify-center border border-charcoal/10 text-charcoal/45 transition-all duration-300 hover:border-orange hover:bg-orange hover:text-charcoal"
                    >
                      <Icon />
                    </a>
                  );
                }
              )}

            </div>

          </FadeIn>

        </div>

      </section>


      {/* ========================================================
          BIG STATEMENT
      ======================================================== */}

      <section className="bg-[#e8e4dc] py-24 md:py-36">

        <div className="container-page">

          <FadeIn>

            <div className="grid gap-10 lg:grid-cols-[0.35fr_1.65fr]">

              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/35">
                The Conversation
              </p>

              <div>

                <h2 className="max-w-6xl font-body text-[clamp(2.8rem,6vw,6.5rem)] font-light leading-[0.93] tracking-[-0.05em] text-charcoal">
                  We&apos;re not interested in
                  <span className="text-charcoal/25">
                    {" "}just another email.
                  </span>
                </h2>

                <p className="mt-10 max-w-xl text-base font-light leading-relaxed text-charcoal/50">
                  Tell us about the idea, the problem, the opportunity,
                  or even the thing you&apos;re not quite sure how to
                  explain yet. We&apos;ll take it from there.
                </p>

              </div>

            </div>

          </FadeIn>

        </div>

      </section>


      {/* ========================================================
          FORM
      ======================================================== */}

      <section className="bg-offwhite py-24 md:py-36">

        <div className="container-page">

          <div className="grid gap-16 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">

            {/* Left */}
            <FadeIn>

              <p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/35">
                Send a Message
              </p>

              <h2 className="mt-6 font-body text-[clamp(3rem,6vw,6rem)] font-light leading-[0.88] tracking-[-0.055em] text-charcoal">
                Tell us
                <br />
                what&apos;s
                <br />
                next.
              </h2>

              <div className="mt-10 h-px w-12 bg-orange" />

              <p className="mt-8 max-w-sm text-sm font-light leading-relaxed text-charcoal/50">
                Whether it&apos;s a question, a collaboration,
                an idea or feedback — this goes directly to
                our team.
              </p>

            </FadeIn>

            {/* Form */}
            <FadeIn delay={0.1}>

              <ContactForm />

            </FadeIn>

          </div>

        </div>

      </section>


      {/* ========================================================
          FINAL CTA
      ======================================================== */}

      <section className="relative overflow-hidden bg-charcoal py-28 text-offwhite md:py-40">

        {!prefersReducedMotion && (
          <motion.div
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 10, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-orange/[0.07] blur-[150px]"
          />
        )}

        <div className="pointer-events-none absolute -bottom-48 -left-32 opacity-[0.045]">
          <ApertureIcon
            size={520}
            spin={!prefersReducedMotion}
          />
        </div>

        <div className="container-page relative">

          <FadeIn className="text-center">

            <p className="text-[9px] uppercase tracking-[0.35em] text-offwhite/30">
              Until then
            </p>

            <h2 className="mx-auto mt-7 max-w-5xl font-body text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.85] tracking-[-0.06em]">
              Keep telling
              <br />
              <span className="text-offwhite/35">
                great stories.
              </span>
            </h2>

            <div className="mt-12 flex justify-center">

              <a
                href={`mailto:${company.contact.email}?subject=Hello`}
                className="group inline-flex items-center gap-6 border border-offwhite/20 px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-offwhite/70 transition-all duration-300 hover:border-orange hover:bg-orange hover:text-charcoal"
              >
                <span>Say Hello</span>

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