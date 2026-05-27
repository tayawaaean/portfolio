"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Shield } from "lucide-react";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import CategoryFilter, { FilterType } from "./CategoryFilter";
import { getCategoryGradient, getCategoryAccentRgb } from "./categoryColors";

// Images that actually exist in /public/images/projects/
const AVAILABLE_IMAGES = new Set([
  "/images/projects/djpathlete.png",
  "/images/projects/athletemonitoring.png",
  "/images/projects/arecgis.png",
  "/images/projects/efficyon.png",
  "/images/projects/mayhemcreation.png",
  "/images/projects/video.png",
]);

const hasImage = (p: Project) => AVAILABLE_IMAGES.has(p.image);

export default function ProjectGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [active, setActive] = useState<number | null>(null);

  // Cursor-tracked motion values for the floating preview (springy lag).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 28, mass: 0.5 });
  const y = useSpring(my, { stiffness: 260, damping: 28, mass: 0.5 });

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

  const activeProject = active !== null ? filtered[active] : null;

  const handleMouseMove = (e: React.MouseEvent) => {
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <div>
      <CategoryFilter
        activeFilter={activeFilter}
        onFilterChange={(f) => {
          setActiveFilter(f);
          setActive(null);
        }}
        counts={counts}
      />

      {/* Floating cursor preview — desktop only */}
      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden md:block"
      >
        <div className="-translate-x-1/2 -translate-y-1/2">
          <AnimatePresence mode="popLayout">
            {activeProject && (
              <motion.div
                key={activeProject.slug}
                initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.9, rotate: 4 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-[340px] lg:w-[420px] aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60"
              >
                <PreviewVisual project={activeProject} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Showcase list */}
      <AnimatePresence mode="wait">
        <motion.ul
          key={activeFilter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActive(null)}
          className="border-t border-border-subtle"
        >
          {filtered.map((project, i) => (
            <ShowcaseRow
              key={project.slug}
              project={project}
              index={i}
              dimmed={active !== null && active !== i}
              onActivate={() => setActive(i)}
            />
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}

function ShowcaseRow({
  project,
  index,
  dimmed,
  onActivate,
}: {
  project: Project;
  index: number;
  dimmed: boolean;
  onActivate: () => void;
}) {
  const accent = getCategoryAccentRgb(project.category);

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      onMouseEnter={onActivate}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group relative block border-b border-border-subtle"
      >
        {/* Hover wash */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, rgba(${accent},0.07), transparent 55%)`,
          }}
        />

        <motion.div
          animate={{ opacity: dimmed ? 0.35 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center gap-5 md:gap-8 py-6 md:py-8 px-2 md:px-4"
        >
          {/* Index */}
          <span className="font-mono text-xs text-gray-600 group-hover:text-gray-300 transition-colors duration-300 w-8 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Mobile inline thumb */}
          <div className="md:hidden relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 shrink-0">
            <PreviewVisual project={project} compact />
          </div>

          {/* Title + category */}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-500 group-hover:text-white transition-colors duration-300 md:group-hover:translate-x-2 md:transition-transform truncate">
              {project.title}
            </h3>
            <div className="mt-1.5 flex items-center gap-3">
              {project.isNda && (
                <Shield size={11} className="text-red-400/70 shrink-0" />
              )}
              <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-gray-600 truncate">
                {project.category}
              </span>
            </div>
          </div>

          {/* Tech (desktop) */}
          <div className="hidden lg:flex flex-wrap justify-end gap-1.5 max-w-[220px]">
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-white/[0.05] text-[10px] font-mono text-gray-500 tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Arrow */}
          <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full border border-white/10 text-gray-500 group-hover:text-white group-hover:border-white/30 transition-all duration-300">
            <ArrowUpRight
              size={18}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </span>
        </motion.div>
      </Link>
    </motion.li>
  );
}

/** Image when available, otherwise a category gradient mesh; NDA gets a frosted lock. */
function PreviewVisual({
  project,
  compact = false,
}: {
  project: Project;
  compact?: boolean;
}) {
  const accent = getCategoryAccentRgb(project.category);

  if (project.isNda) {
    return (
      <div
        className="absolute inset-0 grid place-items-center"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(${accent},0.12), #12121a 75%)`,
        }}
      >
        <Shield className="text-gray-500" size={compact ? 18 : 30} />
        {!compact && (
          <span className="absolute bottom-3 font-mono text-[9px] tracking-[0.3em] uppercase text-gray-600">
            Confidential
          </span>
        )}
      </div>
    );
  }

  if (hasImage(project)) {
    return (
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover object-top"
        sizes={compact ? "64px" : "420px"}
      />
    );
  }

  return (
    <div
      className="absolute inset-0"
      style={{ background: getCategoryGradient(project.category) }}
    />
  );
}
