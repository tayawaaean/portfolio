"use client";

import { ReactLenis } from "lenis/react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Wraps the About page in Lenis inertial smooth-scrolling and renders a thin
 * gradient progress bar pinned to the top of the viewport. Scoped to this page
 * only so the rest of the site keeps native scroll behavior.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true }}>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-400"
      />
      {children}
    </ReactLenis>
  );
}
