import type { Metadata } from "next";
import FounderPageClient from "./FounderPageClient";
import { founder } from "@/lib/data/founder";

export const metadata: Metadata = {
  title: founder.name,
  description: founder.bio
};

export default function FounderPage() {
  return <FounderPageClient />;
}