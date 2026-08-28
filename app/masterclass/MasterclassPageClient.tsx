"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import ApertureIcon from "@/components/ui/ApertureIcon";
import { company } from "@/lib/data/company";
import { masterclass } from "@/lib/data/founder";
import { pastMasterclasses, masterclassTagline, type Headliner, type HeadlinerRole } from "@/lib/data/masterclass-editions";

const ease = [0.16, 1, 0.3, 1] as const;
const ROLE_ORDER: HeadlinerRole[] = ["Special Guest of Honor", "Speaker", "Panelist", "Host", "Guest Appearance"];

// Real promotional materials from the masterclass campaign.
const campaignGallery = [
  {
    src: "/images/masterclass/2.jpg",
    alt: "The Main Character — Meet the Headliners flyer",
    caption: "Meet the Headliners — the official event flyer",
    ratio: "portrait" as const
  },
  {
    src: "/images/masterclass/1.jpg",
    alt: "Be Seen. Be Heard. Be the Main Character. campaign artwork",
    caption: "\u201cBe Seen. Be Heard. Be the Main Character.\u201d",
    ratio: "portrait" as const
  },
  {
    src: "/images/masterclass/3.jpg",
    alt: "The Main Character masterclass journal and program mockup",
    caption: "The 2026 masterclass journal & program",
    ratio: "landscape" as const
  }
];

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

// Real photo when it exists at the given path; otherwise a quiet
// initials placeholder, same graceful-upgrade convention used elsewhere.
function HeadlinerAvatar({ headliner }: { headliner: Headliner }) {
  const [failed, setFailed] = useState(false);
  const initials = headliner.name
    .replace(/\(.*\)/, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-charcoal/10 bg-offwhite">
      {headliner.photo && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element -- onError fallback needs a plain <img>
        <img
          src={headliner.photo}
          alt={headliner.name}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-display text-xs font-semibold text-charcoal/40">{initials}</span>
      )}
    </div>
  );
}

function whatsappWaitlistUrl() {
  const digits = company.contact.phone.replace(/\D/g, "");
  const international = digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
  const message = encodeURIComponent(
    "Hi! I'd like to join the waitlist for the next Main Character Journey masterclass."
  );
  return `https://wa.me/${international}?text=${message}`;
}

function WaitlistButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={whatsappWaitlistUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-orange to-gold px-7 py-3.5 text-sm font-semibold text-charcoal transition-transform duration-300 ease-cinematic hover:scale-[1.03] hover:shadow-[0_10px_30px_-8px_rgba(244,102,30,0.5)] ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.8 14.15c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.13-.95-.31-1.64-.6-2.9-1.25-4.79-4.16-4.93-4.35-.14-.19-1.18-1.57-1.18-2.99 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2.01.9 2.15.07.14.12.31.02.5-.1.19-.15.31-.3.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.74 1.22 1.6 1.98 1.1.98 2.02 1.28 2.31 1.42.29.14.46.12.63-.07.17-.19.71-.83.9-1.11.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
      </svg>
      <span>Join the Waitlist</span>
    </a>
  );
}

export default function MasterclassPageClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay can be blocked before user interaction on some browsers —
        // the first frame stays visible either way.
      });
    }
  }, [prefersReducedMotion]);

  const latestEdition = pastMasterclasses[0];

  return (
    <>
      {/* ---- Hero — fixed background video (true position: fixed, not
            background-attachment, so it works identically on iOS Safari
            and desktop). This section must never carry its own bg color:
            a background painted directly on it renders ABOVE a negative-
            z-index fixed child, silently hiding it. overflow-hidden here
            prevents the decorative aperture mark from causing horizontal
            page scroll. */}
      <section className="relative min-h-screen overflow-hidden text-offwhite">
        <div className="fixed inset-0 -z-10">
          <video ref={videoRef} muted loop playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover">
            <source src="/video/mast.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-charcoal/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/25 to-transparent" />

          {!prefersReducedMotion && (
            <motion.div
              animate={{ x: [0, 35, -15, 0], y: [0, -20, 15, 0] }}
              transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-orange/[0.08] blur-[150px]"
            />
          )}
        </div>

        <div className="pointer-events-none absolute -right-28 -top-28 opacity-[0.08]">
          <ApertureIcon size={360} spin />
        </div>

        <div className="container-page relative z-10 flex min-h-screen flex-col justify-center py-24">
          <FadeIn>
            <div className="mb-7 inline-flex w-fit items-center gap-1.5 rounded-full border border-offwhite/15 bg-charcoal/60 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />
              <span className="font-mono text-[10px] tracking-wider text-offwhite/80">A CREATIVE MASTERCLASS</span>
            </div>

            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/45">
              Convened by Stellamaris Duru (SMD)
            </p>

            <h1 className="mt-6 max-w-3xl font-body text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] tracking-tight text-offwhite">
              {masterclass.name}
            </h1>

            <p className="mt-6 max-w-xl font-body text-2xl font-light italic leading-snug text-offwhite/70 md:text-3xl">
              &ldquo;{masterclassTagline}&rdquo;
            </p>

            <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-offwhite/60">
              {masterclass.description}
            </p>

            <div className="mt-10">
              <WaitlistButton />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ---- Campaign gallery — real promotional materials, presented like
            prints scattered across a light table (same staggered-tilt
            language used for the homepage's double-feature panels). ---- */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="container-page">
          <FadeIn>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">The Campaign</p>
            <h2 className="mt-5 max-w-xl font-body text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.15] tracking-tight text-charcoal">
              A look at the movement.
            </h2>
          </FadeIn>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {campaignGallery.map((item, i) => (
              <FadeIn
                key={item.src}
                delay={i * 0.12}
                className={i === 1 ? "sm:col-span-2 lg:col-span-1 lg:mt-10" : ""}
              >
                <div
                  className={`group relative overflow-hidden rounded-[1.75rem] border border-charcoal/8 bg-white shadow-card transition-transform duration-500 ease-cinematic hover:-translate-y-1 ${
                    i === 0 ? "lg:rotate-[-1.5deg]" : i === 1 ? "lg:rotate-[1deg]" : "lg:rotate-[-0.5deg]"
                  }`}
                  style={{ clipPath: "polygon(0 0, 100% 0, 100% 91%, 91% 100%, 0 100%)" }}
                >
                  <div className={item.ratio === "portrait" ? "relative aspect-[4/5]" : "relative aspect-[16/11] bg-offwhite"}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={item.ratio === "portrait" ? "object-cover" : "object-contain p-4"}
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-light leading-relaxed text-charcoal/60">{item.caption}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Previous editions ---- */}
      <section className="bg-offwhite py-24 md:py-32">
        <div className="container-page">
          <FadeIn>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">The Archive</p>
            <h2 className="mt-5 max-w-xl font-body text-[clamp(1.75rem,3.5vw,2.75rem)] font-light leading-[1.15] tracking-tight text-charcoal">
              Previous Masterclasses
            </h2>
          </FadeIn>

          <div className="mt-14 space-y-16">
            {pastMasterclasses.map((edition, editionIndex) => {
              const grouped = ROLE_ORDER.map((role) => ({
                role,
                people: edition.headliners.filter((h) => h.role === role)
              })).filter((g) => g.people.length > 0);

              return (
                <FadeIn key={`${edition.title}-${edition.date}`} delay={editionIndex * 0.1}>
                  <div className="rounded-[1.75rem] border border-charcoal/8 bg-white p-8 shadow-card md:p-12">
                    {/* Edition header */}
                    <div className="flex flex-col gap-6 border-b border-charcoal/8 pb-8 md:flex-row md:items-end md:justify-between">
                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-orange">
                          {edition.date}
                        </p>
                        <h3 className="mt-2 font-body text-2xl font-medium text-charcoal md:text-3xl">
                          {edition.title}
                        </h3>
                        <p className="mt-2 text-sm font-light leading-relaxed text-charcoal/55">{edition.venue}</p>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {edition.schedule.map((slot) => (
                          <div
                            key={slot.label}
                            className="rounded-full border border-charcoal/10 bg-offwhite px-4 py-2 text-xs font-light text-charcoal/60"
                          >
                            <span className="font-medium text-charcoal">{slot.time}</span> — {slot.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Headliners grouped by role */}
                    <div className="mt-8 space-y-8">
                      {grouped.map((group) => (
                        <div key={group.role}>
                          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/40">
                            {group.role}
                            {group.people.length > 1 ? "s" : ""}
                          </p>
                          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {group.people.map((person) => (
                              <div key={person.name} className="flex items-center gap-3">
                                <HeadlinerAvatar headliner={person} />
                                <span className="text-sm font-medium text-charcoal">{person.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Partners */}
                    {edition.partners.length > 0 && (
                      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-charcoal/8 pt-6">
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal/40">
                          Partners
                        </span>
                        {edition.partners.map((partner) => (
                          <span key={partner} className="font-display text-sm font-semibold text-charcoal/60">
                            {partner}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Next edition — honest "coming soon", no fabricated date ---- */}
      <section className="relative overflow-hidden border-y border-offwhite/10 bg-charcoal py-24 text-offwhite md:py-32">
        {!prefersReducedMotion && (
          <motion.div
            animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-orange/[0.08] blur-[150px]"
          />
        )}

        <div className="container-page relative text-center">
          <FadeIn>
            <div className="mx-auto mb-7 inline-flex w-fit items-center gap-1.5 rounded-full border border-offwhite/15 bg-charcoal/60 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />
              <span className="font-mono text-[10px] tracking-wider text-offwhite/80">NEXT EDITION — COMING SOON</span>
            </div>

            <h2 className="mx-auto max-w-2xl font-body text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.2] tracking-tight text-offwhite">
              The next chapter of The Main Character Journey is being written.
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-offwhite/60">
              Dates, venue, and headliners for the next edition haven&apos;t been announced yet. Join the waitlist and
              we&apos;ll reach out the moment registration opens.
            </p>

            <div className="mt-10 flex justify-center">
              <WaitlistButton />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}