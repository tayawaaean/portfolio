import { Box, useTheme, useMediaQuery } from "@mui/material";
import { motion, useInView } from "framer-motion";
import type { Variants } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: "fadeUp" | "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotate" | "bounce";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  sx?: any;
}

export default function AnimatedSection({ 
  children, 
  animation = "fadeUp", 
  delay = 0, 
  duration = 0.6,
  threshold = 0.1,
  className,
  sx
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold,
    margin: "-100px 0px -100px 0px"
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Enhanced animation variants with better visual hierarchy
  const animationVariants: Record<string, Variants> = {
    fadeUp: {
      hidden: { 
        opacity: 0, 
        y: 60,
        scale: 0.95
      },
      visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: {
          duration: duration,
          ease: [0.4, 0, 0.2, 1],
          delay: delay
        }
      }
    },
    fadeIn: {
      hidden: { 
        opacity: 0,
        scale: 0.98
      },
      visible: { 
        opacity: 1,
        scale: 1,
        transition: {
          duration: duration,
          ease: "easeOut",
          delay: delay
        }
      }
    },
    slideUp: {
      hidden: { 
        opacity: 0, 
        y: 80,
        rotateX: 15
      },
      visible: { 
        opacity: 1, 
        y: 0,
        rotateX: 0,
        transition: {
          duration: duration,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: delay
        }
      }
    },
    slideLeft: {
      hidden: { 
        opacity: 0, 
        x: 60,
        rotateY: 15
      },
      visible: { 
        opacity: 1, 
        x: 0,
        rotateY: 0,
        transition: {
          duration: duration,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: delay
        }
      }
    },
    slideRight: {
      hidden: { 
        opacity: 0, 
        x: -60,
        rotateY: -15
      },
      visible: { 
        opacity: 1, 
        x: 0,
        rotateY: 0,
        transition: {
          duration: duration,
          ease: [0.25, 0.46, 0.45, 0.94],
          delay: delay
        }
      }
    },
    scale: {
      hidden: { 
        opacity: 0, 
        scale: 0.8,
        rotate: -5
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        transition: {
          duration: duration,
          ease: [0.34, 1.56, 0.64, 1],
          delay: delay
        }
      }
    },
    rotate: {
      hidden: { 
        opacity: 0, 
        scale: 0.9,
        rotate: -180
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        rotate: 0,
        transition: {
          duration: duration,
          ease: [0.34, 1.56, 0.64, 1],
          delay: delay
        }
      }
    },
    bounce: {
      hidden: { 
        opacity: 0, 
        scale: 0.3,
        y: 100
      },
      visible: { 
        opacity: 1, 
        scale: 1,
        y: 0,
        transition: {
          duration: duration,
          ease: [0.68, -0.55, 0.265, 1.55],
          delay: delay
        }
      }
    }
  };

  // Reduce motion on mobile for better performance
  const shouldReduceMotion = isMobile;
  
  if (shouldReduceMotion) {
    return (
      <Box ref={ref} className={className} sx={sx}>
        {children}
      </Box>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={animationVariants[animation]}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
      style={{ width: "100%" }}
    >
      <Box sx={sx}>
        {children}
      </Box>
    </motion.div>
  );
}

// New component for floating decorative elements
interface FloatingElementProps {
  children?: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  style?: React.CSSProperties;
}

export function FloatingElement({ 
  children, 
  delay = 0, 
  duration = 3, 
  distance = 10,
  style 
}: FloatingElementProps) {
  const floatingVariants = {
    float: {
      y: [-distance, distance, -distance],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay
      }
    }
  };

  return (
    <motion.div
      variants={floatingVariants}
      animate="float"
      style={style}
    >
      {children}
    </motion.div>
  );
}

// New component for glowing effects
interface GlowingElementProps {
  children: React.ReactNode;
  color?: string;
  intensity?: number;
  duration?: number;
  style?: React.CSSProperties;
}

export function GlowingElement({ 
  children, 
  color = "#00e5ff", 
  intensity = 0.5,
  duration = 2,
  style 
}: GlowingElementProps) {
  const glowVariants = {
    glow: {
      boxShadow: [
        `0 0 ${20 * intensity}px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`,
        `0 0 ${40 * intensity}px ${color}${Math.round(intensity * 0.8 * 255).toString(16).padStart(2, '0')}`,
        `0 0 ${20 * intensity}px ${color}${Math.round(intensity * 255).toString(16).padStart(2, '0')}`
      ],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <motion.div
      variants={glowVariants}
      animate="glow"
      style={style}
    >
      {children}
    </motion.div>
  );
}
