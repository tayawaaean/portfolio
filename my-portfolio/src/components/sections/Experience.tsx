import { Box, Typography, Paper, useTheme, useMediaQuery, Chip, Card, CardContent } from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { motion } from "framer-motion";
import { experiences } from "../../data/experience";
import AnimatedSection from "../common/AnimatedSection";

export default function Experience() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0
    }
  };

  return (
          <Box id="experience" sx={{ 
        py: { xs: 4, md: 8 }, 
        px: { xs: 2, md: 6 },
        background: "linear-gradient(135deg, rgba(33, 150, 243, 0.03), rgba(32, 201, 151, 0.02))"
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
          Experience
        </Typography>
      </AnimatedSection>

      <Timeline position={isSm ? "right" : "alternate"}>
        {experiences.map((exp, idx) => (
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
                    width: 20,
                    height: 20,
                  }}
                />
              </motion.div>
              {idx < experiences.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.8, delay: idx * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  <TimelineConnector 
                    sx={{
                      background: "linear-gradient(180deg, #00e5ff, #20c997)",
                      width: 3,
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
                transition={{ delay: idx * 0.2 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <Paper
                  sx={{
                    p: { xs: 2, md: 3 },
                    backgroundColor: "rgba(26, 26, 26, 0.8)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(0, 229, 255, 0.1)",
                    borderRadius: 3,
                    width: "100%",
                    maxWidth: { xs: "90vw", md: "700px" },
                    mx: "auto",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: "linear-gradient(90deg, #00e5ff, #20c997, #2196f3)",
                      transform: "scaleX(0)",
                      transition: "transform 0.6s ease",
                    },
                    "&:hover::before": {
                      transform: "scaleX(1)",
                    },
                  }}
                  elevation={3}
                >
                  {/* Header Section */}
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant={isSm ? "h6" : "h5"} 
                      sx={{ 
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #00e5ff, #20c997)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 1,
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        hyphens: "auto"
                      }}
                    >
                      {exp.title}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                        hyphens: "auto"
                      }}
                    >
                      {exp.company} — {exp.date}
                    </Typography>

                    {/* Key Metrics Cards - Only for current role */}
                    {idx === 0 && (
                      <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, 
                        gap: 2, 
                        mb: 3 
                      }}>
                        <Card sx={{ 
                          background: "linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
                          border: "1px solid rgba(0, 229, 255, 0.2)",
                          textAlign: "center",
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <CardContent sx={{ 
                            py: 1, 
                            px: 1,
                            "&:last-child": { pb: 1 },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%"
                          }}>
                            <Typography variant="h6" sx={{ color: "#00e5ff", fontWeight: "bold", mb: 0.5 }}>
                              400MW+
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                              Energy Capacity
                            </Typography>
                          </CardContent>
                        </Card>

                        <Card sx={{ 
                          background: "linear-gradient(135deg, rgba(32, 201, 151, 0.1), rgba(33, 150, 243, 0.1))",
                          border: "1px solid rgba(32, 201, 151, 0.2)",
                          textAlign: "center",
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <CardContent sx={{ 
                            py: 1, 
                            px: 1,
                            "&:last-child": { pb: 1 },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%"
                          }}>
                            <Typography variant="h6" sx={{ color: "#20c997", fontWeight: "bold", mb: 0.5 }}>
                              15+
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                              Universities
                            </Typography>
                          </CardContent>
                        </Card>

                        <Card sx={{ 
                          background: "linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(0, 229, 255, 0.1))",
                          border: "1px solid rgba(33, 150, 243, 0.2)",
                          textAlign: "center",
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <CardContent sx={{ 
                            py: 1, 
                            px: 1,
                            "&:last-child": { pb: 1 },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%"
                          }}>
                            <Typography variant="h6" sx={{ color: "#2196f3", fontWeight: "bold", mb: 0.5 }}>
                              99.9%
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                              Uptime
                            </Typography>
                          </CardContent>
                        </Card>

                        <Card sx={{ 
                          background: "linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 193, 7, 0.1))",
                          border: "1px solid rgba(255, 152, 0, 0.2)",
                          textAlign: "center",
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <CardContent sx={{ 
                            py: 1, 
                            px: 1,
                            "&:last-child": { pb: 1 },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%"
                          }}>
                            <Typography variant="h6" sx={{ color: "#ff9800", fontWeight: "bold", mb: 0.5 }}>
                              DOE
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                              Recognized
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    )}

                    {/* Metrics for internship */}
                    {idx === 1 && (
                      <Box sx={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(2, 1fr)", 
                        gap: 2, 
                        mb: 3 
                      }}>
                        <Card sx={{ 
                          background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(139, 195, 74, 0.1))",
                          border: "1px solid rgba(76, 175, 80, 0.2)",
                          textAlign: "center",
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <CardContent sx={{ 
                            py: 1, 
                            px: 1,
                            "&:last-child": { pb: 1 },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%"
                          }}>
                            <Typography variant="h6" sx={{ color: "#4caf50", fontWeight: "bold", mb: 0.5 }}>
                              40%
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                              Efficiency Gain
                            </Typography>
                          </CardContent>
                        </Card>

                        <Card sx={{ 
                          background: "linear-gradient(135deg, rgba(156, 39, 176, 0.1), rgba(233, 30, 99, 0.1))",
                          border: "1px solid rgba(156, 39, 176, 0.2)",
                          textAlign: "center",
                          py: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <CardContent sx={{ 
                            py: 1, 
                            px: 1,
                            "&:last-child": { pb: 1 },
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            width: "100%"
                          }}>
                            <Typography variant="h6" sx={{ color: "#9c27b0", fontWeight: "bold", mb: 0.5 }}>
                              25%
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
                              Inquiry Increase
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    )}
                  </Box>

                  {/* Enhanced Description with Hierarchy */}
                  <Box>
                    {exp.description.map((item, i) => {
                      // Determine if this is a primary achievement (contains metrics or key outcomes)
                      const isPrimary = item.includes("400 MW") || item.includes("DOE") || item.includes("40%") || item.includes("25%") || item.includes("Lead developer");
                      
                      return (
                        <motion.div
                          key={i}
                          variants={listItemVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Box 
                            sx={{ 
                              mb: 1.5,
                              p: isPrimary ? 2 : 1,
                              borderRadius: isPrimary ? 2 : 1,
                              background: isPrimary ? "linear-gradient(135deg, rgba(0, 229, 255, 0.05), rgba(32, 201, 151, 0.05))" : "transparent",
                              border: isPrimary ? "1px solid rgba(0, 229, 255, 0.1)" : "none",
                              position: "relative"
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontSize: isPrimary ? "1rem" : "0.9rem",
                                lineHeight: 1.6,
                                color: isPrimary ? "text.primary" : "text.secondary",
                                fontWeight: isPrimary ? 500 : 400,
                                position: "relative",
                                pl: 2.5,
                                wordBreak: "break-word",
                                overflowWrap: "anywhere",
                                hyphens: "auto",
                                "&::before": {
                                  content: '"▹"',
                                  color: "#00e5ff",
                                  fontWeight: "bold",
                                  position: "absolute",
                                  left: 8,
                                  top: 2,
                                  fontSize: "1rem",
                                  lineHeight: 1
                                }
                              }}
                            >
                              {item}
                            </Typography>
                          </Box>
                        </motion.div>
                      );
                    })}
                  </Box>

                  {/* Skills Tags */}
                  <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
                      Key Technologies:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {idx === 0 ? (
                        ["React", "Node.js", "MongoDB", "Docker", "GIS", "IoT"].map((tech, techIdx) => (
                          <Chip
                            key={techIdx}
                            label={tech}
                            size="small"
                            sx={{
                              background: "linear-gradient(45deg, rgba(0, 229, 255, 0.2), rgba(32, 201, 151, 0.2))",
                              color: "#00e5ff",
                              border: "1px solid rgba(0, 229, 255, 0.3)",
                              fontSize: "0.75rem"
                            }}
                          />
                        ))
                      ) : (
                        ["PHP", "JavaScript", "MySQL", "WordPress"].map((tech, techIdx) => (
                          <Chip
                            key={techIdx}
                            label={tech}
                            size="small"
                            sx={{
                              background: "linear-gradient(45deg, rgba(76, 175, 80, 0.2), rgba(139, 195, 74, 0.2))",
                              color: "#4caf50",
                              border: "1px solid rgba(76, 175, 80, 0.3)",
                              fontSize: "0.75rem"
                            }}
                          />
                        ))
                      )}
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
