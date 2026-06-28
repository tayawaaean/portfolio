import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import { services } from "@/data/services";

const DESCRIPTION =
  "Web development services by Aean Tayawa — full-stack Next.js & React apps, SaaS and marketplace platforms, Stripe payments, AI integration, PWAs, and GIS — for clients across the US, Canada, and Europe.";

export const metadata: Metadata = {
  title: "Web Development Services",
  description: DESCRIPTION,
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Web Development Services | Aean Tayawa",
    description: DESCRIPTION,
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SocialIcons />
      <div className="pt-28 pb-20 px-8 md:px-16 max-w-7xl mx-auto">
        <header className="max-w-2xl mb-14">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-indigo-400/80 mb-4">
            Capabilities
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Web Development Services
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            {DESCRIPTION}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group block rounded-xl border border-border-subtle hover:border-border-hover bg-surface p-6 transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-xl font-bold text-white">
                  {s.title}
                </h2>
                <ArrowUpRight
                  size={18}
                  className="text-gray-500 group-hover:text-white transition-colors duration-300 shrink-0"
                />
              </div>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                {s.intro}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-14">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-mono text-sm tracking-wider rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
