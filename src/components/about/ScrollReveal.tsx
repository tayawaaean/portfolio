"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * Editorial scroll-linked text reveal. Each word brightens from a dim resting
 * state to full white as the reader scrolls it through the viewport, creating a
 * "read-along" effect reminiscent of premium agency sites. Words flow as normal
 * inline text so spacing and wrapping stay natural.
 */
export default function ScrollReveal({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.35"],
  });

  const words = children.split(" ");

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgb(120,120,135)", "rgb(229,231,235)"]
  );

  return (
    <>
      <motion.span style={{ opacity, color }} className="inline-block">
        {children}
      </motion.span>{" "}
    </>
  );
}
