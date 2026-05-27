"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiSupabase,
  SiDocker,
  SiGit,
  SiGraphql,
  SiStripe,
  SiNginx,
  SiFirebase,
  SiPrisma,
  SiFastapi,
  SiVercel,
} from "react-icons/si";
import { Cloud, Brain, Zap, Wand2 } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Skill } from "@/types";
import SpotlightCard from "./SpotlightCard";
import SectionHeading from "./SectionHeading";

const iconMap: Record<string, React.ElementType> = {
  "React": SiReact,
  "React Native": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  "Python": SiPython,
  "FastAPI": SiFastapi,
  "REST APIs": Zap,
  "PostgreSQL": SiPostgresql,
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "Supabase": SiSupabase,
  "Prisma": SiPrisma,
  "Firebase": SiFirebase,
  "Docker": SiDocker,
  "AWS": Cloud,
  "Vercel": SiVercel,
  "Git": SiGit,
  "NGINX": SiNginx,
  "Claude API": Brain,
  "OpenAI API": Brain,
  "Stripe": SiStripe,
  "GraphQL": SiGraphql,
  "Prompt Engineering": Wand2,
};

const categoryAccents = [
  "59,130,246",   // blue - Frontend
  "34,197,94",    // green - Backend
  "168,85,247",   // purple - Database
  "249,115,22",   // orange - DevOps
  "236,72,153",   // pink - AI
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function SkillsSection() {
  return (
    <section className="py-20 px-8 md:px-16 max-w-7xl mx-auto">
      <SectionHeading
        index="02"
        kicker="Toolkit"
        title="Technical Arsenal"
        subtitle="Technologies I work with daily"
        accent="59,130,246"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {skillCategories.map((category, catIndex) => (
          <motion.div key={category.name} variants={cardVariants} className="h-full">
            <SpotlightCard
              accent={categoryAccents[catIndex]}
              className="bg-surface border border-border-subtle rounded-xl p-6 h-full hover:border-border-hover transition-colors duration-300"
            >
              {/* Accent bar */}
              <div
                className="h-[2px] w-10 rounded-full mb-5 transition-all duration-500 group-hover:w-20"
                style={{
                  background: `rgba(${categoryAccents[catIndex]}, 0.6)`,
                }}
              />

              {/* Category name */}
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-400 mb-5">
                {category.name}
              </h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill: Skill, skillIndex: number) => {
                  const Icon = iconMap[skill.name];
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: catIndex * 0.1 + skillIndex * 0.04,
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
                    >
                      {Icon && (
                        <Icon
                          size={12}
                          style={{ color: skill.color }}
                          className="shrink-0"
                        />
                      )}
                      <span className="text-[11px] font-mono text-gray-300 tracking-wider">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
