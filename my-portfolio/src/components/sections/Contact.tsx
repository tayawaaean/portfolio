import { Box, Typography, Stack, IconButton, useTheme, useMediaQuery, Paper, Button, Card, CardContent } from "@mui/material";
import { GitHub, LinkedIn, Email, LocationOn, ContentCopy } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tayawaaean@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
          <Box id="contact" sx={{ 
        py: { xs: 6, md: 8 }, 
        px: { xs: 2, md: 6 },
        background: "linear-gradient(135deg, rgba(32, 201, 151, 0.04), rgba(0, 229, 255, 0.02))"
      }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Typography
          variant={isSm ? "h5" : "h4"}
          gutterBottom
          sx={{ 
            fontWeight: "bold", 
            mb: { xs: 3, md: 5 },
            textAlign: "center",
            background: "linear-gradient(45deg, #00e5ff, #20c997)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Let's Connect
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: "center", 
            mb: 4, 
            color: "text.secondary",
            maxWidth: 600,
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.25rem" },
            lineHeight: 1.5
          }}
        >
          Ready to build something amazing together? I'm always excited to discuss new opportunities and innovative projects.
        </Typography>
      </motion.div>

      {/* Contact Cards */}
      <Box sx={{ 
        display: "grid", 
        gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
        gap: { xs: 2, md: 3 },
        maxWidth: 800,
        mx: "auto",
        mb: 6
      }}>
        {/* Professional Contact Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card sx={{
            background: "linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
            border: "1px solid rgba(0, 229, 255, 0.2)",
            height: "100%"
          }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3 }, textAlign: "center", height: "100%" }}>
              <Email sx={{ 
                fontSize: { xs: 32, md: 40 }, 
                color: "#00e5ff", 
                mb: 2 
              }} />
              <Typography variant={isSm ? "h6" : "h6"} sx={{ 
                mb: 2, 
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", md: "1.25rem" }
              }}>
                Email Me
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                mb: 3,
                fontSize: { xs: "0.85rem", md: "0.875rem" }
              }}>
                For professional inquiries and opportunities
              </Typography>
              <Button
                variant="outlined"
                onClick={handleCopyEmail}
                startIcon={<ContentCopy />}
                sx={{
                  borderColor: "#00e5ff",
                  color: "#00e5ff",
                  fontSize: { xs: "0.8rem", md: "0.875rem" },
                  minHeight: { xs: "44px", md: "auto" },
                  "&:hover": {
                    borderColor: "#20c997",
                    color: "#20c997",
                    background: "rgba(32, 201, 151, 0.1)"
                  }
                }}
              >
                {copied ? "Copied!" : "Copy Email"}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Location Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Card sx={{
            background: "linear-gradient(135deg, rgba(32, 201, 151, 0.1), rgba(33, 150, 243, 0.1))",
            border: "1px solid rgba(32, 201, 151, 0.2)",
            height: "100%"
          }}>
            <CardContent sx={{ p: { xs: 2.5, md: 3 }, textAlign: "center", height: "100%" }}>
              <LocationOn sx={{ 
                fontSize: { xs: 32, md: 40 }, 
                color: "#20c997", 
                mb: 2 
              }} />
              <Typography variant={isSm ? "h6" : "h6"} sx={{ 
                mb: 2, 
                fontWeight: "bold",
                fontSize: { xs: "1.1rem", md: "1.25rem" }
              }}>
                Based in Philippines
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                mb: 3,
                fontSize: { xs: "0.85rem", md: "0.875rem" }
              }}>
                Available for remote work and collaboration
              </Typography>
              <Typography variant="body2" sx={{ 
                color: "#20c997", 
                fontWeight: 500,
                fontSize: { xs: "0.85rem", md: "0.875rem" }
              }}>
                Open to opportunities worldwide
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>

      {/* Social Links Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <Paper sx={{
          p: { xs: 3, md: 4 },
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(26, 26, 26, 0.8), rgba(0, 229, 255, 0.05))",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 229, 255, 0.1)",
          maxWidth: 600,
          mx: "auto"
        }}>
          <Typography variant="h6" sx={{ 
            mb: 3, 
            fontWeight: "bold",
            fontSize: { xs: "1.1rem", md: "1.25rem" }
          }}>
            Find Me Online
          </Typography>
          
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            sx={{ mb: 3 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                component="a"
                href="https://github.com/tayawaaean"
                target="_blank"
                rel="noopener"
                sx={{
                  background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(0, 229, 255, 0.1))",
                  color: "white",
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  "&:hover": { 
                    color: "#00e5ff",
                    background: "linear-gradient(45deg, rgba(0, 229, 255, 0.2), rgba(32, 201, 151, 0.1))",
                    transform: "translateY(-2px)"
                  },
                }}
              >
                <GitHub fontSize={isMobile ? "medium" : "large"} />
              </IconButton>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                component="a"
                href="https://www.linkedin.com/in/aean-gabrielle-tayawa-710b8b201/"
                target="_blank"
                rel="noopener"
                sx={{
                  background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(10, 102, 194, 0.1))",
                  color: "white",
                  width: { xs: 50, md: 60 },
                  height: { xs: 50, md: 60 },
                  "&:hover": { 
                    color: "#0A66C2",
                    background: "linear-gradient(45deg, rgba(10, 102, 194, 0.2), rgba(33, 150, 243, 0.1))",
                    transform: "translateY(-2px)"
                  },
                }}
              >
                <LinkedIn fontSize={isMobile ? "medium" : "large"} />
              </IconButton>
            </motion.div>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ 
            mb: 3,
            fontSize: { xs: "0.85rem", md: "0.875rem" }
          }}>
            Check out my latest projects and professional updates
          </Typography>

          {/* Call to Action */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              size={isMobile ? "medium" : "large"}
              sx={{
                background: "linear-gradient(45deg, #00e5ff, #20c997)",
                fontWeight: "bold",
                textTransform: "none",
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.5 },
                fontSize: { xs: "0.9rem", md: "1rem" },
                minHeight: { xs: "44px", md: "auto" },
                borderRadius: 3,
                "&:hover": {
                  background: "linear-gradient(45deg, #20c997, #2196f3)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 25px rgba(0, 229, 255, 0.4)"
                }
              }}
              onClick={handleCopyEmail}
            >
              Start a Conversation
            </Button>
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
}
