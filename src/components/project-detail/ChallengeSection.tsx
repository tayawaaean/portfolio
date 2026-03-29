"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";

interface ChallengeSectionProps {
  project: Project;
}

export default function ChallengeSection({ project }: ChallengeSectionProps) {
  return (
    <section className="max-w-6xl mx-auto px-8 md:px-16 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* The Challenge */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative number */}
          <span className="absolute -top-6 -left-2 font-display text-7xl md:text-8xl font-bold text-white/[0.03] select-none pointer-events-none">
            01
          </span>

          <div className="relative border-l-2 border-red-500/30 pl-6">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
              The Challenge
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {project.challenge}
            </p>
          </div>
        </motion.div>

        {/* The Solution */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative number */}
          <span className="absolute -top-6 -left-2 font-display text-7xl md:text-8xl font-bold text-white/[0.03] select-none pointer-events-none">
            02
          </span>

          <div className="relative border-l-2 border-emerald-500/30 pl-6">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
              The Solution
            </h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {project.solution}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Connecting line between sections */}
      <div className="hidden lg:block max-w-6xl mx-auto mt-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>
    </section>
  );
}
