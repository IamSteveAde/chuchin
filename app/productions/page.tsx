import type { Metadata } from "next";
import ProductionsClient from "@/components/productions/ProductionsClient";

export const metadata: Metadata = {
  title: "Productions",
};

export default function ProductionsPage() {
  return <ProductionsClient />;
}