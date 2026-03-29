"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiTypescript,

  SiMongodb,
  SiPostgresql,
  SiGraphql,
  SiGit,
  SiDocker,
} from "react-icons/si";
import { Cloud } from "lucide-react";
import { Skill } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  React: SiReact,
  "Node.js": SiNodedotjs,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,

  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  GraphQL: SiGraphql,
  Git: SiGit,
  Docker: SiDocker,
  AWS: Cloud,
};

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

export default function SkillBadge({ skill, index }: SkillBadgeProps) {
  const Icon = iconMap[skill.name];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface border border-border-subtle hover:border-border-hover transition-colors duration-300"
    >
      {Icon && <Icon size={14} style={{ color: skill.color }} />}
      <span className="text-xs text-gray-300 tracking-wide">{skill.name}</span>
    </motion.div>
  );
}
