"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";

const stats = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 14, suffix: "+", label: "Projects Shipped" },
  { value: 5, suffix: "+", label: "Countries Served" },
  { value: 6, suffix: "", label: "Industries Served" },
];

function AnimatedCounter({
  value,
  suffix,
  delay,
}: {
  value: number;
  suffix: string;
  delay: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 40;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, [isInView, value, delay]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function AboutHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto lg:mx-0"
          >
            <div className="relative w-[280px] h-[340px] md:w-[320px] md:h-[400px]">
              {/* Decorative frame offset */}
              <div className="absolute -inset-3 rounded-2xl border border-white/[0.06] -rotate-2" />
              <div className="absolute -inset-1.5 rounded-2xl border border-white/[0.04] rotate-1" />

              {/* Photo */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/profile.png"
                  alt="Aean Gabrielle D. Tayawa"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="320px"
                />
                {/* Subtle gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              </div>

              {/* Floating accent dot */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Text content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-3 mb-6"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono text-[10px] tracking-[0.15em] uppercase text-gray-400">
                <MapPin size={11} />
                Philippines
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono text-[10px] tracking-[0.15em] uppercase text-gray-400">
                <Briefcase size={11} />
                Available for Work
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono text-[10px] tracking-[0.15em] uppercase text-gray-400">
                <GraduationCap size={11} />
                BS Computer Engineering
              </span>
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
              <div className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                <AnimatedCounter
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
      </div>
    </section>
  );
}
