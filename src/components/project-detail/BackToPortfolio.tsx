"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function BackToPortfolio() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-24 left-8 z-40"
    >
      <Link
        href="/portfolio"
        className="group inline-flex items-center gap-2 bg-surface/80 backdrop-blur-sm border border-border-subtle rounded-full px-4 py-2 text-gray-400 hover:text-white hover:border-border-hover transition-all duration-300"
      >
        <ArrowLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
        <span className="hidden md:inline font-mono text-xs tracking-wider">
          Portfolio
        </span>
      </Link>
    </motion.div>
  );
}
