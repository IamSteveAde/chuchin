"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { founder } from "@/lib/data/founder";

const ease = [0.16, 1, 0.3, 1] as const;

export default function FounderSpotlight() {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <section className="bg-offwhite py-24 md:py-32">
      <div className="container-page grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        {/* ---- Photo ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          {/* Offset card behind — same stacked-photo depth as the About
              section, rotated the opposite way so the two don't read as
              a copy-pasted template. */}
          <div
            aria-hidden="true"
            className="absolute -left-4 -top-4 hidden h-full w-full -rotate-2 rounded-[1.75rem] border border-charcoal/10 bg-white sm:block"
          />

          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] bg-charcoal-800 shadow-card"
            style={{ clipPath: "polygon(11% 0, 100% 0, 100% 100%, 0 100%, 0 12%)" }}
          >
            {!imageFailed ? (
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                onError={() => setImageFailed(true)}
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 to-charcoal-950" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
          </div>

          {/* Quote seal — overlaps the frame corner, visually tying the
              photo directly to the words beside it. */}
          <div className="absolute -bottom-6 -right-4 flex h-20 w-20 items-center justify-center rounded-full border border-charcoal/10 bg-offwhite shadow-card sm:-right-6">
            <span className="bg-gradient-to-br from-orange to-gold bg-clip-text font-display text-4xl font-bold leading-none text-transparent">
              “
            </span>
          </div>
        </motion.div>

        {/* ---- Copy ---- */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">Founder</p>

          {/* Oversized decorative quote mark sits behind the blockquote —
              an editorial magazine-profile touch. */}
          <div className="relative mt-6">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-3 -top-14 select-none bg-gradient-to-br from-orange/25 to-gold/15 bg-clip-text font-display text-[9rem] font-bold leading-none text-transparent sm:-top-16 sm:text-[11rem]"
            >
              “
            </span>
            <blockquote className="relative font-body text-[clamp(1.75rem,3.2vw,2.5rem)] font-light leading-[1.3] tracking-tight text-charcoal">
              {founder.quote}
            </blockquote>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <p className="font-body text-lg font-medium text-charcoal">{founder.name}</p>
            <span className="h-px w-8 bg-gradient-to-r from-orange to-gold" />
            <p className="text-sm font-light text-charcoal/50">{founder.title}</p>
          </div>

          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-charcoal/65">{founder.bio}</p>

          <Link href="/founder" className="group mt-9 inline-flex items-center gap-2 text-sm font-medium text-charcoal">
            <span className="relative">
              Read Full Story
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