"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Database,
  CreditCard,
  Brain,
  Globe,
  Search,
  Cloud,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "End-to-end application development using Next.js, React, TypeScript, and Node.js. From MVPs to production platforms.",
    accent: "99,102,241",
  },
  {
    icon: Smartphone,
    title: "Progressive Web Apps",
    description:
      "Cross-platform applications that work on any device without App Store overhead. Native-like experience on web.",
    accent: "59,130,246",
  },
  {
    icon: Database,
    title: "SaaS & Marketplace Platforms",
    description:
      "Multi-tenant architectures, subscription billing, booking flows, payment splitting, and vendor onboarding.",
    accent: "139,92,246",
  },
  {
    icon: CreditCard,
    title: "Payment Systems",
    description:
      "Stripe Checkout, Stripe Connect, subscription management, milestone-based payments, and invoicing.",
    accent: "236,72,153",
  },
  {
    icon: Brain,
    title: "AI-Powered Features",
    description:
      "Integration of LLM APIs for intelligent content generation, exercise matching, data analysis, and automation.",
    accent: "245,158,11",
  },
  {
    icon: Globe,
    title: "GIS & Mapping",
    description:
      "Interactive maps with Leaflet/MapBox, geospatial data visualization, heatmaps, and location-based services.",
    accent: "34,197,94",
  },
  {
    icon: Search,
    title: "SEO & Performance",
    description:
      "Technical SEO audits, schema markup, Core Web Vitals optimization, and AI search discoverability.",
    accent: "6,182,212",
  },
  {
    icon: Cloud,
    title: "DevOps & Deployment",
    description:
      "Vercel deployments, DNS configuration, CI/CD pipelines, and production monitoring.",
    accent: "249,115,22",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

export default function ServicesSection() {
  return (
    <section className="py-20 px-8 md:px-16 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
          What I Do
        </h2>
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-gray-500">
          Services &amp; specializations
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative bg-surface border border-border-subtle rounded-xl p-5 hover:border-border-hover transition-all duration-300 hover:-translate-y-1"
            >
              {/* Icon */}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300"
                style={{
                  background: `rgba(${service.accent}, 0.1)`,
                }}
              >
                <Icon
                  size={18}
                  style={{ color: `rgba(${service.accent}, 0.8)` }}
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <h3 className="text-sm font-bold text-white mb-2">
                {service.title}
              </h3>

              <p className="text-gray-500 text-xs leading-relaxed">
                {service.description}
              </p>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, rgba(${service.accent},0.04), transparent 70%)`,
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
