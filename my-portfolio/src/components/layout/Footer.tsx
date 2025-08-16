import { Box, Typography, Link, Container, Stack, IconButton } from "@mui/material";
import { GitHub, LinkedIn, ArrowUpward } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{ 
        background: "linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(0, 229, 255, 0.05))",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(0, 229, 255, 0.1)",
        py: 6,
        color: "white"
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr" },
            gap: 4,
            mb: 4
          }}>
            {/* About Section */}
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 2, 
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #00e5ff, #20c997)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Aean Gabrielle Tayawa
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, color: "text.secondary", lineHeight: 1.6 }}>
                Full Stack Developer specializing in IoT systems and government-scale platforms. 
                Building solutions that make a real difference.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  component="a"
                  href="https://github.com/tayawaaean"
                  target="_blank"
                  rel="noopener"
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "#00e5ff", transform: "translateY(-2px)" }
                  }}
                >
                  <GitHub />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/in/aean-gabrielle-tayawa-710b8b201/"
                  target="_blank"
                  rel="noopener"
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    "&:hover": { color: "#0A66C2", transform: "translateY(-2px)" }
                  }}
                >
                  <LinkedIn />
                </IconButton>
              </Box>
            </Box>

            {/* Quick Links */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {[
                  { label: "About", href: "#about" },
                  { label: "Experience", href: "#experience" },
                  { label: "Projects", href: "#projects" },
                  { label: "Contact", href: "#contact" }
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#00e5ff",
                        transform: "translateX(5px)"
                      }
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* Tech Stack */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Built With
              </Typography>
              <Stack spacing={1}>
                {[
                  { label: "React", href: "https://react.dev" },
                  { label: "TypeScript", href: "https://typescriptlang.org" },
                  { label: "Material-UI", href: "https://mui.com" },
                  { label: "Framer Motion", href: "https://framer.com/motion" }
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener"
                    sx={{
                      color: "text.secondary",
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        color: "#20c997",
                        transform: "translateX(5px)"
                      }
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </Stack>
            </Box>
          </Box>

          {/* Bottom Section */}
          <Box sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            pt: 4,
            borderTop: "1px solid rgba(255,255,255,0.1)"
          }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              © {new Date().getFullYear()} Aean Gabrielle Tayawa. All rights reserved.
            </Typography>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={scrollToTop}
                sx={{
                  background: "linear-gradient(45deg, rgba(0, 229, 255, 0.2), rgba(32, 201, 151, 0.2))",
                  color: "#00e5ff",
                  "&:hover": {
                    background: "linear-gradient(45deg, rgba(0, 229, 255, 0.3), rgba(32, 201, 151, 0.3))",
                    transform: "translateY(-2px)"
                  }
                }}
              >
                <ArrowUpward />
              </IconButton>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
