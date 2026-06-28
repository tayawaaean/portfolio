"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import HeroSection from "@/components/home/HeroSection";
import IntroSequence from "@/components/home/IntroSequence";

export default function HomeClient() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("intro-seen")) {
      setShowIntro(true);
    }
  }, []);

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
