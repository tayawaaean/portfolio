"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import HeroSection from "@/components/home/HeroSection";

// The intro is a heavy framer-motion sequence; load it only when shown so it
// stays out of the critical hero bundle.
const IntroSequence = dynamic(
  () => import("@/components/home/IntroSequence"),
  { ssr: false }
);

export default function HomeClient() {
  const [showIntro, setShowIntro] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Skip the splash for reduced-motion users and on repeat visits.
    if (!reduceMotion && !sessionStorage.getItem("intro-seen")) {
      setShowIntro(true);
    }
  }, [reduceMotion]);

  const handleIntroEnd = () => {
    sessionStorage.setItem("intro-seen", "1");
  };

  // Hero/Navbar render unconditionally so they exist in the server HTML
  // (LCP + crawlability). The intro is in-flow scroll content shown only on
  // the first visit, prepended above the hero exactly as before.
  return (
    <main>
      {showIntro && <IntroSequence onEnd={handleIntroEnd} />}
      <Navbar />
      <HeroSection />
      <SocialIcons />
    </main>
  );
}
