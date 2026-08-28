import Link from "next/link";
import ApertureIcon from "../ui/ApertureIcon";
import { company } from "@/lib/data/company";

/* ============================================================
   FOOTER NAVIGATION
============================================================ */

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/productions", label: "Productions" },
     
      { href: "/partners", label: "Partners" },
    ],
  },
  {
    title: "Work With Us",
    links: [
      { href: "/partners", label: "Partner With Us" },
      { href: "/careers", label: "Careers & Casting" },
      
      { href: "/contact", label: "Contact" },
    ],
  },
];

/* ============================================================
   SOCIAL BRANDS
============================================================ */

const socialGroups = [
  {
    name: "Chuchin",
    description: "Ultimate Productions",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/chuchinultimate?igsi=MTd2dXowZ3dnM3N1dg==",
      },
    ],
  },

  {
    name: "Sands of Time",
    description: "Official drama series",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/sandsoftime_drama?igsi=MWJtN280aXgwcnJ4bQ==",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61561254633136&mibextid=wwXIfr",
      },
    ],
  },

  {
    name: "Stellamaris Chinasa Duru",
    description: "Filmmaker · Producer · Storyteller",
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/stellamarisduru_smd?igsi=bWU5NnU1aXBwN3o4&utm_source=qr",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/stellamaris.duru.54?mibextid=wwXIfr",
      },
      {
        label: "YouTube",
        href: "https://youtube.com/@stellamarisdurutv?si=UMv2L_RJ7VeE7CRe",
      },
    ],
  },
];

/* ============================================================
   ARROW ICON
============================================================ */

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
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
   FOOTER LINK
============================================================ */

function FooterLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "group inline-flex items-center gap-2 text-sm font-light text-offwhite/55 transition-colors duration-300 hover:text-offwhite";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <span className="relative">
          {label}

          <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-orange to-gold transition-transform duration-300 ease-cinematic group-hover:scale-x-100" />
        </span>

        <span className="opacity-30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange group-hover:opacity-100">
          <ArrowUpRight />
        </span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
    >
      <span className="relative">
        {label}

        <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-gradient-to-r from-orange to-gold transition-transform duration-300 ease-cinematic group-hover:scale-x-100" />
      </span>

      <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}

/* ============================================================
   FOOTER
============================================================ */

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-offwhite">

      {/* ======================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Large aperture */}

        <div className="absolute -right-56 -top-56 opacity-[0.045]">

          <ApertureIcon
            size={620}
            spin
          />

        </div>


        {/* Orange ambient glow */}

        <div className="absolute -bottom-48 -left-48 h-[34rem] w-[34rem] rounded-full bg-orange/[0.045] blur-[140px]" />

      </div>


      <div className="container-page relative z-10">


        {/* ====================================================
            CLOSING STATEMENT
        ==================================================== */}

        <div className="border-b border-offwhite/10 py-24 md:py-32">

          <div className="max-w-6xl">

            <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-orange">
              Stellamaris Chinasa Duru
            </p>


            <h2 className="mt-7 font-body text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.84] tracking-[-0.065em] text-offwhite">

              Stories that
              <br />

              <span className="text-offwhite/25">
                stay with you.
              </span>

            </h2>


            <div className="mt-9 flex max-w-xl items-start gap-4">

              <span className="mt-1 h-10 w-px shrink-0 bg-gradient-to-b from-orange to-gold" />

              <p className="text-sm font-light leading-relaxed text-offwhite/45 md:text-base">
                We create films, television and digital productions
                that connect audiences with stories worth remembering.
              </p>

            </div>

          </div>

        </div>


        {/* ====================================================
            MAIN FOOTER
        ==================================================== */}

        <div className="grid gap-14 py-16 md:grid-cols-[1.25fr_0.75fr_0.75fr_1fr] md:py-20">


          {/* ==================================================
              BRAND
          ================================================== */}

          <div>

            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >

              <div className="flex h-11 w-11 items-center justify-center border border-offwhite/10 transition-colors duration-300 group-hover:border-orange">

                <ApertureIcon size={27} />

              </div>


              <div>

                <p className="font-display text-sm font-semibold tracking-tight text-offwhite">
                  Stellamaris Chinasa Duru
                </p>

                <p className="mt-0.5 text-[8px] uppercase tracking-[0.18em] text-offwhite/30">
                  Filmmaker · Producer · Storyteller
                </p>

              </div>

            </Link>


            <div className="mt-7 h-px w-12 bg-gradient-to-r from-orange to-gold" />


            <p className="mt-6 max-w-xs text-sm font-light leading-relaxed text-offwhite/40">
              {company.tagline}
            </p>


            <div className="mt-8">

              <p className="text-[8px] uppercase tracking-[0.25em] text-offwhite/20">
                Based in
              </p>

              <p className="mt-2 text-sm font-light text-offwhite/55">
                Lagos, Nigeria
              </p>

            </div>

          </div>


          {/* ==================================================
              NAVIGATION COLUMNS
          ================================================== */}

          {columns.map((column) => (

            <div key={column.title}>

              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-offwhite/30">
                {column.title}
              </p>

              <ul className="mt-6 space-y-4">

                {column.links.map((link) => (

                  <li key={link.href}>

                    <FooterLink
                      href={link.href}
                      label={link.label}
                    />

                  </li>

                ))}

              </ul>

            </div>

          ))}


          {/* ==================================================
              CONTACT
          ================================================== */}

          <div>

            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-offwhite/30">
              Contact
            </p>


            <div className="mt-6 space-y-5">

              {/* Email */}

              <a
                href={`mailto:${company.contact.email}`}
                className="group block"
              >

                <span className="text-[8px] uppercase tracking-[0.2em] text-offwhite/20">
                  Email
                </span>

                <span className="mt-2 block text-sm font-light text-offwhite/60 transition-colors duration-300 group-hover:text-orange">
                  {company.contact.email}
                </span>

              </a>


              {/* Phone */}

              <a
                href={`tel:${company.contact.phone.replace(/\s/g, "")}`}
                className="group block"
              >

                <span className="text-[8px] uppercase tracking-[0.2em] text-offwhite/20">
                  Phone
                </span>

                <span className="mt-2 block text-sm font-light text-offwhite/60 transition-colors duration-300 group-hover:text-orange">
                  {company.contact.phone}
                </span>

              </a>


              {/* Address */}

              <div>

                <span className="text-[8px] uppercase tracking-[0.2em] text-offwhite/20">
                  Studio
                </span>

                <span className="mt-2 block max-w-[190px] text-sm font-light leading-relaxed text-offwhite/45">
                  {company.contact.address}
                </span>

              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            SOCIAL ECOSYSTEM
        ==================================================== */}

        <div className="border-t border-offwhite/10 py-16">

          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">

            <div>

              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-offwhite/30">
                Follow the stories
              </p>

              <h3 className="mt-4 font-body text-3xl font-light tracking-tight text-offwhite md:text-4xl">
                Our digital world.
              </h3>

            </div>


            <p className="max-w-sm text-sm font-light leading-relaxed text-offwhite/35 md:text-right">
              Follow our productions, creators and stories
              across the platforms where our audience lives.
            </p>

          </div>


          {/* ==================================================
              SOCIAL CARDS
          ================================================== */}

          <div className="mt-10 grid gap-px border border-offwhite/10 bg-offwhite/10 md:grid-cols-3">

            {socialGroups.map((group, index) => (

              <div
                key={group.name}
                className="group relative bg-charcoal p-7 transition-colors duration-300 hover:bg-[#211f1c] md:p-8"
              >

                {/* Top */}

                <div className="flex items-center justify-between">

                  <span className="font-mono text-[9px] text-orange/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[8px] uppercase tracking-[0.2em] text-offwhite/20">
                    Social
                  </span>

                </div>


                {/* Brand */}

                <h4 className="mt-12 max-w-[260px] font-body text-2xl font-light leading-tight text-offwhite">
                  {group.name}
                </h4>


                <p className="mt-2 text-xs font-light text-offwhite/30">
                  {group.description}
                </p>


                {/* Social links */}

                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">

                  {group.links.map((social) => (

                    <FooterLink
                      key={`${group.name}-${social.label}`}
                      href={social.href}
                      label={social.label}
                      external
                    />

                  ))}

                </div>


                {/* Hover line */}

                <div className="mt-8 h-px w-full bg-offwhite/10">

                  <div className="h-px w-0 bg-gradient-to-r from-orange to-gold transition-all duration-500 ease-cinematic group-hover:w-full" />

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* ====================================================
            FINAL BAR
        ==================================================== */}

        <div className="border-t border-offwhite/10 py-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <p className="text-[10px] font-light text-offwhite/25">
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>


            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">

              <Link
                href="/privacy"
                className="text-[9px] uppercase tracking-[0.18em] text-offwhite/25 transition-colors hover:text-offwhite/60"
              >
                Privacy
              </Link>


              <Link
                href="/terms"
                className="text-[9px] uppercase tracking-[0.18em] text-offwhite/25 transition-colors hover:text-offwhite/60"
              >
                Terms
              </Link>


              <span className="hidden h-3 w-px bg-offwhite/10 md:block" />


              <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-offwhite/20">

                <span className="h-1.5 w-1.5 rounded-full bg-orange" />

                Lagos · Nigeria

              </span>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}