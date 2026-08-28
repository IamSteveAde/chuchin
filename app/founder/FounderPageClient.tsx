"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ApertureIcon from "@/components/ui/ApertureIcon";
import { founder, masterclass } from "@/lib/data/founder";
import { founderRecognitionSummary } from "@/lib/data/about";
import { recognitions } from "@/lib/data/company";
import { productions } from "@/lib/data/productions";
import { masterclassTagline, pastMasterclasses } from "@/lib/data/masterclass-editions";

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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={1.6}>
      <path d="M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9Z" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current"
      strokeWidth={1.6}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth={1.6}>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="m10.5 10 4 2-4 2v-4Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const flagship = productions[0];
const founderCredit = flagship.crew.find((c) => c.name === founder.name);

// Real, derived counts — nothing fabricated. Every number here comes
// directly from the site's own data files.
const stats = [
  { value: String(recognitions.length), label: "Award Nominations & Selections" },
  { value: String(flagship.seasons.length), label: "Seasons Produced" },
  { value: String(pastMasterclasses[0]?.headliners.length ?? 0), label: "Industry Voices Hosted" }
];

// Real roles/credits already established elsewhere on the site, presented
// as a clean numbered list.
const roles = [
  {
    title: "Founder & Chief Executive Officer",
    description: "Chuchin Ultimate Productions Ltd."
  },
  ...(founderCredit
    ? [
        {
          title: founderCredit.role,
          description: flagship.title
        }
      ]
    : []),
  {
    title: "Convener",
    description: masterclass.name
  }
];

export default function FounderPageClient() {
  const prefersReducedMotion = useReducedMotion();
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <>
      {/* ---- Hero — fixed background, same technique used across the site.
            This section must never carry its own bg color: a background
            painted directly on it renders ABOVE a negative-z-index fixed
            child, silently hiding it. overflow-hidden here prevents the
            decorative aperture mark from causing horizontal page scroll. */}
      <section className="relative min-h-screen overflow-hidden text-offwhite">
        <div className="fixed inset-0 -z-10">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: prefersReducedMotion ? 1 : [1, 1.07, 1] }}
            transition={{ duration: KEN_BURNS_DURATION, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-full w-full"
          >
            <picture className="absolute inset-0 block h-full w-full">
              <source media="(max-width: 767px)" srcSet="/images/hero/sum.png" />
              {/* eslint-disable-next-line @next/next/no-img-element -- native <picture>/<source>
                  art direction isn't supported by next/image; matches the homepage hero. */}
              <img src="/images/hero/simm.png" alt={founder.name} className="h-full w-full object-cover" />
            </picture>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-charcoal/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/25 to-transparent" />

          {!prefersReducedMotion && (
            <motion.div
              animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0] }}
              transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-orange/[0.08] blur-[150px]"
            />
          )}
        </div>

        <div className="pointer-events-none absolute -right-28 -top-28 opacity-[0.08]">
          <ApertureIcon size={340} spin />
        </div>

        <div className="container-page relative z-10 flex min-h-screen flex-col justify-center py-24">
          <FadeIn>
            <div className="mb-7 inline-flex w-fit items-center gap-1.5 rounded-full border border-offwhite/15 bg-charcoal/60 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />
              <span className="font-mono text-[10px] tracking-wider text-offwhite/80">
                CONVENER · {masterclass.name.toUpperCase()}
              </span>
            </div>

            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/45">{founder.title}</p>
            <h1 className="mt-6 max-w-3xl font-body text-[clamp(2.75rem,7vw,5.5rem)] font-light leading-[1.05] tracking-tight text-offwhite">
              {founder.name}
            </h1>
            <p className="mt-5 text-xl font-light italic text-offwhite/55">
              Popularly known as <span className="font-medium not-italic text-orange">{founder.nickname}</span>
            </p>

            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-offwhite/65">
              {masterclass.description}
            </p>
          </FadeIn>

          {/* Real, derived stat strip */}
          <FadeIn delay={0.2} className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-offwhite/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold text-offwhite">{stat.value}</p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-offwhite/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ---- Portrait + quote ---- */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="container-page grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <FadeIn className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -left-4 -top-4 hidden h-full w-full -rotate-2 rounded-[1.75rem] border border-charcoal/10 bg-white sm:block"
            />
            <div
              className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] bg-charcoal-800 shadow-card"
              style={{ clipPath: "polygon(11% 0, 100% 0, 100% 100%, 0 100%, 0 12%)" }}
            >
              {!photoFailed ? (
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  onError={() => setPhotoFailed(true)}
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-950" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 flex h-20 w-20 items-center justify-center rounded-full border border-charcoal/10 bg-offwhite shadow-card sm:-right-6">
              <span className="bg-gradient-to-br from-orange to-gold bg-clip-text font-display text-4xl font-bold leading-none text-transparent">
                “
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">In Her Words</p>
            <blockquote className="mt-6 font-body text-[clamp(1.75rem,3.2vw,2.75rem)] font-light italic leading-[1.25] tracking-tight text-charcoal">
              “{founder.quote}”
            </blockquote>

            <div className="mt-8 flex items-center gap-3">
              <p className="font-body text-lg font-medium text-charcoal">{founder.name}</p>
              <span className="h-px w-8 bg-gradient-to-r from-orange to-gold" />
              <p className="text-sm font-light text-charcoal/50">{founder.title}</p>
            </div>

            <p className="mt-8 max-w-xl text-base font-light leading-relaxed text-charcoal/65">{founder.bio}</p>
            <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-charcoal/65">{founder.extendedBio}</p>
          </FadeIn>
        </div>
      </section>

      {/* ---- Roles — real credits, presented as a clean numbered list ---- */}
      <section className="border-t border-charcoal/8 bg-offwhite pb-24 md:pb-32">
        <div className="container-page">
          <FadeIn>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">Roles</p>
          </FadeIn>

          <div className="mt-10 divide-y divide-charcoal/8 border-t border-charcoal/8">
            {roles.map((role, i) => (
              <FadeIn key={role.title} delay={i * 0.08}>
                <div className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6">
                  <span className="font-display text-xl font-semibold text-orange/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-body text-lg font-medium text-charcoal">{role.title}</h3>
                    <p className="mt-1 text-sm font-light text-charcoal/55">{role.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Recognition ---- */}
      <section className="border-t border-charcoal/8 bg-offwhite py-24 md:py-32">
        <div className="container-page">
          <FadeIn>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">Recognition</p>
            <h2 className="mt-5 max-w-xl font-body text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.15] tracking-tight text-charcoal">
              Work that has traveled.
            </h2>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-charcoal/65">
              {founderRecognitionSummary}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ---- The Main Character Journey — cross-link to the dedicated
            masterclass page, since she's its convener. Reuses the real
            campaign poster already established on that page. ---- */}
      <section className="relative overflow-hidden border-y border-offwhite/10 bg-charcoal py-24 text-offwhite md:py-32">
        {!prefersReducedMotion && (
          <motion.div
            animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-orange/[0.08] blur-[150px]"
          />
        )}

        <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1fr_0.7fr]">
          <FadeIn>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/45">
              A Creative Masterclass, Convened by {founder.nickname}
            </p>
            <h2 className="mt-5 max-w-lg font-body text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.15] tracking-tight text-offwhite">
              {masterclass.name}
            </h2>
            <p className="mt-5 max-w-lg font-body text-lg font-light italic text-offwhite/60">
              &ldquo;{masterclassTagline}&rdquo;
            </p>
            <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-offwhite/60">
              {masterclass.description}
            </p>

            <Link
              href="/masterclass"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange to-gold px-7 py-3.5 text-sm font-semibold text-charcoal transition-transform duration-300 ease-cinematic hover:scale-[1.03] hover:shadow-[0_10px_30px_-8px_rgba(244,102,30,0.5)]"
            >
              <span>View the Masterclass</span>
              <span aria-hidden="true" className="transition-transform duration-300 ease-cinematic group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeIn>

          <FadeIn delay={0.15} className="mx-auto w-full max-w-xs lg:max-w-none">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-offwhite/10 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)] lg:rotate-1"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 91%, 91% 100%, 0 100%)" }}
            >
              <Image
                src="/images/masterclass/1.jpg"
                alt="Be Seen. Be Heard. Be the Main Character. — masterclass campaign artwork"
                fill
                sizes="(min-width: 1024px) 30vw, 80vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- Connect ---- */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="container-page text-center">
          <FadeIn>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">Follow {founder.nickname}</p>
            <h2 className="mt-5 font-body text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.15] tracking-tight text-charcoal">
              Stay close to the journey.
            </h2>

            <div className="mt-8 flex justify-center gap-4">
  <a
    href={founder.social.facebook}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 text-charcoal/50 transition-colors duration-200 hover:border-orange hover:text-orange"
    aria-label="Facebook"
  >
    <FacebookIcon />
  </a>

  <a
    href="https://www.instagram.com/stellamarisduru_smd?igsi=bWU5NnU1aXBwN3o4&utm_source=qr"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 text-charcoal/50 transition-colors duration-200 hover:border-orange hover:text-orange"
    aria-label="Instagram"
  >
    <InstagramIcon />
  </a>

  <a
    href={founder.social.youtube}
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 text-charcoal/50 transition-colors duration-200 hover:border-orange hover:text-orange"
    aria-label="YouTube"
  >
    <YoutubeIcon />
  </a>
</div>
            <Link href="/about" className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-charcoal">
              <span className="relative">
                Read the Full Company Story
                <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-charcoal transition-transform duration-300 ease-cinematic group-hover:scale-x-100" />
              </span>
              <span aria-hidden="true" className="transition-transform duration-300 ease-cinematic group-hover:translate-x-1">
                →
              </span>
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}