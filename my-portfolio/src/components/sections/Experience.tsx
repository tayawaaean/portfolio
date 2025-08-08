import { Box, Typography, Paper, List, ListItem, ListItemText, useTheme, useMediaQuery } from "@mui/material";
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

export default function Experience() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box id="experience" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 6 } }}>
      <Typography
        variant={isSm ? "h5" : "h4"}
        gutterBottom
        sx={{ textAlign: "center", mb: { xs: 3, md: 5 }, fontWeight: "bold" }}
      >
        Experience
      </Typography>

      <Timeline position={isSm ? "right" : "alternate"}>
        {experiences.map((exp, idx) => (
          <TimelineItem key={idx}>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              {idx < experiences.length - 1 && <TimelineConnector />}
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
                    backgroundColor: "background.paper",
                    maxWidth: { xs: "90vw", md: "600px" },
                  }}
                  elevation={3}
                >
                  <Typography variant={isSm ? "h6" : "h5"} sx={{ fontWeight: "bold" }}>
                    {exp.title}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {exp.company} — {exp.date}
                  </Typography>
                  <List dense>
                    {exp.description.map((item, i) => (
                      <ListItem key={i} sx={{ pl: 0 }}>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}
