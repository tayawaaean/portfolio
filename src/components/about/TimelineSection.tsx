"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { timeline } from "@/data/timeline";
import SectionHeading from "./SectionHeading";
import SpotlightCard from "./SpotlightCard";

const ACCENT = "139,92,246";

export default function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 0.6", "end 0.8"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="py-20 px-8 md:px-16 max-w-6xl mx-auto">
      <SectionHeading
        index="03"
        kicker="Timeline"
        title="The Journey"
        subtitle="Career milestones & achievements"
        accent="139,92,246"
      />

      {/* Vertical timeline */}
      <div ref={lineRef} className="relative">
        {/* Track (dim) */}
        <div
          className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[2px]"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        {/* Scroll-linked progress line */}
        <motion.div
          style={{
            scaleY: lineScale,
            background: `linear-gradient(to bottom, rgba(99,102,241,0.7), rgba(${ACCENT},0.4), rgba(99,102,241,0.1))`,
          }}
          className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[2px] origin-top"
        />

        <div className="space-y-8 md:space-y-10">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="relative flex gap-6 md:gap-8"
            >
              {/* Milestone dot — lights up as it enters view */}
              <div className="relative shrink-0 mt-6">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="relative z-10"
                >
                  <div
                    className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full bg-[#0a0a0a] flex items-center justify-center"
                    style={{ border: `2px solid rgba(${ACCENT},0.7)` }}
                  >
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      whileInView={{ opacity: [0.3, 1, 0.6] }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.08 }}
                      className="w-[5px] h-[5px] md:w-[7px] md:h-[7px] rounded-full"
                      style={{ background: `rgb(${ACCENT})` }}
                    />
                  </div>
                  <div
                    className="absolute inset-0 rounded-full blur-md -z-10 scale-[1.8]"
                    style={{ background: `rgba(${ACCENT},0.25)` }}
                  />
                </motion.div>
              </div>

              {/* Content card */}
              <div className="flex-1">
                <SpotlightCard
                  accent={ACCENT}
                  className="bg-surface border border-border-subtle rounded-xl p-5 md:p-6 hover:border-border-hover transition-colors duration-300"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <span
                        className="font-mono text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: `rgba(${ACCENT},0.9)` }}
                      >
                        {entry.year}
                      </span>
                      <h3 className="font-display text-lg md:text-xl font-bold text-white mt-1 mb-2">
                        {entry.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {entry.description}
                      </p>
                    </div>

                    {/* Oversized year anchor */}
                    <span
                      aria-hidden
                      className="hidden sm:block shrink-0 font-display font-bold leading-none text-4xl md:text-5xl"
                      style={{ color: `rgba(${ACCENT},0.14)` }}
                    >
                      {entry.year}
                    </span>
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
