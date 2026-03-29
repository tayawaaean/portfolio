"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";

export default function TimelineSection() {
  return (
    <section className="py-20 px-8 md:px-16 max-w-6xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          The Journey
        </h2>
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-gray-500">
          Career milestones &amp; achievements
        </p>
      </motion.div>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Connecting gradient line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[2px] origin-top"
          style={{
            background:
              "linear-gradient(to bottom, rgba(99,102,241,0.4), rgba(139,92,246,0.2), rgba(99,102,241,0.05))",
          }}
        />

        <div className="space-y-10">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="relative flex gap-6 md:gap-8"
            >
              {/* Dot with glow */}
              <div className="relative shrink-0 mt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="relative z-10"
                >
                  <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full bg-[#0a0a0a] border-2 border-indigo-500/60 flex items-center justify-center">
                    <div className="w-[4px] h-[4px] md:w-[6px] md:h-[6px] rounded-full bg-indigo-400" />
                  </div>
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full bg-indigo-500/20 blur-md -z-10 scale-150" />
                </motion.div>
              </div>

              {/* Content card */}
              <div className="flex-1 group">
                <div className="bg-surface border border-border-subtle rounded-xl p-5 md:p-6 hover:border-border-hover transition-all duration-300 hover:-translate-y-0.5">
                  {/* Year badge */}
                  <span className="inline-block px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono text-[10px] tracking-[0.2em] uppercase text-indigo-400 mb-3">
                    {entry.year}
                  </span>

                  <h3 className="font-display text-base md:text-lg font-bold text-white mb-2">
                    {entry.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
