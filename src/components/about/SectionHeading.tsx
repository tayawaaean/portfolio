"use client";

import { motion } from "framer-motion";

/**
 * Editorial section header used across the About page for visual cohesion:
 * a mono kicker with a leading accent rule, a Playfair display title, a short
 * subtitle, and a faint oversized index watermark behind it.
 */
export default function SectionHeading({
  index,
  kicker,
  title,
  subtitle,
  accent = "99,102,241",
}: {
  index: string;
  kicker: string;
  title: string;
  subtitle: string;
  accent?: string;
}) {
  return (
    <div className="relative mb-14">
      {/* Index watermark */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-12 -left-2 md:-left-4 font-display font-bold leading-none text-[7rem] md:text-[9rem]"
        style={{ color: `rgba(${accent},0.06)` }}
      >
        {index}
      </span>

      <div className="relative">
        {/* Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <span
            className="h-[1px] w-10"
            style={{ background: `rgba(${accent},0.6)` }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: `rgba(${accent},0.85)` }}
          >
            {kicker}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl font-bold mb-3"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.15em] uppercase text-gray-500"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
