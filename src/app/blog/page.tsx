import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import { posts } from "@/content/blog/posts";

const DESCRIPTION =
  "Guides and notes on building production web apps — hiring developers, Next.js, Stripe marketplaces, AI integration, and SEO — by full-stack developer Aean Tayawa.";

export const metadata: Metadata = {
  title: "Blog — Web Development Guides & Notes",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: { title: "Blog | Aean Tayawa", description: DESCRIPTION, url: "/blog" },
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="min-h-screen">
      <Navbar />
      <SocialIcons />
      <div className="pt-28 pb-20 px-8 md:px-16 max-w-3xl mx-auto">
        <header className="mb-12">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-indigo-400/80 mb-4">
            Writing
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Blog &amp; Guides
          </h1>
          <p className="text-gray-400 text-base leading-relaxed">
            {DESCRIPTION}
          </p>
        </header>

        <ul className="divide-y divide-border-subtle">
          {sorted.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="group block py-7">
                <p className="font-mono text-xs text-gray-500 mb-2">
                  {formatDate(p.date)} &middot; {p.readingMinutes} min read
                </p>
                <h2 className="font-display text-2xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                  {p.title}
                </h2>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {p.excerpt}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
