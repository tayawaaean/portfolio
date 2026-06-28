import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aean Gabrielle D. Tayawa — Full-Stack Developer",
    short_name: "Aean Tayawa",
    description:
      "Full-stack developer building production-ready Next.js, React, and AI-integrated web apps for international clients.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
