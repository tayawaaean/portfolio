import { Box, Typography, Button } from "@mui/material";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Typewriter from "typewriter-effect";
import { Link } from "react-scroll";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      id="home"
      sx={{
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        overflow: "hidden",
        backgroundImage: `
          linear-gradient(
            180deg, 
            rgba(13,17,23,0.8) 0%, 
            rgba(22,27,34,0.8) 100%
          ), 
          url('/bg-hero.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundPositionY: offsetY * 0.5, // parallax vertical scroll
      }}
    >
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" }, // transparent so bg image shows through
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: "#00e5ff" },
            links: { color: "#00e5ff", distance: 150, enable: true, opacity: 0.5, width: 1 },
            move: { enable: true, speed: 1, outModes: { default: "bounce" } },
            number: { value: 50 },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 5 } },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Aean Gabrielle Tayawa
        </Typography>
        <Typography variant="h5" sx={{ mt: 1, mb: 3 }}>
          <Typewriter
            options={{
              strings: ["Full Stack Developer", "IoT Engineer", "Tech Enthusiast"],
              autoStart: true,
              loop: true,
            }}
          />
        </Typography>

        <Link to="projects" smooth={true} duration={600}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button variant="contained" color="secondary" size="large">
              View My Work
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </Box>
  );
}
