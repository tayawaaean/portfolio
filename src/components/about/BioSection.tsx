"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const columns = [
  {
    index: "01",
    label: "My Approach",
    accent: "99,102,241",
    body: "My journey began with a curiosity for how things work, transforming into a dedicated career in building robust and user-centric web solutions. With a keen eye for detail and a problem-solving mindset, I craft seamless digital experiences that merge functional code with intuitive design.",
  },
  {
    index: "02",
    label: "How I Work",
    accent: "139,92,246",
    body: "I work primarily with international clients and own the entire development lifecycle from planning and proposals through to launch and handoff. Clean code, structured repos, and handoff docs so you are never locked in. Projects break into clear phases with deliverables and payment gates at each milestone.",
  },
];

export default function BioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax drift for the oversized decorative glyph.
  const glyphY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const glyphRotate = useTransform(scrollYProgress, [0, 1], [-6, 6]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-8 md:px-16 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Oversized parallax quotation glyph */}
      <motion.span
        style={{ y: glyphY, rotate: glyphRotate }}
        aria-hidden
        className="pointer-events-none select-none absolute -top-10 right-0 font-display text-[18rem] md:text-[26rem] leading-none text-white/[0.025]"
      >
        &rdquo;
      </motion.span>

      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-10"
      >
        <span className="h-[1px] w-10 bg-indigo-500/50" />
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-indigo-400/80">
          The Story
        </span>
      </motion.div>

      {/* Section heading for document outline (H1 -> H2 -> H3); visually the
          lead statement below serves as the heading. */}
      <h2 className="sr-only">About my work and approach</h2>

      {/* Lead statement — read-along reveal */}
      <ScrollReveal className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-medium leading-[1.25] max-w-4xl mb-28 md:mb-44">
        From conceptualization to deployment, I thrive on turning complex requirements into elegant, scalable software that people genuinely enjoy using.
      </ScrollReveal>

      {/* Two narrative columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
        {columns.map((col, i) => (
          <motion.div
            key={col.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
            className="relative"
          >
            {/* Label + animated accent rule, then oversized index */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-300 whitespace-nowrap">
                  {col.label}
                </h3>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
                  className="flex-1 h-[2px] origin-left rounded-full"
                  style={{ background: `rgba(${col.accent},0.6)` }}
                />
              </div>
              <span
                className="block font-display text-5xl md:text-6xl font-bold leading-none"
                style={{ color: `rgba(${col.accent},0.25)` }}
              >
                {col.index}
              </span>
            </div>

            <ScrollReveal className="text-base md:text-lg leading-[1.7]">
              {col.body}
            </ScrollReveal>
          </motion.div>
        ))}
      </div>

      {/* Signature line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-20 flex items-center gap-4"
      >
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        <span className="font-display italic text-lg text-gray-500">
          — Aean Gabrielle
        </span>
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </motion.div>
    </section>
  );
}
