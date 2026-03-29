"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import { Project } from "@/types";
import { getCategoryAccentRgb } from "@/components/portfolio/categoryColors";

interface ProjectNavigationProps {
  prevProject: Project | null;
  nextProject: Project | null;
}

export default function ProjectNavigation({
  prevProject,
  nextProject,
}: ProjectNavigationProps) {
  return (
    <section className="border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {prevProject ? (
            <NavCard project={prevProject} direction="prev" />
          ) : (
            <GalleryCard direction="prev" />
          )}
          {nextProject ? (
            <NavCard project={nextProject} direction="next" />
          ) : (
            <GalleryCard direction="next" />
          )}
        </div>
      </div>
    </section>
  );
}

function NavCard({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const accentRgb = useMemo(
    () => getCategoryAccentRgb(project.category),
    [project.category]
  );
  const isPrev = direction === "prev";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: isPrev ? 0 : 0.1 }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className={`group block relative bg-surface border border-border-subtle rounded-xl p-6 hover:border-border-hover transition-all duration-300 overflow-hidden ${
          isPrev ? "text-left" : "text-right"
        }`}
      >
        {/* Accent strip */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(to right, rgba(${accentRgb},0.4), rgba(${accentRgb},0.1))`,
          }}
        />

        {/* Direction label + arrow */}
        <div
          className={`flex items-center gap-2 mb-3 ${
            isPrev ? "flex-row" : "flex-row-reverse"
          }`}
        >
          {isPrev ? (
            <ArrowLeft
              size={14}
              className="text-gray-600 group-hover:text-gray-400 group-hover:-translate-x-1 transition-all duration-300"
            />
          ) : (
            <ArrowRight
              size={14}
              className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300"
            />
          )}
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-600">
            {isPrev ? "Previous" : "Next"} Project
          </span>
        </div>

        {/* Project title */}
        <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-gray-200 transition-colors">
          {project.title}
        </h3>

        {/* Category */}
        <p className="text-gray-600 text-xs font-mono tracking-wider mb-3">
          {project.category}
        </p>

        {/* Tech pills */}
        <div
          className={`flex flex-wrap gap-1.5 ${
            isPrev ? "" : "justify-end"
          }`}
        >
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-full bg-white/[0.04] text-[9px] font-mono text-gray-500 tracking-wider"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}

function GalleryCard({ direction }: { direction: "prev" | "next" }) {
  const isPrev = direction === "prev";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: isPrev ? 0 : 0.1 }}
    >
      <Link
        href="/portfolio"
        className={`group flex flex-col items-center justify-center bg-surface border border-border-subtle rounded-xl p-8 hover:border-border-hover transition-all duration-300 min-h-[160px] ${
          isPrev ? "text-left" : "text-right"
        }`}
      >
        <LayoutGrid
          size={20}
          className="text-gray-600 group-hover:text-gray-400 transition-colors mb-3"
        />
        <span className="font-mono text-xs tracking-wider text-gray-500 group-hover:text-gray-300 transition-colors">
          Back to Gallery
        </span>
      </Link>
    </motion.div>
  );
}
