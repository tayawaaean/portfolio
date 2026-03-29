import { Skill } from "@/types";

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    skills: [
      { name: "React", color: "#61DAFB" },
      { name: "Next.js", color: "#ffffff" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "JavaScript", color: "#F7DF1E" },
      { name: "Tailwind CSS", color: "#06B6D4" },
      { name: "React Native", color: "#61DAFB" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", color: "#339933" },
      { name: "Express", color: "#ffffff" },
      { name: "Python", color: "#3776AB" },
      { name: "FastAPI", color: "#009688" },
      { name: "REST APIs", color: "#FF6C37" },
    ],
  },
  {
    name: "Database",
    skills: [
      { name: "PostgreSQL", color: "#4169E1" },
      { name: "MongoDB", color: "#47A248" },
      { name: "Supabase", color: "#3ECF8E" },
      { name: "Prisma", color: "#2D3748" },
      { name: "MySQL", color: "#4479A1" },
      { name: "Firebase", color: "#FFCA28" },
    ],
  },
  {
    name: "DevOps & Tools",
    skills: [
      { name: "Docker", color: "#2496ED" },
      { name: "AWS", color: "#FF9900" },
      { name: "Vercel", color: "#ffffff" },
      { name: "Git", color: "#F05032" },
      { name: "NGINX", color: "#009639" },
    ],
  },
  {
    name: "AI & Integrations",
    skills: [
      { name: "Claude API", color: "#D97706" },
      { name: "OpenAI API", color: "#10A37F" },
      { name: "Stripe", color: "#635BFF" },
      { name: "GraphQL", color: "#E10098" },
      { name: "Prompt Engineering", color: "#8B5CF6" },
    ],
  },
];

// Flat list for backward compatibility
export const skills: Skill[] = skillCategories.flatMap((cat) => cat.skills);
