"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ApertureIcon from "../ui/ApertureIcon";
import Button from "../ui/Button";
import { masterclass } from "@/lib/data/founder";

const ease = [0.16, 1, 0.3, 1] as const;

export default function MasterclassCTA() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (prefersReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay can be blocked before user interaction on some
        // browsers — the poster frame / first frame stays visible either way.
      });
    }
  }, [prefersReducedMotion]);

  return (
    <section className="relative overflow-hidden bg-charcoal py-28 text-offwhite md:py-36">
      {/* Background video — muted/looping, paused automatically for
          prefers-reduced-motion (first frame stays visible either way). */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/mast.mp4" type="video/mp4" />
      </video>

      {/* Legibility scrim — heavier on the left where text sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-charcoal/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/25 to-transparent" />

      {/* One quiet ambient glow — same restrained accent rule as every other dark section */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -25, 20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full bg-orange/[0.08] blur-[150px]"
        />
      )}

      {/* Large ambient aperture mark, quiet brand presence in the corner */}
      <div className="pointer-events-none absolute -right-16 -top-16 opacity-[0.12]">
        <ApertureIcon size={280} spin />
      </div>

      <div className="container-page relative">
        {/* Status chip — same HUD-chip language used across the site */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-offwhite/15 bg-charcoal/60 px-3 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />
          <span className="font-mono text-[10px] tracking-wider text-offwhite/80">ENROLLING NOW</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-2xl"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/45">
            A Creative Masterclass — Convened by {masterclass.convener}
          </p>

          <h2 className="mt-6 font-body text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.1] tracking-tight text-offwhite">
            {masterclass.name}
          </h2>

          <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-offwhite/60 md:text-lg">
            {masterclass.description}
          </p>

          <Button href="/masterclass" variant="ghost" className="mt-10 border-offwhite/25">
            {masterclass.cta}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}