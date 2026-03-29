"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import ProjectCard, { CardVariant } from "./ProjectCard";
import CategoryFilter, { FilterType } from "./CategoryFilter";

const WIDE_INDICES = new Set([4, 7, 11]);

function getVariant(index: number): CardVariant {
  if (index === 0) return "featured";
  if (WIDE_INDICES.has(index)) return "wide";
  return "default";
}

function getGridClasses(index: number): string {
  if (index === 0) return "md:col-span-2 md:row-span-2";
  if (WIDE_INDICES.has(index)) return "md:col-span-2";
  return "";
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const counts = useMemo(
    () => ({
      all: projects.length,
      public: projects.filter((p) => !p.isNda).length,
      nda: projects.filter((p) => p.isNda).length,
    }),
    []
  );

  const filtered = useMemo(() => {
    if (activeFilter === "all") return projects;
    if (activeFilter === "public") return projects.filter((p) => !p.isNda);
    return projects.filter((p) => p.isNda);
  }, [activeFilter]);

  return (
    <div>
      <CategoryFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        counts={counts}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[minmax(280px,auto)]"
        >
          {filtered.map((project, i) => {
            const originalIndex = projects.indexOf(project);
            const variant =
              activeFilter === "all" ? getVariant(originalIndex) : "default";
            const gridClass =
              activeFilter === "all" ? getGridClasses(originalIndex) : "";

            return (
              <div key={project.slug} className={gridClass}>
                <ProjectCard
                  project={project}
                  index={i}
                  variant={variant}
                />
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
