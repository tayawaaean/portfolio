"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import { Project } from "@/types";
import ScrollReveal from "@/components/about/ScrollReveal";

const steps = [
  { index: "01", label: "The Challenge", accent: "244,63,94" }, // rose
  { index: "02", label: "The Solution", accent: "16,185,129" }, // emerald
];

interface ChallengeSectionProps {
  project: Project;
}

export default function ChallengeSection({ project }: ChallengeSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.5", "end 0.9"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  const current = steps[active];

  return (
    <section
      ref={sectionRef}
      className="max-w-6xl mx-auto px-8 md:px-16 py-20 md:py-28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20">
        {/* Sticky chapter indicator */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-600">
            The Process
          </span>

          <div className="relative mt-6 flex gap-5">
            {/* Vertical progress track */}
            <div className="relative w-[2px] shrink-0 mt-2 hidden lg:block self-stretch min-h-[120px]">
              <div className="absolute inset-0 bg-white/[0.06]" />
              <motion.div
                style={{
                  scaleY: fill,
                  background: `rgba(${current.accent},0.8)`,
                }}
                className="absolute inset-0 origin-top"
              />
            </div>

            <div>
              {/* Oversized crossfading index */}
              <div className="relative h-[90px] md:h-[110px]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={current.index}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute font-display font-bold leading-none text-7xl md:text-8xl"
                    style={{ color: `rgba(${current.accent},0.9)` }}
                  >
                    {current.index}
                  </motion.span>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.h3
                  key={current.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-xl md:text-2xl font-bold text-white mt-2"
                >
                  {current.label}
                </motion.h3>
              </AnimatePresence>

              {/* Step dots */}
              <div className="flex gap-2 mt-5">
                {steps.map((s, i) => (
                  <span
                    key={s.index}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 28 : 8,
                      background:
                        i === active
                          ? `rgba(${s.accent},0.9)`
                          : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling narrative — each step fills the viewport so the sticky
            chapter indicator stays pinned while you read it */}
        <div>
          <Step
            accent={steps[0].accent}
            text={project.challenge}
            step={0}
            setActive={setActive}
          />
          <Step
            accent={steps[1].accent}
            text={project.solution}
            step={1}
            setActive={setActive}
          />
        </div>
      </div>
    </section>
  );
}

function Step({
  text,
  accent,
  step,
  setActive,
}: {
  text: string;
  accent: string;
  step: number;
  setActive: (n: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) setActive(step);
  }, [inView, step, setActive]);

  return (
    <div
      ref={ref}
      className="relative flex items-center min-h-[55vh] lg:min-h-[80vh] py-10"
    >
      <span
        className="absolute -left-5 top-10 bottom-10 w-[2px] rounded-full hidden md:block"
        style={{ background: `rgba(${accent},0.4)` }}
      />
      <ScrollReveal className="font-display text-xl md:text-3xl font-medium leading-[1.4]">
        {text}
      </ScrollReveal>
    </div>
  );
}
