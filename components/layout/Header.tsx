"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On the homepage the header starts transparent, sitting directly on the
  // hero image, and only picks up its blurred glass background once the
  // visitor scrolls. Every other page has no hero image behind it, so the
  // pill is solid from the start.
  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    // Reads from multiple sources — some mobile/older browsers don't update
    // window.scrollY consistently, so this falls back to document scrollTop.
    const getScrollY = () =>
      window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const onScroll = () => setSolid(getScrollY() > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className="fixed inset-x-0 top-0 isolate z-[999] pt-4 sm:pt-6"
      style={{ transform: "translateZ(0)", WebkitTransform: "translateZ(0)" }}
    >
      {/* Same container-page wrapper as every page section, so the logo and
          nav line up exactly with the hero headline and content below — on
          both mobile and desktop. */}
      <div className="container-page">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ease-cinematic sm:px-7 ${
            solid
              ? "border border-offwhite/10 bg-charcoal/75 shadow-[0_8px_32px_-8px_rgba(244,102,30,0.35)] backdrop-blur-2xl backdrop-saturate-150"
              : "border border-transparent bg-transparent"
          }`}
        >
          <Link href="/" className="flex items-center">
            {/* Two real assets, swapped by state — no CSS filter trick. */}
            <Image
              src={solid ? "/images/logos/log.png" : "/images/logos/logw.png"}
              alt="Chuchin Ultimate Productions Ltd."
              width={160}
              height={48}
              priority
              className="h-9 w-auto transition-opacity duration-300 sm:h-10"
            />
          </Link>
          <Navigation />
        </div>
      </div>
    </header>
  );
}