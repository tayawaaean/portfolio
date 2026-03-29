"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiNextdotjs,
  SiSupabase,
  SiStripe,
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiPostgresql,
  SiSocketdotio,
  SiAirtable,
} from "react-icons/si";
import { Brain, Zap, Cloud, Video, Globe, BarChart3 } from "lucide-react";
import { Project } from "@/types";
import { getCategoryAccentRgb } from "@/components/portfolio/categoryColors";

const techIcons: Record<string, { icon: React.ElementType; color: string }> = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "React Native": { icon: SiReact, color: "#61DAFB" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Next.js": { icon: SiNextdotjs, color: "#ffffff" },
  "Next.js 16": { icon: SiNextdotjs, color: "#ffffff" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Supabase PostgreSQL": { icon: SiSupabase, color: "#3ECF8E" },
  "Stripe": { icon: SiStripe, color: "#635BFF" },
  "Stripe Connect": { icon: SiStripe, color: "#635BFF" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Express": { icon: SiExpress, color: "#ffffff" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "Socket.io": { icon: SiSocketdotio, color: "#010101" },
  "Airtable": { icon: SiAirtable, color: "#18BFFF" },
  "Claude API": { icon: Brain, color: "#D97706" },
  "AI/LLM Integration": { icon: Brain, color: "#8B5CF6" },
  "YouTube API": { icon: Video, color: "#FF0000" },
  "GoHighLevel": { icon: Zap, color: "#22C55E" },
  "MailerLite API": { icon: Zap, color: "#09C269" },
  "Vercel Cron": { icon: Cloud, color: "#ffffff" },
  "PVWatts API": { icon: Zap, color: "#F59E0B" },
  "Recharts": { icon: BarChart3, color: "#8884D8" },
  "Leaflet": { icon: Globe, color: "#199900" },
  "MapBox": { icon: Globe, color: "#4264FB" },
  "Sequelize": { icon: SiPostgresql, color: "#2379BD" },
  "NextAuth.js": { icon: SiNextdotjs, color: "#ffffff" },
  "Zustand": { icon: SiReact, color: "#61DAFB" },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

interface TechStackSectionProps {
  project: Project;
}

export default function TechStackSection({ project }: TechStackSectionProps) {
  const accentRgb = useMemo(
    () => getCategoryAccentRgb(project.category),
    [project.category]
  );

  return (
    <section className="max-w-6xl mx-auto px-8 md:px-16 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-6"
      >
        Tech Stack
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="flex flex-wrap gap-3"
      >
        {project.techStack.map((tech) => {
          const iconData = techIcons[tech];
          const Icon = iconData?.icon;

          return (
            <motion.div
              key={tech}
              variants={pillVariants}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface border border-border-subtle hover:border-border-hover transition-all duration-300 hover:-translate-y-0.5 cursor-default"
            >
              {Icon && (
                <Icon
                  size={14}
                  style={{ color: iconData.color }}
                  className="shrink-0"
                />
              )}
              <span className="text-xs font-mono text-gray-300 tracking-wider">
                {tech}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Decorative accent line */}
      <div className="mt-12">
        <div
          className="h-[1px] w-full"
          style={{
            background: `linear-gradient(to right, rgba(${accentRgb},0.2), transparent 60%)`,
          }}
        />
      </div>
    </section>
  );
}
