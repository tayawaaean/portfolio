"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import { projects } from "@/data/projects";

export default function PortfolioPage() {
  const publicCount = projects.filter((p) => !p.isNda).length;
  const ndaCount = projects.filter((p) => p.isNda).length;

  return (
    <main className="min-h-screen">
      <Navbar />
      <SocialIcons />
      <div className="pt-24 pb-20 px-8 md:px-16 max-w-7xl mx-auto">
        {/* Page header */}
        <div className="relative mb-14">
          {/* Subtle radial orb */}
          <div className="absolute -top-20 left-1/4 w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.07)_0%,transparent_70%)] pointer-events-none" />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative font-display text-4xl md:text-5xl lg:text-6xl font-bold text-gradient bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            Project Gallery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative font-mono text-xs tracking-[0.2em] text-gray-500 mt-4 uppercase"
          >
            {projects.length} projects &mdash; {publicCount} public, {ndaCount}{" "}
            under NDA
          </motion.p>

          {/* Animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            className="relative h-[1px] bg-gradient-to-r from-border-subtle via-border-hover to-transparent mt-6 origin-left"
          />
        </div>

        <ProjectGrid />
      </div>
    </main>
  );
}
