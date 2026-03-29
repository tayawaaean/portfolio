"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import SocialIcons from "@/components/layout/SocialIcons";
import HeroSection from "@/components/home/HeroSection";
import IntroSequence from "@/components/home/IntroSequence";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intro-seen");
    if (!seen) {
      setShowIntro(true);
    }
    setReady(true);
  }, []);

  const handleIntroEnd = () => {
    sessionStorage.setItem("intro-seen", "1");
  };

  if (!ready) return null;

  return (
    <main>
      {showIntro && <IntroSequence onEnd={handleIntroEnd} />}
      <Navbar />
      <HeroSection />
      <SocialIcons />
    </main>
  );
}
