import Link from "next/link";
import ApertureIcon from "../ui/ApertureIcon";
import { company } from "@/lib/data/company";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/#", label: "About" },
      { href: "/#", label: "Productions" },
      { href: "/#", label: "News" }
    ]
  },
  {
    title: "Work With Us",
    links: [
      { href: "/#", label: "Partners & Sponsors" },
      { href: "/#", label: "Careers & Casting" },
      { href: "/#", label: "Media Kit" }
    ]
  }
];

const socials = [
  { label: "Instagram", href: company.social.instagram },
  { label: "YouTube", href: company.social.youtube },
  { label: "Twitter", href: company.social.twitter },
  { label: "Facebook", href: company.social.facebook },
  { label: "LinkedIn", href: company.social.linkedin }
];

// Same underline-sweep hover used across the nav and every CTA link on the
// site, so the footer's interactions feel like part of the same system
// rather than a plain color-change fallback.
function FooterLink({ href, label, external }: { href: string; label: string; external?: boolean }) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group relative inline-block text-sm text-offwhite/70 transition-colors duration-200 hover:text-offwhite"
    >
      {label}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-orange to-gold transition-transform duration-300 ease-cinematic group-hover:scale-x-100" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-offwhite/10 bg-charcoal text-offwhite">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-3">
            <ApertureIcon size={28} />
            <span className="font-display text-lg font-semibold tracking-tight">Chuchin Ultimate Productions</span>
          </div>
          <div className="mt-5 h-px w-12 bg-gradient-to-r from-orange to-gold" />
          <p className="mt-5 max-w-xs text-sm font-light leading-relaxed text-offwhite/55">{company.tagline}</p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/40">{col.title}</p>
            <ul className="mt-5 space-y-3.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href} label={link.label} />
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-offwhite/40">Contact</p>
          <ul className="mt-5 space-y-3.5 text-sm font-light text-offwhite/70">
            <li>
              <a href={`mailto:${company.contact.email}`} className="transition-colors duration-200 hover:text-orange">
                {company.contact.email}
              </a>
            </li>
            <li>
              
               <a href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                className="transition-colors duration-200 hover:text-orange"
              >
                {company.contact.phone}
              </a>
            </li>
            <li className="text-offwhite/45">{company.contact.address}</li>
          </ul>
        </div>
      </div>

      <div className="container-page flex flex-col-reverse items-start gap-4 border-t border-offwhite/10 py-6 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-light text-offwhite/40">
          © {new Date().getFullYear()} {company.name} All rights reserved.
        </p>
        <div className="flex flex-wrap gap-6">
          {socials.map((s) => (
            <FooterLink key={s.label} href={s.href} label={s.label} external />
          ))}
        </div>
      </div>
    </footer>
  );
}