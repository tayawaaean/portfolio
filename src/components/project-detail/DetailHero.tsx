"use client";

import { Fragment, useMemo, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, ExternalLink, ArrowDown } from "lucide-react";
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
  "/images/projects/lgbtalent.png",
  "/images/projects/hairvana.png",
  "/images/projects/elliereid.png",
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

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Cinematic parallax: the backdrop scales up and drifts while the
  // foreground copy rises and fades as you scroll past.
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const words = project.title.split(" ");
  const imageExists = AVAILABLE_IMAGES.has(project.image);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] flex flex-col justify-end overflow-hidden"
    >
      {/* Parallax backdrop */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        {imageExists ? (
          <Image
            src={project.image}
            alt={
              project.imageAlt ??
              `${project.title} — ${project.category} screenshot`
            }
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
        ) : (
          <>
            <motion.div
              className="absolute inset-0"
              animate={{ backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{
                background: `
                  radial-gradient(ellipse at 20% 50%, rgba(${colors.primary},0.22), transparent 50%),
                  radial-gradient(ellipse at 80% 20%, rgba(${colors.secondary},0.15), transparent 50%),
                  radial-gradient(ellipse at 50% 80%, rgba(${colors.accent},0.12), transparent 50%)
                `,
              }}
            />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
          </>
        )}
      </motion.div>

      {/* Scroll-reactive dark overlay */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-[#0a0a0a]"
      />
      {/* Static bottom-to-top gradient so copy stays legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent" />

      {/* Floating metadata — top right */}
      <div className="absolute top-28 right-8 md:right-16 z-10 flex flex-col items-end gap-3">
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-full px-4 py-1.5 font-mono text-xs text-gray-300 tracking-wider"
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
          {String(projectIndex + 1).padStart(2, "0")} /{" "}
          {String(totalProjects).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Foreground copy */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 px-8 md:px-16 pb-16 md:pb-24 max-w-7xl mx-auto w-full"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-3 mb-5"
        >
          <span
            className="h-[1px] w-12"
            style={{ background: `rgba(${colors.primary},0.8)` }}
          />
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: `rgba(${colors.primary},0.9)` }}
          >
            Case Study
          </span>
        </motion.div>

        {/* Title with staggered word reveal */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 leading-[1.05]">
          {words.map((word, i) => (
            <Fragment key={i}>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.25 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mb-8"
        >
          {project.description}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
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
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: cueOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-gray-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} className="text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
