import { Box, Typography, Button } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ textAlign: "center", py: 10 }}>
      <Typography variant="h3" gutterBottom>
        Hi, I'm Aean Gabrielle Tayawa
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Full Stack Software Engineer | IoT & Renewable Energy Systems
      </Typography>
      <Button variant="contained" color="secondary" href="#projects">
        View My Work
      </Button>
    </Box>
  );
}
