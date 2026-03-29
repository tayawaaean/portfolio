"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[45%_55%] h-full">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[50vh] md:h-full"
        >
          <Image
            src="/images/profile.png"
            alt="Aean Gabrielle D. Tayawa"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
          />
          {/* Gradient fade on right edge for desktop */}
          <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
          {/* Gradient fade on bottom edge for mobile */}
          <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        </motion.div>

        {/* Text Content */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-12 md:py-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm tracking-[0.2em] text-gray-400 mb-4 font-mono"
          >
            Aean Gabrielle D. Tayawa
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
          >
            Full Stack
            <br />
            Developer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md font-mono"
          >
            Mabuhay! I&apos;m a multidisciplinary Full Stack Developer
            crafting robust and elegant digital solutions with expertise in both
            front-end and back-end technologies. Based in the Philippines.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
