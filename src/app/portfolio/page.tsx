import type { Metadata } from "next";
import PortfolioClient from "@/components/portfolio/PortfolioClient";

const DESCRIPTION =
  "Selected work by Aean Tayawa — Next.js, React, AI, and full-stack web app case studies including marketplaces, SaaS platforms, e-commerce, and a national renewable-energy GIS system.";

export const metadata: Metadata = {
  title: "Portfolio — Web App Case Studies",
  description: DESCRIPTION,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — Web App Case Studies | Aean Tayawa",
    description: DESCRIPTION,
    url: "/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
