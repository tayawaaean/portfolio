import { Box, Typography, Stack, IconButton, Link, useTheme, useMediaQuery } from "@mui/material";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Contact() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box id="contact" sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 0 }, textAlign: "center" }}>
      <Typography
        variant={isSm ? "h5" : "h4"}
        gutterBottom
        sx={{ fontWeight: "bold", mb: { xs: 3, md: 4 } }}
      >
        Contact Me
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Email displayed as clickable link */}
        <Typography variant="body1" sx={{ mb: 4, fontSize: { xs: "1rem", md: "1.25rem" } }}>
          Email:{" "}
          <Link href="mailto:tayawaaean@gmail.com" underline="hover" color="secondary">
            tayawaaean@gmail.com
          </Link>
        </Typography>

        {/* Social Links */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          sx={{ flexWrap: "wrap" }}
        >
          <IconButton
            component="a"
            href="https://github.com/tayawaaean"
            target="_blank"
            rel="noopener"
            sx={{
              color: "white",
              "&:hover": { color: "#00e5ff" },
              fontSize: { xs: 30, md: 36 },
            }}
          >
            <GitHub fontSize="inherit" />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/aean-gabrielle-tayawa-710b8b201/"
            target="_blank"
            rel="noopener"
            sx={{
              color: "white",
              "&:hover": { color: "#0A66C2" },
              fontSize: { xs: 30, md: 36 },
            }}
          >
            <LinkedIn fontSize="inherit" />
          </IconButton>
        </Stack>
      </motion.div>
    </Box>
  );
}
