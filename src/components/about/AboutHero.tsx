"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import { MapPin, GraduationCap } from "lucide-react";

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 14, suffix: "+", label: "Projects Shipped" },
  { value: 5, suffix: "+", label: "Countries Served" },
  { value: 6, suffix: "", label: "Industries Served" },
];

function StatCounter({
  value,
  suffix,
  delay,
}: {
  value: number;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setDisplay(value), delay * 1000);
    return () => clearTimeout(t);
  }, [isInView, value, delay]);

  return (
    <div ref={ref} className="flex items-baseline justify-center">
      <NumberFlow
        value={display}
        transformTiming={{ duration: 1100, easing: "ease-out" }}
      />
      <span>{suffix}</span>
    </div>
  );
}

/** Profile photo with cursor-driven 3D tilt and floating decorative frames. */
function TiltPhoto() {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 14);
    rx.set(py * -14);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto lg:mx-0"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        className="relative w-[280px] h-[340px] md:w-[320px] md:h-[400px]"
      >
        {/* Decorative frame offsets */}
        <div className="absolute -inset-3 rounded-2xl border border-white/[0.06] -rotate-2" />
        <div className="absolute -inset-1.5 rounded-2xl border border-white/[0.04] rotate-1" />

        {/* Photo */}
        <div
          className="relative w-full h-full rounded-2xl overflow-hidden"
          style={{ transform: "translateZ(40px)" }}
        >
          <Image
            src="/images/profile.png"
            alt="Aean Gabrielle D. Tayawa"
            fill
            className="object-cover object-center"
            priority
            sizes="320px"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
        </div>

        {/* Floating accent dot */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(70px)" }}
          className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-sm"
        />
      </motion.div>
    </motion.div>
  );
}

const tags = [
  { icon: MapPin, label: "Philippines" },
  { icon: GraduationCap, label: "BS Computer Engineering" },
];

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[85vh] flex items-center overflow-hidden"
    >
      {/* Background gradient mesh */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 70% 30%, rgba(99,102,241,0.08), transparent 50%),
              radial-gradient(ellipse at 20% 70%, rgba(139,92,246,0.06), transparent 50%),
              radial-gradient(ellipse at 90% 80%, rgba(59,130,246,0.05), transparent 50%)
            `,
          }}
        />
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg width="100%" height="100%">
            <filter id="about-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#about-noise)" />
          </svg>
        </div>
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          <TiltPhoto />

          {/* Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              {tags.map((tag) => {
                const Icon = tag.icon;
                return (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono text-[10px] tracking-[0.15em] uppercase text-gray-400"
                  >
                    <Icon size={11} />
                    {tag.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4"
            >
              Aean Gabrielle
              <br />
              <span className="text-gradient bg-gradient-to-r from-white via-gray-300 to-gray-500">
                D. Tayawa
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="font-mono text-xs tracking-[0.15em] uppercase text-gray-500 mb-6"
            >
              Full-Stack Developer &middot; Prompt Engineer &middot; Technical
              Consultant
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl"
            >
              I build production-ready web applications from the ground up. From
              database architecture and backend APIs to polished frontend
              interfaces and deployment &mdash; I own the entire development
              lifecycle. Currently leading a multidisciplinary dev team and
              working with international clients across the US, Canada, and
              Europe.
            </motion.p>
          </div>
        </div>

        {/* Stats counter row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="relative bg-surface border border-border-subtle rounded-xl p-5 text-center group hover:border-border-hover transition-colors duration-300"
            >
              <div className="font-display text-2xl md:text-3xl font-bold text-white mb-1 tabular-nums">
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  delay={0.8 + i * 0.15}
                />
              </div>
              <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
