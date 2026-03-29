"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

const storyLines = [
  { text: "Every line of code", sub: "tells a story" },
  { text: "From a curious kid", sub: "who loved building things" },
  { text: "To an engineer", sub: "who turns ideas into reality" },
  { text: "3+ years. 14 platforms.", sub: "Clients across 3 continents." },
  { text: "I don't just write code", sub: "I craft experiences" },
];

// Total sections = 1 (landing) + storyLines.length
const TOTAL_SECTIONS = 1 + storyLines.length;

function ParallaxGrid({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -900]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.06, 0.04, 0.03, 0]
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating code fragments */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
        <div className="absolute top-[10%] left-[5%] text-[10px] font-mono text-white/20 rotate-[-8deg]">
          {"const buildDreams = () => {"}
        </div>
        <div className="absolute top-[25%] right-[8%] text-[10px] font-mono text-white/15 rotate-[5deg]">
          {"await deploy(vision);"}
        </div>
        <div className="absolute top-[60%] left-[15%] text-[10px] font-mono text-white/10 rotate-[-3deg]">
          {"return impact;"}
        </div>
        <div className="absolute top-[80%] right-[20%] text-[10px] font-mono text-white/15 rotate-[8deg]">
          {"// crafted with purpose"}
        </div>
      </motion.div>

      {/* Geometric shapes */}
      <motion.div style={{ y: y2, opacity }} className="absolute inset-0">
        <div className="absolute top-[15%] right-[15%] w-32 h-32 border border-white/[0.04] rotate-45" />
        <div className="absolute top-[45%] left-[10%] w-48 h-48 border border-white/[0.03] rounded-full" />
        <div className="absolute top-[70%] right-[25%] w-24 h-24 border border-white/[0.05] rotate-12" />
      </motion.div>

      {/* Dot grid */}
      <motion.div style={{ y: y3, opacity }} className="absolute inset-0">
        <div className="absolute top-[5%] left-[40%] grid grid-cols-6 gap-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/[0.08]" />
          ))}
        </div>
        <div className="absolute top-[50%] right-[5%] grid grid-cols-4 gap-6">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-white/[0.06]" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function IntroLanding({
  scrollYProgress,
}: {
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Landing occupies the first section (0 to 1/TOTAL_SECTIONS)
  const sectionEnd = 1 / TOTAL_SECTIONS;

  const opacity = useTransform(
    scrollYProgress,
    [0, sectionEnd * 0.6, sectionEnd],
    [1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [0, sectionEnd], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, sectionEnd], [1, 0.95]);

  // Scroll indicator bounces
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, sectionEnd * 0.5],
    [1, 0]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <div className="text-center px-8">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-xs tracking-[0.3em] uppercase text-gray-500 mb-6"
        >
          Welcome to my portfolio
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-4"
        >
          Aean Gabrielle
          <br />
          <span className="text-gray-400">D. Tayawa</span>
        </motion.h1>

        {/* Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="w-16 h-[1px] bg-white/30 mx-auto my-6 origin-center"
        />

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="font-mono text-sm md:text-base tracking-[0.15em] text-gray-400"
        >
          Full Stack Developer
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{ opacity: scrollIndicatorOpacity }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-600">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function StorySection({
  line,
  index,
  scrollYProgress,
}: {
  line: (typeof storyLines)[0];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Story sections start after the landing (offset by 1)
  const sectionStart = (index + 1) / TOTAL_SECTIONS;
  const sectionEnd = (index + 2) / TOTAL_SECTIONS;
  const mid = (sectionStart + sectionEnd) / 2;

  const opacity = useTransform(
    scrollYProgress,
    [
      sectionStart,
      sectionStart + 0.02,
      mid - 0.02,
      mid + 0.02,
      sectionEnd - 0.02,
      sectionEnd,
    ],
    [0, 1, 1, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [sectionStart, mid, sectionEnd],
    [60, 0, -60]
  );

  const scale = useTransform(
    scrollYProgress,
    [sectionStart, sectionStart + 0.03, sectionEnd - 0.03, sectionEnd],
    [0.95, 1, 1, 0.95]
  );

  const subOpacity = useTransform(
    scrollYProgress,
    [
      sectionStart + 0.02,
      sectionStart + 0.05,
      sectionEnd - 0.03,
      sectionEnd,
    ],
    [0, 1, 1, 0]
  );

  const subY = useTransform(
    scrollYProgress,
    [sectionStart + 0.02, sectionStart + 0.05],
    [30, 0]
  );

  const lineWidth = useTransform(
    scrollYProgress,
    [sectionStart + 0.01, sectionStart + 0.06],
    [0, 60]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
    >
      <div className="text-center px-8 max-w-3xl">
        <motion.div
          style={{ width: lineWidth }}
          className="h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8"
        />
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-4">
          {line.text}
        </h2>
        <motion.p
          style={{ opacity: subOpacity, y: subY }}
          className="font-mono text-base md:text-lg text-gray-400 tracking-wider"
        >
          {line.sub}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function IntroSequence({ onEnd }: { onEnd?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressWidth = useTransform(
    smoothProgress,
    [0, 0.95],
    ["0%", "100%"]
  );
  const introOpacity = useTransform(smoothProgress, [0.88, 0.98], [1, 0]);

  const hasFired = useRef(false);
  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (v > 0.9 && !hasFired.current) {
      hasFired.current = true;
      onEnd?.();
    }
  });

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${TOTAL_SECTIONS * 100}vh` }}
    >
      {/* Sticky viewport */}
      <motion.div
        style={{ opacity: introOpacity }}
        className="sticky top-0 h-screen w-full overflow-hidden bg-[#0a0a0a]"
      >
        <ParallaxGrid scrollYProgress={smoothProgress} />

        {/* Noise texture */}
        <div
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Landing screen */}
        <IntroLanding scrollYProgress={smoothProgress} />

        {/* Story sections */}
        {storyLines.map((line, i) => (
          <StorySection
            key={i}
            line={line}
            index={i}
            scrollYProgress={smoothProgress}
          />
        ))}

        {/* Progress bar */}
        <div className="fixed bottom-0 left-0 right-0 h-[2px] bg-white/[0.05] z-20">
          <motion.div
            style={{ width: progressWidth }}
            className="h-full bg-gradient-to-r from-white/20 via-white/40 to-white/20"
          />
        </div>
      </motion.div>
    </div>
  );
}
