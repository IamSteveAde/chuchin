"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "../ui/Button";
import ApertureIcon from "../ui/ApertureIcon";

const ease = [0.16, 1, 0.3, 1] as const;

export default function PartnersCTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-charcoal py-24 text-offwhite md:py-32">
      {/* Large ambient aperture mark — quiet background texture, bottom-right
          and partially cropped off-canvas, echoing the same brand-mark
          language used in the Hero and Masterclass sections. */}
      <div className="pointer-events-none absolute -bottom-24 -right-24 opacity-[0.07]">
        <ApertureIcon size={420} spin />
      </div>

      {/* One quiet ambient glow — same restrained single-accent rule as
          every other dark section on the site. */}
      {!prefersReducedMotion && (
        <motion.div
          animate={{ x: [0, 35, -15, 0], y: [0, -20, 15, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -left-32 top-0 h-[30rem] w-[30rem] rounded-full bg-orange/[0.07] blur-[150px]"
        />
      )}

      <div className="container-page relative flex flex-col items-start gap-12 md:flex-row md:items-center md:justify-between md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-xl"
        >
          {/* Status chip — same HUD language as REC / MUTED / ENROLLING NOW elsewhere */}
          <div className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-offwhite/15 bg-charcoal-800/60 px-3 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />
            <span className="font-mono text-[10px] tracking-wider text-offwhite/80">OPEN FOR PARTNERSHIP</span>
          </div>

          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/45">
            For Investors &amp; Partners
          </p>

          <h2 className="mt-5 font-body text-[clamp(2rem,4vw,3.25rem)] font-light leading-[1.15] tracking-tight text-offwhite">
            Collaborate on the next story.
          </h2>

          <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-offwhite/60 md:text-lg">
            We work with sponsors, distribution partners, and streaming networks who want to bring
            authentic African stories to wider audiences.
          </p>
        </motion.div>

        {/* Thin gradient divider — same ribbon motif used across the site,
            here doing double duty as a structural separator on desktop. */}
        <div className="hidden h-20 w-px shrink-0 bg-gradient-to-b from-transparent via-offwhite/15 to-transparent md:block" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <Button href="/#" variant="ghost">
            Partnership Opportunities
          </Button>
        </motion.div>
      </div>
    </section>
  );
}