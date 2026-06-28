import type { Metadata } from "next";
import HomeClient from "@/components/home/HomeClient";

const DESCRIPTION =
  "Hire Aean Tayawa — a full-stack Next.js, React & TypeScript developer shipping production-ready web apps, marketplaces, and AI integrations for startups and agencies across the US, Canada, and Europe.";

export const metadata: Metadata = {
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { url: "/", description: DESCRIPTION },
};

export default function Home() {
  return <HomeClient />;
}
