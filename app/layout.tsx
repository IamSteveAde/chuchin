import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ChatWidget";
import { company } from "@/lib/data/company";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap"
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: `${company.shortName} — ${company.tagline}`,
    template: `%s — ${company.shortName}`
  },
  description: company.bio,
  metadataBase: new URL("https://chuchinultimate.com"),
  openGraph: {
    title: company.shortName,
    description: company.bio,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${jakarta.variable}`}>
      <body>
        <Header />
        <main className="pt-24 sm:pt-28">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}