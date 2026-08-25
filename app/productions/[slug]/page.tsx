import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productions } from "@/lib/data/productions";
import ProductionDetailClient from "./ProductionDetailClient";

export function generateStaticParams() {
  return productions.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const production = productions.find((p) => p.slug === params.slug);
  return {
    title: production?.title ?? "Production",
    description: production?.logline
  };
}

export default function ProductionDetailPage({ params }: { params: { slug: string } }) {
  const production = productions.find((p) => p.slug === params.slug);
  if (!production) notFound();

  return <ProductionDetailClient production={production} />;
}