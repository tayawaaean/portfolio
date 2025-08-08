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

  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

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
      prev === lightboxImages.length - 1 ? 0 : prev + 1
    );

  return (
    <Box id="projects" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>
      <Typography
        variant={isSm ? "h5" : "h4"}
        gutterBottom
        sx={{ textAlign: "center", mb: { xs: 3, md: 5 }, fontWeight: "bold" }}
      >
        Projects
      </Typography>

      <Timeline position={isSm ? "right" : "alternate"}>
        {projects.map((proj, idx) => (
          <TimelineItem key={idx}>
            <TimelineSeparator>
              <TimelineDot color="secondary" />
              {idx < projects.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Paper
                  sx={{
                    p: { xs: 2, md: 3 },
                    maxWidth: { xs: "90vw", md: 600 },
                  }}
                  elevation={3}
                >
                  <Typography variant={isSm ? "h6" : "h5"} fontWeight="bold">
                    {proj.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {proj.date}
                  </Typography>
                  <Typography
                    variant="body2"
                    paragraph
                    sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                  >
                    {proj.description}
                  </Typography>

                  {/* Live View Link */}
                  {proj.liveLink && (
                    <a
                      href={proj.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      <Chip label="Live View" color="primary" clickable sx={{ mb: 1 }} />
                    </a>
                  )}

                  {/* Thumbnails */}
                  {proj.images && proj.images.length > 0 && (
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns:
                          proj.images.length % 2 === 0
                            ? "repeat(2, 1fr)"
                            : "repeat(auto-fill, minmax(150px, 1fr))",
                        gap: 1,
                        mb: 2,
                        overflowX: isSm ? "auto" : "visible",
                      }}
                    >
                      {proj.images.map((img, i) => (
                        <Box
                          key={i}
                          component="img"
                          src={img}
                          alt={`${proj.title} ${i + 1}`}
                          sx={{
                            width: "100%",
                            height: 150,
                            objectFit: "cover",
                            borderRadius: 1,
                            cursor: "pointer",
                            transition: "transform 0.2s ease",
                            "&:hover": { transform: "scale(1.05)" },
                          }}
                          onClick={() => openLightbox(proj.images, i)}
                        />
                      ))}
                    </Box>
                  )}

                  {/* Tech Chips */}
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {proj.tech.map((t, i) => (
                      <Chip
                        key={i}
                        label={t}
                        size="small"
                        sx={{
                          backgroundColor: techColors[t] || "#888",
                          color: "white",
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onClose={() => setLightboxOpen(false)} fullScreen={isSm}>
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
            sx={{ position: "absolute", top: 16, right: 16, color: "white" }}
          >
            <Close />
          </IconButton>

          <IconButton
            onClick={handlePrev}
            sx={{ position: "absolute", top: "50%", left: 16, color: "white" }}
          >
            <ArrowBack />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{ position: "absolute", top: "50%", right: 16, color: "white" }}
          >
            <ArrowForward />
          </IconButton>

          {lightboxImages.length > 0 && (
            <Box
              component="img"
              src={lightboxImages[lightboxIndex]}
              alt="Project"
              sx={{
                display: "block",
                maxWidth: "100%",
                maxHeight: "100vh",
                margin: "auto",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
