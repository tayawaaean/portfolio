"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import SmoothScroll from "@/components/about/SmoothScroll";
import AboutHero from "@/components/about/AboutHero";
import BioSection from "@/components/about/BioSection";
import SkillsSection from "@/components/about/SkillsSection";
import TimelineSection from "@/components/about/TimelineSection";
import ServicesSection from "@/components/about/ServicesSection";
import Magnetic from "@/components/about/Magnetic";

export default function AboutClient() {
  return (
    <SmoothScroll>
      <main className="min-h-screen">
        <Navbar />
        <SocialIcons />

        <AboutHero />

        <BioSection />

        {/* Divider */}
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        </div>

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
              Interested in working together? I&apos;m always open to discussing
              new projects, creative ideas, or opportunities to be part of your
              vision.
            </p>
            <Magnetic strength={0.4}>
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
            </Magnetic>
          </motion.div>
        </section>
      </main>
    </SmoothScroll>
  );
}
