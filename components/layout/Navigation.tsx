"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "/about", label: "About" },
  { href: "/productions", label: "Productions" },
  { href: "/news", label: "News" },
  { href: "/partners", label: "Partners" },
  { href: "/careers", label: "Careers" },
  { href: "/media-kit", label: "Media Kit" },
  { href: "/contact", label: "Contact" }
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
              {/* Gradient underline sweep on hover */}
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
        onClick={() => setOpen(true)}
        className="lg:hidden flex flex-col gap-1.5 p-2"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <span className="block h-[2px] w-6 bg-offwhite" />
        <span className="block h-[2px] w-6 bg-offwhite" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col bg-charcoal px-6 py-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold text-offwhite">Menu</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-offwhite text-2xl leading-none">
                ×
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-3xl font-bold text-offwhite hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: links.length * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <Link
                href="/partners"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-gradient-to-r from-orange to-gold px-6 py-3 text-sm font-semibold text-charcoal"
              >
                Partner With Us
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}