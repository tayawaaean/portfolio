import { ImageResponse } from "next/og";

export const alt = "Aean Tayawa — Full-Stack Next.js & React Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage: "linear-gradient(135deg, #0a0a0a 0%, #14121f 100%)",
          padding: "90px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 6,
            backgroundColor: "#6366f1",
            marginBottom: 36,
          }}
        />
        <div style={{ display: "flex", color: "#a5b4fc", fontSize: 26, letterSpacing: 8 }}>
          FULL-STACK DEVELOPER
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 82,
            fontWeight: 700,
            marginTop: 20,
          }}
        >
          Aean Gabrielle D. Tayawa
        </div>
        <div
          style={{
            display: "flex",
            color: "#9ca3af",
            fontSize: 36,
            marginTop: 28,
            maxWidth: 960,
          }}
        >
          Next.js · React · TypeScript · AI — for US, Canada & Europe clients
        </div>
        <div style={{ display: "flex", color: "#6b7280", fontSize: 26, marginTop: 60 }}>
          agdtayawa.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
