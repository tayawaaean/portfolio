import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Typewriter from "typewriter-effect";
import { Link } from "react-scroll";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import TouchGestures from "../common/TouchGestures";

// Import your background image from assets folder
import bgHero from "../../assets/bg.jpg";

export default function Hero() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const [offsetY, setOffsetY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Enhanced floating animation variants with better visual hierarchy
  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };



  // Interactive particle configuration
  const particlesConfig = {
    background: { color: "transparent" },
    fpsLimit: 60,
    interactivity: {
      events: { 
        onHover: { enable: true, mode: "repulse" }, 
        onClick: { enable: true, mode: "push" },
        resize: true 
      },
      modes: { 
        repulse: { distance: 150, duration: 0.6 },
        push: { particles_nb: 3 }
      },
    },
    particles: {
      color: { value: "#00e5ff" },
      links: {
        color: "#00e5ff",
        distance: 150,
        enable: true,
        opacity: 0.3,
        width: 1,
      },
      move: {
        direction: "none" as const,
        distance: 2,
        enable: true,
        outModes: { default: "bounce" as const },
        random: false,
        speed: 1,
        straight: false,
      },
      number: { 
        density: { enable: true, area: 800 },
        value: isMobile ? 30 : 80 
      },
      opacity: {
        animation: { enable: true, speed: 0.5, sync: false },
        value: 0.5,
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 3 },
        animation: { enable: true, speed: 2, sync: false }
      },
    },
    detectRetina: true,
  };

  return (
    <TouchGestures
      onSwipeUp={() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
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
              135deg, 
              rgba(10,10,10,0.9) 0%, 
              rgba(0,229,255,0.1) 50%,
              rgba(32,201,151,0.1) 100%
            ), 
            url(${bgHero})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundPositionY: offsetY * 0.5, // parallax vertical scroll

        }}
      >
        {/* Enhanced Particle Background */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesConfig}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1
          }}
        />

        {/* Main Content with Enhanced Visual Hierarchy */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1, 
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2
          }}
          style={{
            position: "relative",
            zIndex: 2,
            padding: isMobile ? "2rem 1rem" : "4rem 2rem",
            borderRadius: isMobile ? "20px" : "30px",
            background: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            maxWidth: isMobile ? "90%" : "800px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          {/* Hero Title with Enhanced Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              variant={isMobile ? "h3" : "h1"}
              sx={{
                mb: isMobile ? 2 : 3,
                fontWeight: 700,
                letterSpacing: isMobile ? 0.5 : 1,
                lineHeight: 1.1,
                background: "linear-gradient(45deg, #00e5ff, #20c997, #2196f3)",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradientShift 3s ease-in-out infinite",
                "@keyframes gradientShift": {
                  "0%, 100%": { backgroundPosition: "0% 50%" },
                  "50%": { backgroundPosition: "100% 50%" }
                }
              }}
            >
              Aean Gabrielle Tayawa
            </Typography>
          </motion.div>

          {/* Subtitle with Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              variant={isMobile ? "h5" : "h4"}
              sx={{
                mb: isMobile ? 3 : 4,
                fontWeight: 500,
                letterSpacing: isMobile ? 0.3 : 0.5,
                lineHeight: 1.3,
                color: "#20c997",
                textShadow: "0 2px 10px rgba(32, 201, 151, 0.5)"
              }}
            >
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Full Stack Developer")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Software Engineer")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("IoT Engineer")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Renewable Energy Specialist")
                    .pauseFor(1000)
                    .deleteAll()
                    .start();
                }}
                options={{
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </Typography>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Typography
              variant={isMobile ? "body1" : "h6"}
              sx={{
                mb: isMobile ? 4 : 5,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
                color: "rgba(255, 255, 255, 0.9)",
                textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)"
              }}
            >
              Building innovative solutions that bridge technology and sustainability. 
              From renewable energy platforms to smart agriculture systems, 
              I create impactful digital experiences that solve real-world problems.
            </Typography>
          </motion.div>

          {/* Call-to-Action Buttons with Enhanced Interactions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "1rem" : "1.5rem",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                component={Link}
                to="projects"
                smooth={true}
                duration={800}
                variant="contained"
                size={isMobile ? "medium" : "large"}
                sx={{
                  px: isMobile ? 3 : 4,
                  py: isMobile ? 1.5 : 2,
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  minHeight: isMobile ? "44px" : "52px",
                  background: "linear-gradient(45deg, #00e5ff 0%, #20c997 50%, #2196f3 100%)",
                  backgroundSize: "200% 200%",
                  boxShadow: "0 8px 32px rgba(0, 229, 255, 0.4)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #20c997 0%, #2196f3 50%, #00e5ff 100%)",
                    backgroundSize: "200% 200%",
                    boxShadow: "0 12px 40px rgba(32, 201, 151, 0.6)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                View My Work
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                component={Link}
                to="contact"
                smooth={true}
                duration={800}
                variant="outlined"
                size={isMobile ? "medium" : "large"}
                sx={{
                  px: isMobile ? 3 : 4,
                  py: isMobile ? 1.5 : 2,
                  fontSize: isMobile ? "1rem" : "1.1rem",
                  minHeight: isMobile ? "44px" : "52px",
                  border: "2px solid",
                  borderImage: "linear-gradient(45deg, #00e5ff, #20c997) 1",
                  color: "#00e5ff",
                  "&:hover": {
                    background: "linear-gradient(45deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
                    borderColor: "#20c997",
                    color: "#20c997",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              >
                Get In Touch
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating Decorative Elements (Hidden on Mobile) */}
          {!isMobile && (
            <>
              <motion.div
                variants={floatingVariants}
                animate="float"
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "10%",
                  width: "20px",
                  height: "20px",
                  background: "linear-gradient(45deg, #00e5ff, #20c997)",
                  borderRadius: "50%",
                  filter: "blur(2px)"
                }}
              />
              <motion.div
                variants={floatingVariants}
                animate="float"
                style={{
                  position: "absolute",
                  top: "30%",
                  right: "15%",
                  width: "15px",
                  height: "15px",
                  background: "linear-gradient(45deg, #20c997, #2196f3)",
                  borderRadius: "50%",
                  filter: "blur(2px)"
                }}
              />
            </>
          )}
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          style={{
            position: "absolute",
            bottom: isMobile ? "2rem" : "3rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "2px",
              height: isMobile ? "40px" : "60px",
              background: "linear-gradient(to bottom, transparent, #00e5ff, transparent)",
              borderRadius: "1px"
            }}
          />
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              mt: 1,
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.75rem",
              letterSpacing: 1
            }}
          >
            Scroll to explore
          </Typography>
        </motion.div>
      </Box>
    </TouchGestures>
  );
}
