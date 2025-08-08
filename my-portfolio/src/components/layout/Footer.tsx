import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ py: 4, textAlign: "center", bgcolor: "primary.main", color: "white" }}
    >
      {/* Removed social icons */}

      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Aean Gabrielle Tayawa. All rights reserved.
      </Typography>

      <Typography variant="body2">
        Built with{" "}
        <Link href="https://vitejs.dev" target="_blank" color="inherit" rel="noopener">
          Vite
        </Link>
        ,{" "}
        <Link href="https://react.dev" target="_blank" color="inherit" rel="noopener">
          React
        </Link>
        , and{" "}
        <Link href="https://mui.com" target="_blank" color="inherit" rel="noopener">
          Material UI
        </Link>
        .
      </Typography>
    </Box>
  );
}
