import { Box, Typography, Paper, Stack, useTheme, useMediaQuery } from "@mui/material";
import { skills } from "../../data/skills";
import { motion } from "framer-motion";
import AnimatedSection from "../common/AnimatedSection";

export default function About() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AnimatedSection>
      <Box id="about" sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, md: 6 } }}>
        <Typography
          variant={isSm ? "h4" : "h3"} // larger variants
          gutterBottom
          sx={{
            mb: { xs: 4, md: 6 },
            textAlign: "center",
            fontWeight: "bold",
            letterSpacing: 1.2,
          }}
        >
          About Me
        </Typography>

        <Typography
          variant="body1"
          paragraph
          sx={{
            maxWidth: { xs: "90%", md: 900 }, // wider on desktop
            mx: "auto",
            mb: { xs: 4, md: 6 },
            fontSize: { xs: "1.15rem", md: "1.25rem" }, // bigger text
            lineHeight: 1.8,
          }}
        >
          I’m Aean Gabrielle Tayawa, a Full Stack Software Engineer specializing in
          building IoT systems, cloud-native platforms, and scalable web
          applications. I have successfully led several government-funded automation
          projects in agriculture and renewable energy, driving innovation and
          efficiency in these sectors.
        </Typography>

        <Paper sx={{ p: { xs: 3, md: 5 }, backgroundColor: "background.paper" }} elevation={3}>
          {Object.entries(skills).map(([category, skillList], idx) => (
            <Box key={idx} sx={{ mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                {category}
              </Typography>
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
                    xs: "repeat(auto-fill, minmax(80px, 1fr))",
                    sm: "repeat(auto-fill, minmax(90px, 1fr))",
                    md: "repeat(auto-fill, minmax(100px, 1fr))",
                  },
                  gap: 2,
                }}
              >
                {skillList.map((skill, i) => {
                  const Icon = skill.icon;
                  return (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      viewport={{ once: true }}
                      style={{ textAlign: "center", width: "100%" }}
                      aria-label={skill.name}
                      title={skill.name}
                    >
                      <Box
                        sx={{
                          width: { xs: 60, sm: 70, md: 80 },
                          height: { xs: 60, sm: 70, md: 80 },
                          borderRadius: "50%",
                          bgcolor: `${skill.color}33`,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mx: "auto",
                          mb: 1,
                          transition: "transform 0.2s ease, box-shadow 0.2s ease",
                          cursor: "default",
                          "&:hover": {
                            transform: "scale(1.1)",
                            boxShadow: `0 4px 10px 0 ${skill.color}`,
                          },
                        }}
                      >
                        <Icon size={isSm ? 28 : 40} color={skill.color} />
                      </Box>
                      <Typography variant="caption" display="block" sx={{ mt: 0.5, fontSize: { xs: 11, md: 12 } }}>
                        {skill.name}
                      </Typography>
                    </motion.li>
                  );
                })}
              </Stack>
            </Box>
          ))}
        </Paper>
      </Box>
    </AnimatedSection>
  );
}
