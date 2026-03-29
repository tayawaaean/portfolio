"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";

export default function Timeline() {
  return (
    <div className="mt-20">
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-12">
        Career Timeline & Milestones
      </h2>

      {/* Desktop: horizontal */}
      <div className="hidden md:block relative">
        {/* Connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-4 left-0 right-0 h-[2px] bg-gray-700 origin-left"
        />

        <div className="grid grid-cols-5 gap-4">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="relative pt-10"
            >
              {/* Dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.15 }}
                className="absolute top-[10px] left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-[#0a0a0a] z-10"
              />

              <div className="text-center px-2">
                <p className="text-sm font-bold text-white mb-1">
                  {entry.year}
                </p>
                <p className="text-xs text-gray-300 font-medium mb-1">
                  {entry.title}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden relative pl-8">
        {/* Vertical line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 bottom-0 left-[7px] w-[2px] bg-gray-700 origin-top"
        />

        <div className="space-y-10">
          {timeline.map((entry, i) => (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-8 top-1 w-3 h-3 bg-white rounded-full border-2 border-[#0a0a0a] z-10" />

              <p className="text-sm font-bold text-white mb-1">{entry.year}</p>
              <p className="text-xs text-gray-300 font-medium mb-1">
                {entry.title}
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                {entry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
