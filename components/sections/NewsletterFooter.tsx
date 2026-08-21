"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ApertureIcon from "../ui/ApertureIcon";

const ease = [0.16, 1, 0.3, 1] as const;

export default function NewsletterFooter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // Wire up to an email provider (Mailchimp, ConvertKit, etc.) at integration time.
    setSubmitted(true);
  }

  return (
    <section className="border-t border-charcoal/8 bg-offwhite py-20 md:py-24">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="relative mx-auto max-w-4xl"
        >
          {/* Offset outline card behind — same stacked-depth language as
              the About and Founder sections, kept as an unfilled outline
              here so it stays quiet behind a functional form. */}
          <div
            aria-hidden="true"
            className="absolute -bottom-3 -right-3 hidden h-full w-full rotate-1 rounded-3xl border border-charcoal/10 sm:block"
          />

          <div className="relative flex flex-col items-start justify-between gap-10 rounded-3xl border border-charcoal/10 bg-white p-10 shadow-card md:flex-row md:items-center md:gap-8 md:p-14">
            {/* Seal chip — overlaps the top edge, same signature-stamp
                convention as the quote seal on the Founder photo. */}
            <div className="absolute -top-6 left-10 flex h-12 w-12 items-center justify-center rounded-full border border-charcoal/10 bg-offwhite shadow-card">
              <ApertureIcon size={22} spin />
            </div>

            <div className="max-w-md pt-2 md:pt-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-charcoal/45">Stay in the Loop</p>
              <h3 className="mt-4 font-body text-[clamp(1.75rem,3vw,2.5rem)] font-light leading-[1.2] tracking-tight text-charcoal">
                Premieres, casting calls, and behind-the-scenes — first.
              </h3>
            </div>

            {/* Thin gradient divider — same ribbon motif used across the site */}
            <div className="hidden h-16 w-px shrink-0 bg-gradient-to-b from-transparent via-charcoal/10 to-transparent md:block" />

            <div className="w-full max-w-sm">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange to-gold">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-offwhite" strokeWidth={2.5}>
                        <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <p className="font-medium text-charcoal">You&apos;re on the list. Thank you.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col gap-3 sm:flex-row"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-full border border-charcoal/20 bg-offwhite px-5 py-3 text-sm font-light text-charcoal placeholder:text-charcoal/40 focus:border-orange focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="whitespace-nowrap rounded-full bg-charcoal px-6 py-3 text-sm font-medium text-offwhite transition-all duration-300 ease-cinematic hover:bg-gradient-to-r hover:from-orange hover:to-gold"
                    >
                      Subscribe
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}