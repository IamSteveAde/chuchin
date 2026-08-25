"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }

    const getScrollY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const onScroll = () => {
      setSolid(getScrollY() > 48);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-[999] pt-4 sm:pt-6"
      style={{
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
      }}
    >
      <div className="container-page">

        {/* =====================================================
            HEADER SHELL
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease,
          }}
          className={`
            relative flex items-center justify-between
            transition-all duration-700 ease-cinematic
            ${
              solid
                ? `
                  border border-offwhite/[0.12]
                  bg-charcoal/80
                  px-4 py-3
                  shadow-[0_12px_45px_-18px_rgba(0,0,0,0.7)]
                  backdrop-blur-2xl
                  backdrop-saturate-150
                  sm:px-6
                  sm:py-3.5
                `
                : `
                  border border-transparent
                  bg-transparent
                  px-0
                  py-2
                  sm:px-1
                `
            }
          `}
        >

          {/* ===================================================
              SUBTLE TOP LIGHT
          =================================================== */}

          {solid && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent"
            />
          )}

          {/* ===================================================
              LOGO
          =================================================== */}

          <Link
            href="/"
            aria-label="Chuchin Ultimate Productions home"
            className="group relative z-10 flex shrink-0 items-center"
          >
            <Image
              src="/images/logos/logw.png"
              alt="Chuchin Ultimate Productions Ltd."
              width={160}
              height={48}
              priority
              className={`
                h-8 w-auto
                transition-all duration-500
                sm:h-9
                ${
                  solid
                    ? "opacity-100"
                    : "opacity-[0.96] group-hover:opacity-100"
                }
              `}
            />
          </Link>


          {/* ===================================================
              NAVIGATION
          =================================================== */}

          <div className="relative z-10">
            <Navigation />
          </div>


          {/* ===================================================
              MOBILE / EDGE DETAIL
          =================================================== */}

          {!solid && (
            <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-offwhite/20" />
            </div>
          )}

        </motion.div>


        {/* =====================================================
            SCROLL PROGRESS / BRAND LINE
        ===================================================== */}

        {isHome && solid && (
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="pointer-events-none mx-auto mt-1 h-px max-w-[calc(100%-2rem)] origin-center bg-gradient-to-r from-transparent via-orange/30 to-transparent sm:max-w-[calc(100%-3rem)]"
          />
        )}

      </div>
    </header>
  );
}