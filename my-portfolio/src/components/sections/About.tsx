import { Box, Typography, Paper, Stack, useTheme, useMediaQuery } from "@mui/material";
import { skills } from "../../data/skills";
import { motion } from "framer-motion";
import AnimatedSection from "../common/AnimatedSection";

export default function About() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const skillCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <AnimatedSection animation="fadeUp">
      <Box id="about" sx={{ 
        py: { xs: 6, md: 10 }, 
        px: { xs: 3, md: 6 },
        background: "linear-gradient(135deg, rgba(32, 201, 151, 0.03), rgba(0, 229, 255, 0.02))"
      }}>
        <AnimatedSection animation="scale">
          <Typography
            variant={isSm ? "h4" : "h3"}
            gutterBottom
            sx={{
              mb: { xs: 4, md: 6 },
              textAlign: "center",
              fontWeight: "bold",
              letterSpacing: { xs: 0.8, md: 1.2 },
              background: "linear-gradient(45deg, #00e5ff, #20c997, #2196f3)",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gradientShift 3s ease-in-out infinite",
              fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
              "@keyframes gradientShift": {
                "0%, 100%": { backgroundPosition: "0% 50%" },
                "50%": { backgroundPosition: "100% 50%" }
              }
            }}
          >
            About Me
          </Typography>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={0.2}>
          {/* Personal Story Hook */}
          <Typography
            variant="body1"
            paragraph
            sx={{
              maxWidth: { xs: "95%", md: 900 },
              mx: "auto",
              mb: { xs: 3, md: 4 },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              lineHeight: 1.8,
              textAlign: "center",
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            From debugging my first Arduino at 3 AM to building systems that power entire universities—
            my journey in tech has always been driven by one simple belief: technology should solve real problems for real people.
          </Typography>

          {/* Unique Value Proposition */}
          <Typography
            variant="body1"
            paragraph
            sx={{
              maxWidth: { xs: "95%", md: 800 },
              mx: "auto",
              mb: { xs: 3, md: 4 },
              fontSize: { xs: "0.95rem", sm: "1rem", md: "1.2rem" },
              lineHeight: 1.7,
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            I'm that rare developer who speaks both boardroom and server room—equally comfortable presenting to government officials 
            and optimizing database queries at 2 AM. My superpower? Taking complex technical challenges and turning them into 
            elegant solutions that non-technical stakeholders can actually understand and use.
          </Typography>

          {/* Key Approach */}
          <Paper 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              mb: { xs: 4, md: 6 },
              backgroundColor: "rgba(26, 26, 26, 0.6)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(0, 229, 255, 0.15)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                textAlign: "center",
                background: "linear-gradient(45deg, #00e5ff, #20c997)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", md: "1.25rem" }
              }}
            >
              My Development Philosophy
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                lineHeight: 1.6,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              <strong style={{ color: "#00e5ff" }}>Build for impact, not just features.</strong> Every line of code I write serves a purpose—
              whether it's helping farmers automate their greenhouses or enabling universities to track renewable energy systems. 
              I don't just solve problems; I anticipate the ones that haven't been asked yet.
            </Typography>
          </Paper>
        </AnimatedSection>

        <AnimatedSection animation="slideUp" delay={0.4}>
          <Paper 
            sx={{ 
              p: { xs: 3, md: 5 }, 
              backgroundColor: "rgba(26, 26, 26, 0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0, 229, 255, 0.1)",
              borderRadius: 4,
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
            {/* Skills with Context Header */}
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textAlign: "center",
                background: "linear-gradient(45deg, #00e5ff, #20c997)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: { xs: "1.5rem", md: "1.75rem" }
              }}
            >
              What I Build With
            </Typography>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {Object.entries(skills).map(([category, skillList], idx) => {
                const categoryDescriptions = {
                  frontend: "Crafting intuitive interfaces that users actually want to interact with",
                  backend: "Building robust server architectures that scale from MVP to enterprise",
                  databases: "Designing data structures that grow with your business needs",
                  iot: "Connecting the physical and digital worlds through smart sensor networks",
                  devops: "Automating deployments so you can ship faster and sleep better",
                  testing: "Ensuring code quality through comprehensive testing strategies",
                  productivity: "Streamlining workflows and team collaboration"
                };

                return (
                  <Box key={idx} sx={{ mb: { xs: 4, md: 6 } }}>
                    <motion.div
                      variants={skillCardVariants}
                      whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          textAlign: { xs: "center", md: "left" },
                          background: "linear-gradient(45deg, #00e5ff, #20c997)",
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.3rem" }
                        }}
                      >
                        {category}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        sx={{
                          mb: 3,
                          textAlign: { xs: "center", md: "left" },
                          color: "text.secondary",
                          fontStyle: "italic",
                          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                          lineHeight: 1.5
                        }}
                      >
                        {categoryDescriptions[category as keyof typeof categoryDescriptions]}
                      </Typography>
                    </motion.div>
                  
                  <Stack
                    component="ul"
                    direction="row"
                    spacing={2}
                    flexWrap="wrap"
                    justifyContent={{ xs: "center", md: "flex-start" }}
                    sx={{
                      listStyle: "none",
                      p: 0,
                      m: 0,
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "repeat(auto-fill, minmax(70px, 1fr))",
                        sm: "repeat(auto-fill, minmax(80px, 1fr))",
                        md: "repeat(auto-fill, minmax(100px, 1fr))",
                      },
                      gap: { xs: 1.5, md: 2 },
                    }}
                  >
                    {skillList.map((skill, i) => {
                      const Icon = skill.icon;
                      return (
                        <motion.li
                          key={i}
                          variants={skillCardVariants}
                          whileHover={{ 
                            scale: isMobile ? 1.1 : 1.15, 
                            rotateY: isMobile ? 0 : 10,
                            transition: { duration: 0.3 }
                          }}
                          style={{ textAlign: "center", width: "100%" }}
                          aria-label={skill.name}
                          title={skill.name}
                        >
                          <Box
                            sx={{
                              width: { xs: 50, sm: 60, md: 80 },
                              height: { xs: 50, sm: 60, md: 80 },
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${skill.color}33, ${skill.color}11)`,
                              backdropFilter: "blur(10px)",
                              border: `2px solid ${skill.color}40`,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              mx: "auto",
                              mb: 1,
                              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                              cursor: "default",
                              position: "relative",
                              overflow: "hidden",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: `radial-gradient(circle at center, ${skill.color}20, transparent)`,
                                opacity: 0,
                                transition: "opacity 0.3s ease",
                              },
                              "&:hover": {
                                transform: isMobile ? "scale(1.05) translateY(-3px)" : "scale(1.1) translateY(-5px)",
                                boxShadow: `0 8px 25px ${skill.color}40`,
                                borderColor: `${skill.color}80`,
                                "&::before": {
                                  opacity: 1,
                                },
                              },
                            }}
                          >
                            <Icon size={isMobile ? (isSm ? 24 : 28) : 40} color={skill.color} />
                          </Box>
                          <Typography 
                            variant="caption" 
                            display="block" 
                            sx={{ 
                              mt: 0.5, 
                              fontSize: { xs: 10, sm: 11, md: 12 },
                              fontWeight: 500,
                              color: "text.secondary",
                              transition: "color 0.3s ease",
                              "&:hover": {
                                color: skill.color,
                              }
                            }}
                          >
                            {skill.name}
                          </Typography>
                        </motion.li>
                      );
                    })}
                  </Stack>
                </Box>
                );
              })}
            </motion.div>
          </Paper>
        </AnimatedSection>

        {/* Personal Touch Section */}
        <AnimatedSection animation="fadeUp" delay={0.6}>
          <Paper 
            sx={{ 
              p: { xs: 3, md: 4 }, 
              mt: { xs: 4, md: 6 },
              backgroundColor: "rgba(32, 201, 151, 0.05)",
              backdropFilter: "blur(15px)",
              border: "1px solid rgba(32, 201, 151, 0.2)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                textAlign: "center",
                background: "linear-gradient(45deg, #20c997, #00e5ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", md: "1.25rem" }
              }}
            >
              What Drives Me
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
                textAlign: "center",
                color: "text.secondary",
                mb: 2
              }}
            >
              I'm fascinated by the intersection of technology and human impact. When I see a farmer struggling with manual irrigation 
              or a university manually tracking energy data, I don't just see problems—I see opportunities to make someone's life better 
              through elegant code.
            </Typography>
            
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                lineHeight: 1.7,
                textAlign: "center",
                color: "text.secondary",
              }}
            >
              Currently exploring: <strong style={{ color: "#20c997" }}>AI-powered agriculture optimization</strong> and 
              <strong style={{ color: "#00e5ff" }}> edge computing for IoT systems</strong>. 
              Always learning, always building, always asking "how can this be better?"
            </Typography>
          </Paper>
        </AnimatedSection>
      </Box>
    </AnimatedSection>
  );
}
