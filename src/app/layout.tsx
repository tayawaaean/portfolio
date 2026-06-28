import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, SITE_SHORT_NAME } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
import Footer from "@/components/layout/Footer";
import { socials } from "@/data/socials";
import { skills } from "@/data/skills";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const DEFAULT_TITLE =
  "Aean Tayawa — Full-Stack Next.js & React Developer for Hire";
const DESCRIPTION =
  "Hire Aean Tayawa — a full-stack Next.js, React & TypeScript developer building production-ready web apps, marketplaces, and AI integrations for clients across the US, Canada, and Europe.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Aean Tayawa",
  },
  description: DESCRIPTION,
  keywords: [
    "Full Stack Developer",
    "Next.js Developer for Hire",
    "React Developer",
    "TypeScript Developer",
    "AI Integration Developer",
    "Web Application Developer",
    "Remote Freelance Developer",
  ],
  authors: [{ name: SITE_NAME, url: `${SITE_URL}/about` }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: SITE_NAME,
  alternateName: SITE_SHORT_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/images/profile.png`,
  jobTitle: "Full-Stack Developer",
  description: DESCRIPTION,
  knowsAbout: skills.map((s) => s.name),
  knowsLanguage: ["English"],
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  areaServed: ["United States", "Canada", "United Kingdom", "European Union"],
  sameAs: socials.map((s) => s.url),
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#person` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${jetbrains.variable} font-mono antialiased bg-[#0a0a0a] text-white`}
      >
        <JsonLd data={[personLd, websiteLd]} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
