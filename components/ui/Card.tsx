import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  dark?: boolean;
};

export default function Card({ children, className = "", dark = false }: CardProps) {
  return (
    <div
      className={`rounded-2xl border ${
        dark
          ? "border-offwhite/10 bg-charcoal-800"
          : "border-charcoal/8 bg-white"
      } shadow-card ${className}`}
    >
      {children}
    </div>
  );
}
