import { Box, Typography, Link, Stack, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, textAlign: "center", bgcolor: "primary.main", color: "white" }}>
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 1 }}>
        <IconButton
          component="a"
          href="https://github.com/tayawaaean"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <GitHub />
        </IconButton>
        <IconButton
          component="a"
          href="https://www.linkedin.com/in/aean-gabrielle-tayawa-710b8b201/"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <LinkedIn />
        </IconButton>
        <IconButton component="a" href="mailto:tayawaaean@gmail.com" color="inherit">
          <Email />
        </IconButton>
      </Stack>
      <Typography variant="body2">
        © {new Date().getFullYear()} Aean Gabrielle Tayawa. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Built with <Link href="https://vitejs.dev" target="_blank" color="inherit">Vite</Link>,{" "}
        <Link href="https://react.dev" target="_blank" color="inherit">React</Link>, and{" "}
        <Link href="https://mui.com" target="_blank" color="inherit">Material UI</Link>.
      </Typography>
    </Box>
  );
}
