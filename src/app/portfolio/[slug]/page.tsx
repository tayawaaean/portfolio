import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { SITE_URL } from "@/lib/site";
import JsonLd from "@/components/seo/JsonLd";
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
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project Not Found", robots: { index: false, follow: false } };
  }

  const url = `/portfolio/${slug}`;
  return {
    title: project.title,
    description: project.description,
    keywords: [...project.techStack, project.category],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
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

  const pageUrl = `${SITE_URL}/portfolio/${slug}`;
  const isSoftware = /saas|platform|crm|marketplace|application|\bapp\b/i.test(
    project.category
  );

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Portfolio",
        item: `${SITE_URL}/portfolio`,
      },
      { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
    ],
  };

  const workLd = {
    "@context": "https://schema.org",
    "@type": isSoftware ? "SoftwareApplication" : "CreativeWork",
    name: project.title,
    description: project.description,
    image: `${SITE_URL}${project.image}`,
    keywords: project.techStack.join(", "),
    about: project.category,
    inLanguage: "en",
    author: { "@id": `${SITE_URL}/#person` },
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
    ...(isSoftware
      ? { applicationCategory: "WebApplication", operatingSystem: "Web" }
      : {}),
  };

  return (
    <main className="min-h-screen">
      <JsonLd data={[breadcrumbLd, workLd]} />
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
