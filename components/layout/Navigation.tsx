"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import ApertureIcon from "../ui/ApertureIcon";

const links = [
  { href: "/about", label: "About" },
  { href: "/productions", label: "Productions" },
{ href: "/masterclass", label: "Masterclass" },
  { href: "/partners", label: "Partners" },
  { href: "/careers", label: "Careers" },
  { href: "/founder", label: "Founder" },
 
  { href: "/contact", label: "Contact" },
];

const ease = [0.16, 1, 0.3, 1] as const;

const closed = "circle(0% at calc(100% - 2.5rem) 2.5rem)";
const open = "circle(150% at calc(100% - 2.5rem) 2.5rem)";

/* ============================================================
   ARROW
============================================================ */

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

/* ============================================================
   NAVIGATION
============================================================ */

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  /*
   * Prevent body scrolling while mobile navigation is open.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  /*
   * Close menu when navigating with browser history.
   */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ======================================================
          DESKTOP NAVIGATION
      ====================================================== */}

      <nav className="hidden lg:flex items-center gap-1.5">

        {/* Main links */}
        <div className="flex items-center border border-offwhite/10 bg-charcoal/25 px-1.5 py-1.5 backdrop-blur-xl">

          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2.5"
              >
                {/* Active background */}
                {active && (
                  <motion.span
                    layoutId="desktop-nav-active"
                    transition={{
                      duration: 0.45,
                      ease,
                    }}
                    className="absolute inset-0 bg-offwhite/[0.08]"
                  />
                )}

                {/* Label */}
                <span
                  className={`relative z-10 text-[11px] font-medium tracking-[0.03em] transition-colors duration-300 ${
                    active
                      ? "text-offwhite"
                      : "text-offwhite/55 group-hover:text-offwhite"
                  }`}
                >
                  {link.label}
                </span>

                {/* Orange active marker */}
                {active && (
                  <motion.span
                    layoutId="desktop-nav-marker"
                    transition={{
                      duration: 0.4,
                      ease,
                    }}
                    className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 bg-gradient-to-r from-orange to-gold"
                  />
                )}

                {/* Hover marker */}
                {!active && (
                  <span className="absolute bottom-0 left-1/2 h-[1px] w-0 -translate-x-1/2 bg-orange transition-all duration-300 group-hover:w-5" />
                )}
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href="/partners"
          className="group ml-2 flex items-center gap-4 border border-orange/60 bg-gradient-to-r from-orange to-gold px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-all duration-300 hover:border-orange hover:shadow-[0_10px_30px_-10px_rgba(244,102,30,0.65)]"
        >
          <span>Partner With Us</span>

          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

      </nav>


      {/* ======================================================
          MOBILE MENU BUTTON
      ====================================================== */}

      <button
        onClick={() => setMenuOpen(true)}
        className="group relative flex h-11 w-11 items-center justify-center border border-offwhite/15 bg-charcoal/20 backdrop-blur-xl lg:hidden"
        aria-label="Open menu"
        aria-expanded={menuOpen}
      >
        <div className="flex w-5 flex-col gap-[5px]">

          <motion.span
            animate={{
              width: menuOpen ? "20px" : "20px",
            }}
            className="block h-[1.5px] bg-offwhite transition-all"
          />

          <motion.span
            animate={{
              width: menuOpen ? "13px" : "20px",
            }}
            className="ml-auto block h-[1.5px] bg-offwhite transition-all"
          />

        </div>
      </button>


      {/* ======================================================
          MOBILE MENU
      ====================================================== */}

      {mounted &&
        createPortal(
          <AnimatePresence>

            {menuOpen && (
              <motion.div
                initial={{ clipPath: closed }}
                animate={{ clipPath: open }}
                exit={{ clipPath: closed }}
                transition={{
                  duration: 0.8,
                  ease,
                }}
                className="fixed inset-0 z-[1000] overflow-hidden bg-charcoal text-offwhite lg:hidden"
              >

                {/* ------------------------------------------------
                    Background atmosphere
                ------------------------------------------------ */}

                <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#191715] to-[#252018]" />

                <div className="pointer-events-none absolute -right-36 -top-36 opacity-[0.055]">
                  <ApertureIcon
                    size={520}
                    spin
                  />
                </div>

                <div className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-orange/[0.05] blur-[140px]" />

                {/* Fine border */}
                <div className="pointer-events-none absolute inset-5 border border-offwhite/[0.06]" />


                {/* ------------------------------------------------
                    Content
                ------------------------------------------------ */}

                <div className="relative flex h-full flex-col px-8 py-7">

                  {/* Header */}
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold" />

                      <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/45">
                        Navigation
                      </span>

                    </div>

                    <button
                      onClick={() => setMenuOpen(false)}
                      aria-label="Close menu"
                      className="group flex h-10 w-10 items-center justify-center border border-offwhite/15 transition-colors duration-300 hover:border-orange"
                    >
                      <div className="relative h-5 w-5">

                        <span className="absolute left-0 top-1/2 h-px w-5 rotate-45 bg-offwhite transition-colors group-hover:bg-orange" />

                        <span className="absolute left-0 top-1/2 h-px w-5 -rotate-45 bg-offwhite transition-colors group-hover:bg-orange" />

                      </div>
                    </button>

                  </div>


                  {/* ------------------------------------------------
                      Main navigation
                  ------------------------------------------------ */}

                  <div className="flex flex-1 flex-col justify-center py-10">

                    <div className="mb-7 flex items-center gap-3">

                      <span className="text-[9px] uppercase tracking-[0.3em] text-offwhite/25">
                        Explore
                      </span>

                      <span className="h-px w-8 bg-offwhite/10" />

                    </div>

                    <div>
                      {links.map((link, i) => {

                        const active = pathname === link.href;

                        return (
                          <motion.div
                            key={link.href}
                            initial={{
                              opacity: 0,
                              x: 35,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: 0.25 + i * 0.065,
                              duration: 0.65,
                              ease,
                            }}
                          >

                            <Link
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className="group relative flex items-center gap-5 border-b border-offwhite/[0.08] py-4"
                            >

                              {/* Number */}
                              <span
                                className={`w-6 font-mono text-[9px] transition-colors duration-300 ${
                                  active
                                    ? "text-orange"
                                    : "text-offwhite/20 group-hover:text-orange"
                                }`}
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>

                              {/* Label */}
                              <span
                                className={`font-body text-[clamp(1.7rem,7vw,2.5rem)] font-light leading-none tracking-[-0.025em] transition-all duration-300 ${
                                  active
                                    ? "translate-x-1 text-offwhite"
                                    : "text-offwhite/60 group-hover:translate-x-1 group-hover:text-offwhite"
                                }`}
                              >
                                {link.label}
                              </span>

                              {/* Active dot */}
                              {active && (
                                <motion.span
                                  layoutId="mobile-nav-active"
                                  className="ml-auto h-1.5 w-1.5 rounded-full bg-gradient-to-br from-orange to-gold"
                                />
                              )}

                              {/* Hover arrow */}
                              {!active && (
                                <span className="ml-auto translate-x-2 text-offwhite/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-orange">
                                  →
                                </span>
                              )}

                            </Link>

                          </motion.div>
                        );
                      })}
                    </div>

                  </div>


                  {/* ------------------------------------------------
                      Bottom area
                  ------------------------------------------------ */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.75,
                      duration: 0.6,
                      ease,
                    }}
                  >

                    {/* CTA */}
                    <Link
                      href="/partners"
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-center justify-between border border-offwhite/20 bg-offwhite px-5 py-4 text-charcoal transition-all duration-300 hover:bg-gradient-to-r hover:from-orange hover:to-gold"
                    >

                      <div>
                        <p className="text-[8px] uppercase tracking-[0.25em] text-charcoal/40">
                          Start a conversation
                        </p>

                        <p className="mt-1 text-sm font-semibold">
                          Partner With Us
                        </p>
                      </div>

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <ArrowUpRight />
                      </span>

                    </Link>


                    {/* Bottom meta */}
                    <div className="mt-7 flex items-center justify-between">

                      <div>
                        <p className="text-[8px] uppercase tracking-[0.25em] text-offwhite/25">
                          Film · Culture · Talent
                        </p>

                        <p className="mt-1 text-[8px] uppercase tracking-[0.25em] text-offwhite/15">
                          Africa
                        </p>
                      </div>

                      <span className="font-mono text-[9px] text-offwhite/20">
                        © {new Date().getFullYear()}
                      </span>

                    </div>

                  </motion.div>

                </div>

              </motion.div>
            )}

          </AnimatePresence>,
          document.body
        )}
    </>
  );
}