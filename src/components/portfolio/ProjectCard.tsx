"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, ArrowUpRight } from "lucide-react";
import { Project } from "@/types";
import { getCategoryGradient, getCategoryAccentRgb } from "./categoryColors";

export type CardVariant = "featured" | "wide" | "default";

interface ProjectCardProps {
  project: Project;
  index: number;
  variant: CardVariant;
}

// Images that actually exist in /public/images/projects/
const AVAILABLE_IMAGES = new Set([
  "/images/projects/djpathlete.png",
  "/images/projects/athletemonitoring.png",
  "/images/projects/arecgis.png",
  "/images/projects/efficyon.png",
  "/images/projects/mayhemcreation.png",
  "/images/projects/video.png",
]);

function hasImage(project: Project): boolean {
  return AVAILABLE_IMAGES.has(project.image);
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

// Generate deterministic hex strings for NDA data stream
function generateHexLines(seed: string, count: number): string[] {
  const lines: string[] = [];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  for (let i = 0; i < count; i++) {
    let line = "";
    for (let j = 0; j < 32; j++) {
      hash = (hash * 1103515245 + 12345) & 0x7fffffff;
      line += (hash % 16).toString(16);
    }
    lines.push(line.toUpperCase());
  }
  return lines;
}

export default function ProjectCard({
  project,
  index,
  variant,
}: ProjectCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const gradientBg = useMemo(
    () => getCategoryGradient(project.category),
    [project.category]
  );
  const accentRgb = useMemo(
    () => getCategoryAccentRgb(project.category),
    [project.category]
  );

  const hexLines = useMemo(
    () => (project.isNda ? generateHexLines(project.slug, 24) : []),
    [project.isNda, project.slug]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isFeatured = variant === "featured";

  return (
    <motion.div variants={cardVariants} layout>
      <Link href={`/portfolio/${project.slug}`} className="block h-full">
        <div
          className={`group relative h-full rounded-xl overflow-hidden transition-all duration-500 ${
            project.isNda
              ? "border border-dashed border-white/[0.08] hover:border-white/[0.15]"
              : "border border-border-subtle hover:border-border-hover"
          }`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Magnetic border glow */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
            style={{
              background: isHovered
                ? `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${accentRgb},0.12), transparent 60%)`
                : "none",
            }}
          />

          {/* Card content */}
          <div className="relative h-full bg-surface rounded-xl">
            {project.isNda ? (
              <NdaCardContent
                project={project}
                hexLines={hexLines}
                isFeatured={isFeatured}
                accentRgb={accentRgb}
              />
            ) : (
              <PublicCardContent
                project={project}
                gradientBg={gradientBg}
                accentRgb={accentRgb}
                isFeatured={isFeatured}
              />
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ──────────────────── Public Card ────────────────────

function PublicCardContent({
  project,
  gradientBg,
  accentRgb,
  isFeatured,
}: {
  project: Project;
  gradientBg: string;
  accentRgb: string;
  isFeatured: boolean;
}) {
  const imageExists = hasImage(project);

  return (
    <div className={`relative h-full ${isFeatured ? "min-h-[400px]" : "min-h-[280px]"} flex flex-col`}>
      {/* Background: real image or gradient mesh */}
      {imageExists ? (
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover object-top"
            loading="lazy"
            sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-surface/20" />
        </div>
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
          style={{ background: gradientBg }}
        />
      )}

      {/* Shimmer sweep on hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 p-5 flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-500">
          {project.category}
        </span>
        {project.liveUrl && (
          <span className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-emerald-400/70">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            Live
          </span>
        )}
      </div>

      {/* Content - bottom-aligned */}
      <div className="relative z-10 mt-auto p-5 pt-8">
        {/* Gradient fade above content */}
        {!imageExists && (
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-t from-surface to-transparent" />
        )}

        <div className="relative">
          <h3
            className={`font-display font-bold text-white mb-2 ${
              isFeatured ? "text-2xl md:text-3xl" : "text-lg"
            }`}
          >
            {project.title}
          </h3>

          {/* Description - always visible on featured, hover-reveal on default */}
          <p
            className={`text-gray-400 text-sm leading-relaxed mb-4 ${
              isFeatured
                ? "line-clamp-3"
                : "line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20"
            }`}
          >
            {project.description}
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, isFeatured ? 6 : 3).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full bg-white/[0.06] text-[10px] font-mono text-gray-400 tracking-wider backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > (isFeatured ? 6 : 3) && (
              <span className="px-2.5 py-1 rounded-full bg-white/[0.04] text-[10px] font-mono text-gray-600 tracking-wider">
                +{project.techStack.length - (isFeatured ? 6 : 3)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Arrow indicator */}
      <div className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
        <ArrowUpRight size={18} className="text-gray-400" />
      </div>
    </div>
  );
}

// ──────────────────── NDA Card ────────────────────

function NdaCardContent({
  project,
  hexLines,
  isFeatured,
  accentRgb,
}: {
  project: Project;
  hexLines: string[];
  isFeatured: boolean;
  accentRgb: string;
}) {
  return (
    <div className={`relative h-full ${isFeatured ? "min-h-[400px]" : "min-h-[280px]"} flex flex-col items-center justify-center overflow-hidden`}>
      {/* Animated data stream background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        <div className="animate-data-stream">
          {hexLines.map((line, i) => (
            <div
              key={i}
              className="font-mono text-[8px] text-white/[0.03] whitespace-nowrap leading-6 tracking-[0.3em]"
            >
              {line}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {hexLines.map((line, i) => (
            <div
              key={`dup-${i}`}
              className="font-mono text-[8px] text-white/[0.03] whitespace-nowrap leading-6 tracking-[0.3em]"
            >
              {line}
            </div>
          ))}
        </div>
      </div>

      {/* Scanline sweep on hover */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-scanline" />
      </div>

      {/* Subtle accent gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(${accentRgb},0.06), transparent 70%)`,
        }}
      />

      {/* Central frosted panel */}
      <div className="relative z-10 flex flex-col items-center gap-3 p-8 bg-white/[0.02] backdrop-blur-[2px] rounded-lg border border-white/[0.04]">
        <Shield className="text-gray-600 group-hover:text-gray-400 transition-colors duration-500" size={isFeatured ? 32 : 24} />
        <span className="text-[10px] tracking-[0.3em] uppercase text-gray-600 font-mono font-medium group-hover:text-gray-400 transition-colors duration-500">
          Confidential
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <h3
          className={`font-display font-bold text-white mb-1.5 ${
            isFeatured ? "text-xl" : "text-sm"
          }`}
        >
          {project.title}
        </h3>
        {/* Redacted category */}
        <span className="inline-block text-[10px] font-mono tracking-wider text-gray-600 bg-gray-800/50 rounded-sm px-1.5 py-0.5">
          {project.category}
        </span>
      </div>
    </div>
  );
}
