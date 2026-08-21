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
  { href: "/news", label: "News" },
  { href: "/partners", label: "Partners" },
  { href: "/careers", label: "Careers" },
  { href: "/media-kit", label: "Media Kit" },
  { href: "/contact", label: "Contact" }
];

const ease = [0.16, 1, 0.3, 1] as const;

// Anchored near the hamburger button's position (top-right of the header),
// so the menu feels like it's emerging from the icon you tapped rather
// than an arbitrary full-screen fade.
const closed = "circle(0% at calc(100% - 2.5rem) 2.5rem)";
const open = "circle(150% at calc(100% - 2.5rem) 2.5rem)";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Portals only work client-side, once `document` exists.
  useEffect(() => setMounted(true), []);

  return (
    <>
      <nav className="hidden lg:flex items-center gap-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative rounded-full px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                active ? "text-orange" : "text-offwhite/80 hover:text-offwhite"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-orange/12"
                  transition={{ duration: 0.4, ease }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
              <span
                className={`absolute inset-x-4 bottom-1 h-[2px] scale-x-0 rounded-full bg-gradient-to-r from-orange to-gold transition-transform duration-300 ease-cinematic group-hover:scale-x-100 ${
                  active ? "hidden" : ""
                }`}
              />
            </Link>
          );
        })}

        <Link
          href="/partners"
          className="ml-2 rounded-full bg-gradient-to-r from-orange to-gold px-5 py-2 text-sm font-semibold text-charcoal transition-transform duration-300 ease-cinematic hover:scale-105 hover:shadow-[0_6px_20px_-4px_rgba(244,102,30,0.55)]"
        >
          Partner With Us
        </Link>
      </nav>

      <button
        onClick={() => setMenuOpen(true)}
        className="lg:hidden flex flex-col gap-1.5 p-2"
        aria-label="Open menu"
        aria-expanded={menuOpen}
      >
        <span className="block h-[2px] w-6 bg-offwhite" />
        <span className="block h-[2px] w-6 bg-offwhite" />
      </button>

      {/* Portaled straight to <body> so this "fixed inset-0" overlay is
          never a descendant of the header — the header applies its own
          transform (a Safari fixed+backdrop-blur fix), and a transform on
          an ancestor hijacks the containing block for fixed children,
          shrinking this overlay down to the header's own bounding box
          instead of the full viewport. Portaling sidesteps that entirely. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ clipPath: closed }}
                animate={{ clipPath: open }}
                exit={{ clipPath: closed }}
                transition={{ duration: 0.75, ease }}
                className="fixed inset-0 z-[1000] overflow-hidden bg-gradient-to-br from-orange via-charcoal to-gold lg:hidden"
              >
                {/* Darkening wash — keeps the brand gradient visible while
                    offwhite text stays legible over it. */}
                <div className="absolute inset-0 bg-charcoal/60" />

                {/* Large ambient aperture mark — same brand-texture language
                    used behind the Hero, Masterclass, and Partners sections. */}
                <div className="pointer-events-none absolute -right-24 -top-24 opacity-[0.1]">
                  <ApertureIcon size={420} spin />
                </div>

                <div className="relative flex h-full flex-col px-6 py-6">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/60">
                      Menu
                    </span>
                    <button
                      onClick={() => setMenuOpen(false)}
                      aria-label="Close menu"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-offwhite/20 text-offwhite text-xl leading-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-14 flex flex-1 flex-col justify-center gap-1">
                    {links.map((link, i) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease }}
                        className="flex items-baseline gap-4 border-b border-offwhite/10 py-4"
                      >
                        <span className="font-mono text-xs text-offwhite/40">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="font-body text-xl font-normal text-offwhite transition-colors duration-200 hover:text-orange"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + links.length * 0.06 + 0.1, duration: 0.5, ease }}
                    className="pb-4"
                  >
                    <Link
                      href="/partners"
                      onClick={() => setMenuOpen(false)}
                      className="inline-block w-full rounded-full bg-offwhite py-4 text-center text-sm font-semibold text-charcoal transition-transform duration-300 ease-cinematic hover:scale-[1.02]"
                    >
                      Partner With Us
                    </Link>
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