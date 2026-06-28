"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { testimonials } from "@/data/testimonials";

export default function TestimonialsSection() {
  // Renders nothing until real, permissioned testimonials are added.
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 px-8 md:px-16 max-w-7xl mx-auto">
      <SectionHeading
        index="05"
        kicker="Social Proof"
        title="What Clients Say"
        subtitle="Selected feedback"
        accent="34,197,94"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((t, i) => (
          <motion.figure
            key={`${t.author}-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="rounded-xl border border-border-subtle bg-surface p-6"
          >
            <blockquote className="text-gray-300 leading-relaxed">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-gray-500">
              <span className="text-white">{t.author}</span>
              {t.role ? `, ${t.role}` : ""}
              {t.company ? `, ${t.company}` : ""}
              {t.country ? ` (${t.country})` : ""}
            </figcaption>
            {t.projectSlug && (
              <Link
                href={`/portfolio/${t.projectSlug}`}
                className="inline-block mt-3 font-mono text-xs text-indigo-400/80 hover:text-indigo-300 transition-colors duration-300"
              >
                View the case study &rarr;
              </Link>
            )}
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
