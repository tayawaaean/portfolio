"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { getCategoryAccentRgb } from "@/components/portfolio/categoryColors";

interface FeatureCardsProps {
  project: Project;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function FeatureCards({ project }: FeatureCardsProps) {
  const accentRgb = useMemo(
    () => getCategoryAccentRgb(project.category),
    [project.category]
  );

  return (
    <section className="max-w-6xl mx-auto px-8 md:px-16 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-8"
      >
        Key Features
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {project.keyFeatures.map((feature, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="group relative bg-surface border border-border-subtle rounded-xl p-6 hover:border-border-hover transition-all duration-300 hover:-translate-y-1"
          >
            {/* Accent bar */}
            <div
              className="h-[2px] rounded-full mb-4 transition-all duration-500 w-10 group-hover:w-full"
              style={{
                background: `rgba(${accentRgb}, 0.5)`,
              }}
            />

            {/* Feature number */}
            <span className="font-mono text-[10px] text-gray-600 tracking-wider">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Feature text */}
            <p className="text-gray-300 text-sm leading-relaxed mt-2">
              {feature}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
