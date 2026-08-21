import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const base =
  "group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 ease-cinematic focus-visible:outline-offset-4";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-charcoal text-offwhite hover:bg-orange hover:text-offwhite",
  secondary:
    "border border-charcoal/25 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-offwhite",
  ghost:
    "border border-offwhite/40 text-offwhite hover:border-offwhite hover:bg-offwhite hover:text-charcoal"
};

export default function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      <span>{children}</span>
      <span aria-hidden="true" className="transition-transform duration-300 ease-cinematic group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}
