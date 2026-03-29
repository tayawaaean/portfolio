"use client";

import { skills } from "@/data/skills";
import SkillBadge from "./SkillBadge";

export default function SkillsGrid() {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4 text-white">Core Skills</h2>
      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, i) => (
          <SkillBadge key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </div>
  );
}
