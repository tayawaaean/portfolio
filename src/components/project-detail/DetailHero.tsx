"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Shield, ExternalLink } from "lucide-react";
import { Project } from "@/types";
import { getCategoryColors } from "@/components/portfolio/categoryColors";

// Images that actually exist in /public/images/projects/
const AVAILABLE_IMAGES = new Set([
  "/images/projects/djpathlete.png",
  "/images/projects/athletemonitoring.png",
  "/images/projects/arecgis.png",
  "/images/projects/efficyon.png",
  "/images/projects/mayhemcreation.png",
  "/images/projects/video.png",
]);

interface DetailHeroProps {
  project: Project;
  projectIndex: number;
  totalProjects: number;
}

export default function DetailHero({
  project,
  projectIndex,
  totalProjects,
}: DetailHeroProps) {
  const colors = useMemo(
    () => getCategoryColors(project.category),
    [project.category]
  );

  const words = project.title.split(" ");
  const imageExists = AVAILABLE_IMAGES.has(project.image);

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] flex flex-col justify-end overflow-hidden">
      {/* Background: real image or animated gradient mesh */}
      {imageExists ? (
        <>
          <div className="absolute inset-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              loading="lazy"
              sizes="100vw"
            />
          </div>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/30" />
        </>
      ) : (
        <>
          {/* Animated gradient mesh background */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{
              background: `
                radial-gradient(ellipse at 20% 50%, rgba(${colors.primary},0.18), transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(${colors.secondary},0.12), transparent 50%),
                radial-gradient(ellipse at 50% 80%, rgba(${colors.accent},0.1), transparent 50%)
              `,
            }}
          />

          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.04]">
            <svg width="100%" height="100%">
              <filter id="detail-noise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="3"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#detail-noise)" />
            </svg>
          </div>

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </>
      )}

      {/* Floating metadata badges - top right */}
      <div className="absolute top-28 right-8 md:right-16 z-10 flex flex-col items-end gap-3">
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-full px-4 py-1.5 font-mono text-xs text-gray-400 tracking-wider"
        >
          {project.category}
        </motion.span>

        {project.isNda && (
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="inline-flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1.5 font-mono text-xs text-red-400 tracking-wider"
          >
            <Shield size={12} />
            NDA
          </motion.span>
        )}

        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="font-mono text-xs text-gray-600 tracking-wider"
        >
          {String(projectIndex + 1).padStart(2, "0")} / {String(totalProjects).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-8 md:px-16 pb-12 md:pb-16 max-w-7xl mx-auto w-full">
        {/* Title with staggered word reveal */}
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed mb-8"
        >
          {project.description}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex gap-3"
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-sm font-mono tracking-wider rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              Live Site
              <ExternalLink size={14} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/20 text-sm font-mono tracking-wider rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              GitHub
              <ExternalLink size={14} />
            </a>
          )}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
