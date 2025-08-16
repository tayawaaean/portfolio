import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { ArrowBack, ArrowForward, Close } from "@mui/icons-material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { projects } from "../../data/projects";
import { motion } from "framer-motion";
import AnimatedSection from "../common/AnimatedSection";

const techColors: Record<string, string> = {
  React: "#61dafb",
  "React Native": "#61dbfb",
  "Python Flask": "#3572A5",
  Python: "#3572A5",
  "C++": "#00599C",
  MQTT: "#660066",
  "MQTT WebSockets": "#800080",
  MongoDB: "#4DB33D",
  "Node.js": "#43853d",
  Express: "#444444",
  Firebase: "#ffca28",
  Flask: "#000000",
  PHP: "#4F5B93",
  JavaScript: "#f7df1e",
  MySQL: "#00758F",
  WordPress: "#21759b",
  WebSockets: "#0082c9",
  "IoT Sensors": "#ff5722",
  "Real-Time Dashboard": "#2196f3",
  "PVWatts API": "#6a1b9a",
  "Gasoline Price API": "#ff7043",
  "Weather API": "#0288d1",
  "GIS Mapping": "#2e7d32",
  "HTTP Control": "#8d6e63",
  "Video Streaming": "#d32f2f",
  "Offline Storage": "#7b1fa2",
  "Data Visualization": "#009688",
  "Excel Import": "#1b5e20",
  "Hostinger Deployment": "#512da8",
};

export default function Projects() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Project categories
  const categories = {
    all: "All Projects",
    government: "Government/Enterprise",
    iot: "IoT & Agriculture", 
    business: "Business Solutions"
  };

  // Categorize projects
  const categorizeProject = (project: any) => {
    const title = project.title.toLowerCase();
    if (title.includes("arecgis") || title.includes("srva")) return "government";
    if (title.includes("solar") || title.includes("hydroponics") || title.includes("garlic")) return "iot";
    if (title.includes("portal") || title.includes("company")) return "business";
    return "business";
  };

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(project => categorizeProject(project) === selectedCategory);

  // Featured project (ARECGIS)
  const featuredProject = projects[0];

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrev = () =>
    setLightboxIndex((prev) =>
      prev === 0 ? lightboxImages.length - 1 : prev - 1
    );

  const handleNext = () =>
    setLightboxIndex((prev) =>
      prev === 0 ? lightboxImages.length - 1 : prev + 1
    );

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1
    }
  };

  return (
          <Box id="projects" sx={{ 
        py: { xs: 4, md: 8 }, 
        px: { xs: 2, md: 6 },
        background: "linear-gradient(135deg, rgba(0, 229, 255, 0.03), rgba(33, 150, 243, 0.02))"
      }}>
      <AnimatedSection animation="fadeUp">
        <Typography
          variant={isSm ? "h5" : "h4"}
          gutterBottom
          sx={{ 
            textAlign: "center", 
            mb: { xs: 3, md: 5 }, 
            fontWeight: "bold",
            background: "linear-gradient(45deg, #00e5ff, #20c997)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Projects
        </Typography>
      </AnimatedSection>

      {/* Featured Project Section */}
      <AnimatedSection animation="slideUp" delay={0.2}>
        <Box sx={{ mb: { xs: 6, md: 8 } }}>
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              textAlign: "center",
              color: "#ff9800",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: 1,
              fontSize: { xs: "0.9rem", md: "1.25rem" }
            }}
          >
            🌟 Featured Project
          </Typography>
          
          <Card sx={{
            background: "linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
            border: "2px solid rgba(0, 229, 255, 0.3)",
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #00e5ff, #20c997, #2196f3, #ff9800)",
              animation: "pulse 2s ease-in-out infinite"
            }
          }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
                {/* Featured Project Images */}
                <Box sx={{ flex: { md: 1 } }}>
                  {featuredProject.images && featuredProject.images.length > 0 && (
                    <Box
                      component="img"
                      src={featuredProject.images[0]}
                      alt={featuredProject.title}
                      sx={{
                        width: "100%",
                        height: { xs: 200, sm: 250, md: 250 },
                        objectFit: "cover",
                        borderRadius: 2,
                        cursor: "pointer",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)"
                        }
                      }}
                      onClick={() => openLightbox(featuredProject.images, 0)}
                    />
                  )}
                </Box>

                {/* Featured Project Content */}
                <Box sx={{ flex: { md: 1.5 } }}>
                  <Typography variant={isMobile ? "h5" : "h4"} sx={{
                    fontWeight: "bold",
                    background: "linear-gradient(45deg, #00e5ff, #20c997)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                    fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.125rem" }
                  }}>
                    {featuredProject.title}
                  </Typography>

                  {/* Key Metrics */}
                  <Box sx={{ 
                    display: "grid", 
                    gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(3, 1fr)" }, 
                    gap: { xs: 1.5, md: 2 }, 
                    mb: 3 
                  }}>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant={isSm ? "h6" : "h6"} sx={{ 
                        color: "#00e5ff", 
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", md: "1.25rem" }
                      }}>
                        400MW+
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{
                        fontSize: { xs: "0.7rem", md: "0.75rem" }
                      }}>
                        Capacity Tracked
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant={isSm ? "h6" : "h6"} sx={{ 
                        color: "#20c997", 
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", md: "1.25rem" }
                      }}>
                        15+
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{
                        fontSize: { xs: "0.7rem", md: "0.75rem" }
                      }}>
                        Universities
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "center" }}>
                      <Typography variant={isSm ? "h6" : "h6"} sx={{ 
                        color: "#ff9800", 
                        fontWeight: "bold",
                        fontSize: { xs: "1rem", md: "1.25rem" }
                      }}>
                        DOE
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{
                        fontSize: { xs: "0.7rem", md: "0.75rem" }
                      }}>
                        Recognized
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body1" sx={{ 
                    mb: 3, 
                    lineHeight: 1.6,
                    fontSize: { xs: "0.9rem", md: "1rem" }
                  }}>
                    A national renewable energy GIS platform serving as the official inventory system
                    with 400MW+ capacity across 15+ universities. DOE-recognized and deployed nationwide.
                  </Typography>

                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                    {featuredProject.tech.slice(0, isMobile ? 3 : 4).map((tech, i) => (
                      <Chip
                        key={i}
                        label={tech}
                        size="small"
                        sx={{
                          backgroundColor: techColors[tech] || "#888",
                          color: "white",
                          fontWeight: 600,
                          fontSize: { xs: "0.7rem", md: "0.75rem" },
                          height: { xs: "24px", md: "auto" }
                        }}
                      />
                    ))}
                  </Box>

                  {featuredProject.liveLink && (
                    <Button
                      variant="contained"
                      href={featuredProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        background: "linear-gradient(45deg, #00e5ff, #20c997)",
                        fontWeight: "bold",
                        textTransform: "none",
                        px: { xs: 2, md: 3 },
                        py: { xs: 1, md: 1.5 },
                        fontSize: { xs: "0.85rem", md: "1rem" },
                        minHeight: { xs: "44px", md: "auto" }
                      }}
                    >
                      View Live Platform
                    </Button>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </AnimatedSection>

      {/* Project Categories */}
      <AnimatedSection animation="fadeUp" delay={0.4}>
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={selectedCategory}
            onChange={(_, newValue) => setSelectedCategory(newValue)}
            centered={!isMobile}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            sx={{
              mb: 4,
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                minWidth: "auto",
                px: { xs: 2, md: 3 },
                fontSize: { xs: "0.8rem", md: "0.875rem" }
              },
              "& .Mui-selected": {
                background: "linear-gradient(45deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
                borderRadius: 2
              }
            }}
          >
            {Object.entries(categories).map(([key, label]) => (
              <Tab key={key} label={label} value={key} />
            ))}
          </Tabs>
        </Box>
      </AnimatedSection>

      <Timeline position={isMobile ? "right" : "alternate"}>
        {filteredProjects.map((proj, idx) => {
          const category = categorizeProject(proj);
          const isHighPriority = category === "government" || proj.title.includes("Solar Pump");
          
          return (
          <TimelineItem key={idx}>
            <TimelineSeparator>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <TimelineDot 
                  sx={{
                    background: "linear-gradient(45deg, #00e5ff, #20c997)",
                    boxShadow: "0 0 20px rgba(0, 229, 255, 0.5)",
                    width: { xs: 16, md: 20 },
                    height: { xs: 16, md: 20 },
                  }}
                />
              </motion.div>
              {idx < projects.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <TimelineConnector 
                    sx={{
                      background: "linear-gradient(180deg, #00e5ff, #20c997)",
                      width: { xs: 2, md: 3 },
                    }}
                  />
                </motion.div>
              )}
            </TimelineSeparator>

            <TimelineContent>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: idx * 0.2,
                  duration: 0.6,
                  ease: "easeOut"
                }}
              >
                <Paper
                  sx={{
                    p: { xs: 2, md: 3 },
                    maxWidth: { xs: "95vw", sm: "90vw", md: isHighPriority ? 650 : 600 },
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: isHighPriority ? "rgba(26, 26, 26, 0.9)" : "rgba(26, 26, 26, 0.8)",
                    border: isHighPriority ? "2px solid rgba(255, 152, 0, 0.3)" : "1px solid rgba(0, 229, 255, 0.1)",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: isHighPriority ? "4px" : "3px",
                      background: isHighPriority 
                        ? "linear-gradient(90deg, #ff9800, #f57c00, #ff9800)" 
                        : "linear-gradient(90deg, #00e5ff, #20c997, #2196f3)",
                      transform: "scaleX(0)",
                      transition: "transform 0.6s ease",
                    },
                    "&:hover::before": {
                      transform: "scaleX(1)",
                    },
                  }}
                  elevation={isHighPriority ? 6 : 3}
                >
                  {/* Category Badge */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
                    <Chip 
                      label={categories[category as keyof typeof categories]} 
                      size="small"
                      sx={{
                        backgroundColor: 
                          category === "government" ? "rgba(255, 152, 0, 0.2)" :
                          category === "iot" ? "rgba(76, 175, 80, 0.2)" :
                          "rgba(33, 150, 243, 0.2)",
                        color:
                          category === "government" ? "#ff9800" :
                          category === "iot" ? "#4caf50" :
                          "#2196f3",
                        fontWeight: 600,
                        fontSize: { xs: "0.7rem", md: "0.75rem" },
                        height: { xs: "24px", md: "auto" }
                      }}
                    />
                    {isHighPriority && (
                      <Chip 
                        label="High Impact" 
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255, 152, 0, 0.3)",
                          color: "#ff9800",
                          fontWeight: 600,
                          fontSize: { xs: "0.7rem", md: "0.75rem" },
                          height: { xs: "24px", md: "auto" }
                        }}
                      />
                    )}
                  </Box>

                  <Typography 
                    variant={isSm ? "h6" : isHighPriority ? "h5" : "h5"} 
                    fontWeight="bold"
                    sx={{
                      background: isHighPriority 
                        ? "linear-gradient(45deg, #ff9800, #f57c00)"
                        : "linear-gradient(45deg, #00e5ff, #20c997)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 1,
                      fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" }
                    }}
                  >
                    {proj.title}
                  </Typography>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2, 
                      fontSize: { xs: "0.8rem", md: "0.9rem" }
                    }}
                  >
                    {proj.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{ 
                      fontSize: { xs: "0.85rem", md: "1rem" },
                      lineHeight: 1.6
                    }}
                  >
                    {proj.description}
                  </Typography>

                  {/* Live View Link */}
                  {proj.liveLink && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={proj.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <Chip 
                          label="Live View" 
                          color="primary" 
                          clickable 
                          sx={{ 
                            mb: 1,
                            background: "linear-gradient(45deg, #00e5ff, #2196f3)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: { xs: "0.7rem", md: "0.75rem" },
                            height: { xs: "28px", md: "auto" },
                            "&:hover": {
                              background: "linear-gradient(45deg, #2196f3, #00e5ff)",
                              transform: "translateY(-2px)",
                            }
                          }} 
                        />
                      </a>
                    </motion.div>
                  )}

                  {/* Thumbnails */}
                  {proj.images && proj.images.length > 0 && (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: {
                          xs: proj.images.length === 1 ? "1fr" : "repeat(2, 1fr)",
                          sm: proj.images.length === 1 ? "1fr" : "repeat(2, 1fr)",
                          md: proj.images.length % 2 === 0
                            ? "repeat(2, 1fr)"
                            : "repeat(auto-fill, minmax(150px, 1fr))"
                        },
                        gap: { xs: 1, md: 1.5 },
                        mb: 2,
                        overflowX: isMobile ? "auto" : "visible",
                      }}
                    >
                      {proj.images.map((img, i) => (
                        <motion.div
                          key={i}
                          variants={imageVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ 
                            delay: i * 0.1,
                            duration: 0.4,
                            ease: "easeOut"
                          }}
                          whileHover={{ 
                            scale: isMobile ? 1.05 : 1.08,
                            rotateY: isMobile ? 0 : 5,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <Box
                            component="img"
                            src={img}
                            alt={`${proj.title} ${i + 1}`}
                            sx={{
                              width: "100%",
                              height: { xs: 120, sm: 150, md: 150 },
                              objectFit: "cover",
                              borderRadius: 2,
                              cursor: "pointer",
                              transition: "all 0.3s ease",
                              border: "2px solid transparent",
                              "&:hover": { 
                                borderColor: "rgba(0, 229, 255, 0.5)",
                                boxShadow: "0 8px 25px rgba(0, 229, 255, 0.3)"
                              },
                            }}
                            onClick={() => openLightbox(proj.images, i)}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  )}

                  {/* Tech Chips */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}>
                    {proj.tech.slice(0, isMobile ? 6 : 8).map((t, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ scale: isMobile ? 1.05 : 1.1, rotate: isMobile ? 0 : 5 }}
                      >
                        <Chip
                          label={t}
                          size="small"
                          sx={{
                            backgroundColor: techColors[t] || "#888",
                            color: "white",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            fontSize: { xs: "0.7rem", md: "0.75rem" },
                            height: { xs: "24px", md: "auto" },
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                            }
                          }}
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
          );
        })}
      </Timeline>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} fullScreen={isMobile}>
        <DialogContent
          sx={{
            position: "relative",
            bgcolor: "black",
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <IconButton
            onClick={() => setLightboxOpen(false)}
            sx={{ 
              position: "absolute", 
              top: { xs: 8, md: 16 }, 
              right: { xs: 8, md: 16 }, 
              color: "white",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                background: "rgba(255,255,255,0.2)",
                transform: "scale(1.1)"
              }
            }}
          >
            <Close />
          </IconButton>

          <IconButton
            onClick={handlePrev}
            sx={{ 
              position: "absolute", 
              top: "50%", 
              left: { xs: 8, md: 16 }, 
              color: "white",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                background: "rgba(255,255,255,0.2)",
                transform: "scale(1.1)"
              }
            }}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{ 
              position: "absolute", 
              top: "50%", 
              right: { xs: 8, md: 16 }, 
              color: "white",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                background: "rgba(255,255,255,0.2)",
                transform: "scale(1.1)"
              }
            }}
          >
            <ArrowForward />
          </IconButton>

          {lightboxImages.length > 0 && (
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                component="img"
                src={lightboxImages[lightboxIndex]}
                alt="Project"
                sx={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "100vh",
                  margin: "auto",
                  borderRadius: 2,
                }}
              />
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
