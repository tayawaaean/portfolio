import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00e5ff",
      light: "#66ffff",
      dark: "#0099cc",
      contrastText: "#000",
    },
    secondary: {
      main: "#ff4081",
      light: "#ff79a7",
      dark: "#c60055",
      contrastText: "#fff",
    },
    error: {
      main: "#ff5555",
    },
    success: {
      main: "#4caf50",
    },
    background: {
      default: "#0d1117",
      paper: "#161b22",
    },
    text: {
      primary: "#ffffff",
      secondary: "#c9d1d9",
    },
  },

  typography: {
    fontFamily: "'Roboto Mono', monospace",
    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      letterSpacing: 1,
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      letterSpacing: 0.5,
    },
    h4: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
  styleOverrides: {
    root: {
      textTransform: "none",
      fontWeight: 700,
      borderRadius: 12,
    },
    contained: {
      background: "linear-gradient(45deg, #00e5ff 30%, #ff4081 90%)",
      color: "#fff",
      boxShadow: "0 3px 10px 0 rgba(0, 229, 255, 0.6)",
      transition: "all 0.3s ease",
      '&:hover': {
        background: "linear-gradient(45deg, #ff4081 30%, #00e5ff 90%)",
        boxShadow: "0 0 20px 4px rgba(255, 64, 129, 0.8)",
      },
    },
  },
},


    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "#161b22",
          boxShadow: "0 2px 10px rgba(0,0,0,0.6)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1f2937",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 12px 2px rgba(0, 229, 255, 0.5)",
          transition: "box-shadow 0.3s ease-in-out",
          '&:hover': {
            boxShadow: "0 0 24px 6px rgba(255, 64, 129, 0.7)",
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: "#00e5ff",
          transition: "color 0.3s",
          cursor: "pointer",
          '&:hover': {
            color: "#ff4081",
          },
        },
      },
    },
  },
});

export default theme;
