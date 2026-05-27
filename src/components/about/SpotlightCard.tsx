"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

/**
 * Card wrapper with a cursor-following radial spotlight and a subtle 3D tilt.
 * `accent` is an "r,g,b" string so each card can glow in its own color.
 */
export default function SpotlightCard({
  children,
  accent = "99,102,241",
  className = "",
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    rotateY.set(((x / rect.width) - 0.5) * 8);
    rotateX.set(((y / rect.height) - 0.5) * -8);
  };

  const handleLeave = () => {
    mouseX.set(-200);
    mouseY.set(-200);
    rotateX.set(0);
    rotateY.set(0);
  };

  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mouseX}px ${mouseY}px, rgba(${accent},0.12), transparent 70%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative overflow-hidden ${className}`}
    >
      <motion.div
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 z-0"
      />
      <div className="relative z-10 h-full" style={{ transform: "translateZ(40px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
