import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import JsonLd from "@/components/seo/JsonLd";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const s = services.find((x) => x.slug === service);
  if (!s) {
    return { title: "Service Not Found", robots: { index: false, follow: false } };
  }
  const url = `/services/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${s.metaTitle} | Aean Tayawa`,
      description: s.metaDescription,
      url,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const s = services.find((x) => x.slug === service);
  if (!s) notFound();

  const related = s.relatedProjectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    description: s.metaDescription,
    serviceType: s.title,
    provider: { "@id": `${SITE_URL}/#person` },
    areaServed: ["United States", "Canada", "United Kingdom", "European Union"],
    url: `${SITE_URL}/services/${s.slug}`,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen">
      <JsonLd data={[serviceLd, faqLd]} />
      <Navbar />
      <SocialIcons />
      <article className="pt-28 pb-20 px-8 md:px-16 max-w-4xl mx-auto">
        <Link
          href="/services"
          className="font-mono text-xs text-gray-500 hover:text-white transition-colors duration-300"
        >
          &larr; All services
        </Link>

        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-indigo-400/80 mt-8 mb-4">
          Service
        </p>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          {s.h1}
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed mb-12">{s.intro}</p>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-3">
            The problem I solve
          </h2>
          <p className="text-gray-400 leading-relaxed">{s.problem}</p>
        </section>

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-4">How I work</h2>
          <ol className="space-y-3">
            {s.approach.map((step, i) => (
              <li key={i} className="flex gap-3 text-gray-400 leading-relaxed">
                <span className="font-mono text-indigo-400/70 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">What you get</h2>
            <ul className="space-y-2">
              {s.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex gap-2 text-gray-400 text-sm leading-relaxed"
                >
                  <Check
                    size={16}
                    className="text-emerald-400/70 shrink-0 mt-0.5"
                  />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-4">Tech stack</h2>
            <div className="flex flex-wrap gap-2">
              {s.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/[0.06] text-xs font-mono text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold mb-4">Related work</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/portfolio/${p.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-lg border border-border-subtle hover:border-border-hover bg-surface p-4 transition-colors duration-300"
                >
                  <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {p.title}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-gray-500 group-hover:text-white shrink-0"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <div className="space-y-5">
            {s.faqs.map((f) => (
              <div key={f.q}>
                <h3 className="text-white font-medium mb-1">{f.q}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-xl border border-border-subtle bg-surface p-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Need {s.title.toLowerCase()}?
          </h2>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
            Tell me about your project — I reply within a day and work remotely
            with clients across the US, Canada, and Europe.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-mono text-sm tracking-wider rounded-full hover:bg-gray-200 transition-colors duration-300"
          >
            Start a project
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </article>
    </main>
  );
}
