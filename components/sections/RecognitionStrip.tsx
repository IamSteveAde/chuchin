"use client";

import { motion } from "framer-motion";
import { recognitions } from "@/lib/data/company";

const ease = [0.16, 1, 0.3, 1] as const;

// Visually encodes status by color intensity, not just a text tag —
// a win gets the full brand gradient, a nomination stays quiet.
function tone(note: string) {
  if (note === "Winner") return { leaf: "from-orange to-gold", ribbon: "from-orange to-gold", text: "text-orange" };
  if (note === "Selected") return { leaf: "from-gold to-gold", ribbon: "from-gold to-gold", text: "text-gold" };
  return { leaf: "from-charcoal/25 to-charcoal/15", ribbon: "from-charcoal/25 to-charcoal/15", text: "text-charcoal/40" };
}

// A stylized laurel wing — pure CSS fan of tapered leaves pivoting from a
// single base point, no hand-drawn SVG path required. Mirrored via
// scale-x for the opposite side.
function LaurelWing({ mirror, gradient }: { mirror?: boolean; gradient: string }) {
  const leaves = 6;
  return (
    <div className={`relative h-12 w-7 shrink-0 ${mirror ? "scale-x-[-1]" : ""}`} aria-hidden="true">
      {Array.from({ length: leaves }).map((_, i) => {
        const t = i / (leaves - 1); // 0 at base, 1 at tip
        const angle = -6 - t * 58;
        const size = 1 - t * 0.4;
        return (
          <span
            key={i}
            className={`absolute bottom-0 left-1/2 origin-bottom rounded-full bg-gradient-to-t ${gradient}`}
            style={{
              width: `${5 * size}px`,
              height: `${15 * size}px`,
              transform: `translateX(-50%) rotate(${angle}deg) translateY(-${2 + t * 5}px)`
            }}
          />
        );
      })}
    </div>
  );
}

function LaurelBadge({ festival, award, note }: { festival: string; award: string; note: string }) {
  const t = tone(note);
  return (
    <div className="flex w-64 shrink-0 flex-col items-center px-8 text-center">
      <div className="flex items-end justify-center">
        <LaurelWing gradient={t.leaf} />
        <div className="flex flex-col items-center px-2">
          <span className={`text-[10px] font-medium uppercase tracking-[0.25em] ${t.text}`}>{note}</span>
          <span className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-charcoal">{festival}</span>
        </div>
        <LaurelWing mirror gradient={t.leaf} />
      </div>
      <div className={`mt-3 h-px w-14 bg-gradient-to-r ${t.ribbon}`} />
      <p className="mt-3 max-w-[15rem] text-xs font-light leading-relaxed text-charcoal/50">{award}</p>
    </div>
  );
}

export default function RecognitionStrip() {
  // Duplicated once so the marquee keyframe (0 → -50%) loops seamlessly.
  const track = [...recognitions, ...recognitions];

  return (
    <section className="overflow-hidden border-y border-charcoal/8 bg-offwhite py-20 md:py-24">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease }}
        className="container-page text-center text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/40"
      >
        Recognized On the International Circuit
      </motion.p>

      {/* Full-bleed marquee track — deliberately breaks out of container-page
          so badges scroll edge-to-edge, with a soft fade at each side. */}
      <div className="relative mt-14">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-offwhite to-transparent md:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-offwhite to-transparent md:w-32" />

        <div className="flex w-max animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
          {track.map((r, i) => (
            <LaurelBadge key={`${r.festival}-${r.award}-${i}`} festival={r.festival} award={r.award} note={r.note} />
          ))}
        </div>
      </div>
    </section>
  );
}