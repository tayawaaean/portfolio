import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";

const DESCRIPTION =
  "About Aean Tayawa — a full-stack developer with 3+ years building production Next.js, React, and AI-powered web apps for international clients across the US, Canada, and Europe.";

export const metadata: Metadata = {
  title: "About — Full-Stack Next.js & React Developer",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Full-Stack Next.js & React Developer | Aean Tayawa",
    description: DESCRIPTION,
    url: "/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
