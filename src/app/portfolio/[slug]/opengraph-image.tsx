import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const alt = "Project case study by Aean Tayawa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const title = project?.title ?? "Project";
  const category = project?.category ?? "Case Study";
  const tech = project?.techStack.slice(0, 5) ?? [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          backgroundImage: "linear-gradient(135deg, #0a0a0a 0%, #14121f 100%)",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", color: "#a5b4fc", fontSize: 24, letterSpacing: 6 }}>
            {category.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 700,
              marginTop: 24,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {tech.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                color: "#cbd5e1",
                fontSize: 24,
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 999,
                padding: "8px 20px",
                marginRight: 14,
                marginTop: 14,
              }}
            >
              {t}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            color: "#6b7280",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex" }}>Aean Gabrielle D. Tayawa</div>
          <div style={{ display: "flex" }}>agdtayawa.xyz</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
