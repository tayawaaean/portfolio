"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import AboutHero from "@/components/about/AboutHero";
import SkillsSection from "@/components/about/SkillsSection";
import TimelineSection from "@/components/about/TimelineSection";
import ServicesSection from "@/components/about/ServicesSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SocialIcons />

      <AboutHero />

      {/* Bio / Philosophy section */}
      <section className="py-20 px-8 md:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <span className="absolute -top-6 -left-2 font-display text-7xl md:text-8xl font-bold text-white/[0.03] select-none pointer-events-none">
              01
            </span>
            <div className="relative border-l-2 border-indigo-500/30 pl-6">
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                My Approach
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                My journey began with a curiosity for how things work,
                transforming into a dedicated career in building robust and
                user-centric web solutions. With a keen eye for detail and a
                problem-solving mindset, I craft seamless digital experiences
                that merge functional code with intuitive design. From
                conceptualization to deployment, I thrive on turning complex
                requirements into elegant, scalable software.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <span className="absolute -top-6 -left-2 font-display text-7xl md:text-8xl font-bold text-white/[0.03] select-none pointer-events-none">
              02
            </span>
            <div className="relative border-l-2 border-purple-500/30 pl-6">
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">
                How I Work
              </h3>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                I work primarily with international clients and own the entire
                development lifecycle from planning and proposals through to
                launch and handoff. Clean code, structured repos, and handoff
                docs so you&apos;re never locked into working with me. Projects are
                broken into clear phases with deliverables and payment gates at
                each milestone.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-16">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        </div>
      </section>

      <SkillsSection />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>

      <TimelineSection />

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
      </div>

      <ServicesSection />

      {/* CTA Section */}
      <section className="py-20 px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s Build Something
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Interested in working together? I&apos;m always open to discussing new
            projects, creative ideas, or opportunities to be part of your
            vision.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-mono text-sm tracking-wider rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            Get in Touch
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
