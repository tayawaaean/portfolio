"use client";

import { Project } from "@/types";
import ScrollProgressBar from "./ScrollProgressBar";
import BackToPortfolio from "./BackToPortfolio";
import DetailHero from "./DetailHero";
import TechStackSection from "./TechStackSection";
import ChallengeSection from "./ChallengeSection";
import FeatureCards from "./FeatureCards";
import ProjectNavigation from "./ProjectNavigation";

interface Props {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  projectIndex: number;
  totalProjects: number;
}

export default function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
  projectIndex,
  totalProjects,
}: Props) {
  return (
    <div>
      <ScrollProgressBar />
      <BackToPortfolio />

      <DetailHero
        project={project}
        projectIndex={projectIndex}
        totalProjects={totalProjects}
      />

      <TechStackSection project={project} />

      <ChallengeSection project={project} />

      {/* Section divider */}
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>

      <FeatureCards project={project} />

      <ProjectNavigation
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </div>
  );
}
