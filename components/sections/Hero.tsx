"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "../ui/Button";
import { heroSlides } from "@/lib/data/hero";

const ease = [0.16, 1, 0.3, 1] as const;
const SLIDE_DURATION = 8000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const slide = heroSlides[index];

  const goTo = useCallback((next: number) => {
    setIndex((next + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => goTo(index + 1), SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, prefersReducedMotion]);

  // As the visitor scrolls past the hero, the foreground content gently
  // fades and sinks while the fixed background stays put underneath.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative text-offwhite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fixed background — true `position: fixed`, not background-attachment,
          so it behaves identically on iOS Safari and desktop. Content
          sections below (with solid bg-offwhite/bg-charcoal) naturally cover
          it as the page scrolls past.

          IMPORTANT: this <section> must never carry its own background
          color/image class — that would paint above this negative-z-index
          layer and hide whatever is set below. */}
      <div className="fixed inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease }}
            className="absolute inset-0"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: prefersReducedMotion ? 1 : 1.05 }}
              transition={{ duration: SLIDE_DURATION / 1000 + 1, ease: "linear" }}
              className="relative h-full w-full"
            >
              {slide.image ? (
                <picture className="absolute inset-0 block h-full w-full">
                  {/* Browser only downloads whichever source matches — never both. */}
                  {slide.imageMobile && <source media="(max-width: 767px)" srcSet={slide.imageMobile} />}
                  {/* eslint-disable-next-line @next/next/no-img-element -- native <picture>/<source>
                      art direction (different crop per breakpoint) isn't supported by next/image. */}
                  <img src={slide.image} alt={slide.imageLabel} className="h-full w-full object-cover" />
                </picture>
              ) : (
                <div className={`h-full w-full bg-gradient-to-br ${slide.gradient}`} />
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Legibility scrim — heavier on the left where text sits, sheer on
            the right so the image still reads. */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/45 to-charcoal/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/15 to-transparent" />

        {/* One quiet ambient glow — no other color competes with the
            headline's accent line. */}
        {!prefersReducedMotion && (
          <motion.div
            animate={{ x: [0, 40, -15, 0], y: [0, -25, 15, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-orange/[0.06] blur-[160px]"
          />
        )}
      </div>

      <motion.div
        style={prefersReducedMotion ? undefined : { opacity: contentOpacity, y: contentY }}
        className="container-page relative z-10 flex min-h-[100vh] flex-col justify-center"
      >
        <div className="max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 22, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 1, ease }}
            >
              <p className="text-[11px] font-normal uppercase tracking-[0.35em] text-offwhite/45">
                {slide.eyebrow}
              </p>

              <h1 className="mt-7 font-body text-[clamp(2.5rem,5.5vw,4.5rem)] font-light leading-[1.12] tracking-tight text-offwhite">
                {slide.title}
                <motion.span
                  animate={
                    prefersReducedMotion ? undefined : { backgroundPosition: ["0% center", "200% center"] }
                  }
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="block bg-gradient-to-r from-orange via-gold to-orange bg-[length:200%_auto] bg-clip-text font-medium italic text-transparent"
                >
                  {slide.titleAccent}
                </motion.span>
              </h1>

              <p className="mt-7 max-w-md text-base font-light leading-relaxed text-offwhite/55">
                {slide.description}
              </p>

              <div className="mt-11 flex flex-wrap items-center gap-4">
                <Button href={slide.cta.href} variant="ghost" className="border-offwhite/25 font-normal">
                  {slide.cta.label}
                </Button>
                <Button href="partners" variant="ghost" className="border-offwhite/10 font-normal text-offwhite/70">
                  Partner With Us
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Minimal chrome — a quiet slide label and thin ticks, nothing else. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-10 z-10 sm:bottom-14">
        <div className="container-page flex items-center justify-between gap-6">
          <p className="hidden text-[11px] font-light uppercase tracking-[0.3em] text-offwhite/35 sm:block">
            {String(index + 1).padStart(2, "0")} — {slide.title}
          </p>

          <div className="pointer-events-auto flex items-center gap-3">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1}: ${s.title}`}
                aria-current={i === index}
                className="group relative h-[2px] w-8 overflow-hidden rounded-full bg-offwhite/15 transition-colors duration-300 hover:bg-offwhite/30"
              >
                {i === index && (
                  <motion.span
                    key={`${slide.id}-progress`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: paused || prefersReducedMotion ? undefined : 1 }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                    className="absolute inset-0 origin-left bg-offwhite"
                  />
                )}
                {i < index && <span className="absolute inset-0 bg-offwhite/50" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Faint centered scroll cue — decorative only. */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-3 left-1/2 hidden h-6 w-px -translate-x-1/2 bg-offwhite sm:block"
        />
      )}
    </section>
  );
}