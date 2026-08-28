import type { Metadata } from "next";
import MasterclassPageClient from "./MasterclassPageClient";

export const metadata: Metadata = {
  title: "The Main Character Journey",
  description:
    "A creative masterclass convened by Stellamaris Duru (SMD) — Be Seen. Be Heard. Be the Main Character."
};

export default function MasterclassPage() {
  return <MasterclassPageClient />;
}