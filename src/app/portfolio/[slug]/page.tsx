import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import Navbar from "@/components/layout/Navbar";
import ProjectDetailClient from "@/components/project-detail/ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Aean Gabrielle D. Tayawa`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main className="min-h-screen">
      <Navbar />
      <ProjectDetailClient
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
        projectIndex={currentIndex}
        totalProjects={projects.length}
      />
    </main>
  );
}
