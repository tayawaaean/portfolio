"use client";

import { motion } from "framer-motion";

export type FilterType = "all" | "public" | "nda";

interface CategoryFilterProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: { all: number; public: number; nda: number };
}

const filters: { key: FilterType; label: string }[] = [
  { key: "all", label: "All" },
  { key: "public", label: "Public" },
  { key: "nda", label: "NDA" },
];

export default function CategoryFilter({
  activeFilter,
  onFilterChange,
  counts,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-1 mb-10">
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onFilterChange(f.key)}
          className={`relative px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300 rounded-full ${
            activeFilter === f.key
              ? "text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          {activeFilter === f.key && (
            <motion.span
              layoutId="filter-pill"
              className="absolute inset-0 bg-white/[0.08] border border-white/[0.12] rounded-full"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">
            {f.label}{" "}
            <span className="text-gray-600 ml-0.5">({counts[f.key]})</span>
          </span>
        </button>
      ))}
    </div>
  );
}
