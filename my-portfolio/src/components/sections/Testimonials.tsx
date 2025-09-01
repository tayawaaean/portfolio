import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  IconButton
} from '@mui/material';
import { ChevronLeft, ChevronRight, FormatQuote } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  project?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Dr. Maria Santos",
    role: "Research Director",
    company: "MMSU Research Center",
    content: "The ARECGIS platform has revolutionized how we track renewable energy assets across the Philippines. The real-time data visualization and comprehensive reporting capabilities have significantly improved our research efficiency.",
    rating: 5,
    project: "ARECGIS Platform",
    avatar: "/avatars/maria.jpg"
  },
  {
    id: 2,
    name: "Engr. Carlos Mendoza",
    role: "Operations Manager",
    company: "Department of Energy",
    content: "The solar energy monitoring systems developed have been instrumental in our national renewable energy inventory. The accuracy and reliability of the data collection has exceeded our expectations.",
    rating: 5,
    project: "Solar Pump Monitoring",
    avatar: "/avatars/carlos.jpg"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Virtual Assistant",
    company: "Freelance Professional",
    content: "The portfolio template has been a game-changer for my business. It perfectly captures my professional services and has helped me land multiple high-paying clients. The responsive design and modern aesthetics are exactly what I needed.",
    rating: 5,
    project: "Portfolio Template",
    avatar: "/avatars/sarah.jpg"
  },
  {
    id: 4,
    name: "Dr. Elena Rodriguez",
    role: "Agricultural Engineer",
    company: "Philippine Agriculture Department",
    content: "The IoT agriculture solutions have transformed our farming operations. The real-time monitoring and automated systems have increased our crop yield by 40% while reducing water usage.",
    rating: 5,
    project: "Hydroponics System",
    avatar: "/avatars/elena.jpg"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <Box id="testimonials" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6 } }}>
      <AnimatedSection animation="fadeUp">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #00e5ff, #20c997)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Client Testimonials
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "text.secondary",
            maxWidth: 600,
            mx: "auto"
          }}
        >
          What clients and collaborators say about our work
        </Typography>
      </AnimatedSection>

      <Box sx={{ maxWidth: 800, mx: "auto", position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              sx={{
                background: "linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
                border: "1px solid rgba(0, 229, 255, 0.2)",
                borderRadius: 4,
                overflow: "visible",
                position: "relative"
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {/* Quote Icon */}
                <Box sx={{
                  position: "absolute",
                  top: -20,
                  left: 20,
                  backgroundColor: "#00e5ff",
                  borderRadius: "50%",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <FormatQuote sx={{ color: "white", fontSize: 20 }} />
                </Box>

                {/* Rating */}
                <Box sx={{ mb: 2 }}>
                  <Rating value={currentTestimonial.rating} readOnly size="small" />
                </Box>

                {/* Testimonial Content */}
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    lineHeight: 1.6,
                    fontStyle: "italic"
                  }}
                >
                  "{currentTestimonial.content}"
                </Typography>

                {/* Project Tag */}
                {currentTestimonial.project && (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        backgroundColor: "rgba(0, 229, 255, 0.1)",
                        color: "#00e5ff",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontWeight: 600
                      }}
                    >
                      Related to: {currentTestimonial.project}
                    </Typography>
                  </Box>
                )}

                {/* Author Info */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: "#00e5ff",
                      fontWeight: "bold"
                    }}
                  >
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {currentTestimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentTestimonial.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {currentTestimonial.company}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <Box sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          px: 2
        }}>
          <IconButton
            onClick={prevTestimonial}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(0, 229, 255, 0.2)"
              }
            }}
          >
            <ChevronLeft />
          </IconButton>

          {/* Dots Indicator */}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {testimonials.map((_, index) => (
              <Box
                key={index}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  backgroundColor: index === currentIndex ? "#00e5ff" : "rgba(255, 255, 255, 0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Box>

          <IconButton
            onClick={nextTestimonial}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(0, 229, 255, 0.2)"
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
