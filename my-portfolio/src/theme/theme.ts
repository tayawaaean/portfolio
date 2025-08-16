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
    // Enhanced color palette with consistent naming
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
    },
    error: {
      main: "#ff5555",
      light: "#ff8a80",
      dark: "#d32f2f",
    },
    background: {
      default: "#0a0a0a",
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#e0e0e0",
    },
  },

  // Systematic typography scale
  typography: {
    fontFamily: "'Roboto Mono', monospace",
    // Display styles for hero sections
    h1: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 700,
      letterSpacing: 1,
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      lineHeight: 1.1,
      background: "linear-gradient(45deg, #00e5ff, #ff4081, #2196f3)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h2: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      letterSpacing: 0.5,
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: 1.2,
      background: "linear-gradient(45deg, #ff4081, #00e5ff)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h3: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      lineHeight: 1.3,
      background: "linear-gradient(45deg, #2196f3, #00e5ff)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h4: {
      fontWeight: 600,
      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
      lineHeight: 1.4,
      color: "#00e5ff",
    },
    h5: {
      fontWeight: 600,
      fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
      lineHeight: 1.4,
      color: "#20c997",
    },
    h6: {
      fontWeight: 600,
      fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
      lineHeight: 1.4,
      color: "#2196f3",
    },
    // Body text with consistent scale
    body1: {
      fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
      lineHeight: 1.7,
      color: "#e0e0e0",
    },
    body2: {
      fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
      lineHeight: 1.6,
      color: "#a0a0a0",
    },
    // Specialized text styles
    subtitle1: {
      fontSize: "clamp(1.125rem, 1.8vw, 1.25rem)",
      lineHeight: 1.5,
      fontWeight: 500,
      color: "#00e5ff",
    },
    subtitle2: {
      fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
      lineHeight: 1.5,
      fontWeight: 500,
      color: "#20c997",
    },
    caption: {
      fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
      lineHeight: 1.4,
      color: "#a0a0a0",
    },
    button: {
      fontSize: "clamp(0.875rem, 1.3vw, 1rem)",
      fontWeight: 600,
      textTransform: "none",
      letterSpacing: 0.5,
    },
  },

  // Enhanced spacing and sizing
  spacing: (factor: number) => `${0.5 * factor}rem`,
  
  shape: {
    borderRadius: 16,
  },

  // Enhanced breakpoints for better mobile experience
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 700,
          borderRadius: 16,
          padding: "12px 32px",
          fontSize: "clamp(0.875rem, 1.3vw, 1.1rem)",
          minHeight: "44px", // Touch target size
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        contained: {
          background: "linear-gradient(45deg, #00e5ff 0%, #ff4081 50%, #2196f3 100%)",
          backgroundSize: "200% 200%",
          color: "#fff",
          boxShadow: "0 8px 32px rgba(0, 229, 255, 0.4)",
          '&:hover': {
            background: "linear-gradient(45deg, #ff4081 0%, #2196f3 50%, #00e5ff 100%)",
            backgroundSize: "200% 200%",
            boxShadow: "0 12px 40px rgba(255, 64, 129, 0.6)",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          border: "2px solid",
          borderImage: "linear-gradient(45deg, #00e5ff, #ff4081) 1",
          color: "#00e5ff",
          transition: "all 0.3s ease",
          '&:hover': {
            background: "linear-gradient(45deg, rgba(0, 229, 255, 0.1), rgba(255, 64, 129, 0.1))",
            borderColor: "#ff4081",
            color: "#ff4081",
            transform: "translateY(-2px)",
          },
        },
        // Size variants with consistent scaling
        sizeSmall: {
          padding: "8px 24px",
          fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
          minHeight: "36px",
        },
        sizeLarge: {
          padding: "16px 40px",
          fontSize: "clamp(1rem, 1.5vw, 1.125rem)",
          minHeight: "52px",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(135deg, rgba(26, 26, 26, 0.95), rgba(0, 229, 255, 0.1))",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0, 229, 255, 0.2)",
          boxShadow: "0 4px 20px rgba(0, 229, 255, 0.3)",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(26, 26, 26, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 229, 255, 0.2)",
          borderRadius: 20,
          boxShadow: "0 8px 32px rgba(0, 229, 255, 0.2)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflow: "hidden",
          '&:hover': {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 20px 60px rgba(255, 64, 129, 0.4)",
            borderColor: "rgba(255, 64, 129, 0.5)",
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #00e5ff, #ff4081, #2196f3)',
            transform: 'scaleX(0)',
            transition: 'transform 0.4s ease',
          },
          '&:hover::before': {
            transform: 'scaleX(1)',
          },
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 229, 255, 0.05))",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 229, 255, 0.1)",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          transition: "all 0.3s ease",
          minHeight: "32px", // Touch target size
          '&:hover': {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          },
        },
        sizeSmall: {
          height: "24px",
          fontSize: "clamp(0.7rem, 1.1vw, 0.75rem)",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: "#00e5ff",
          transition: "all 0.3s ease",
          cursor: "pointer",
          textDecoration: "none",
          '&:hover': {
            color: "#ff4081",
            textShadow: "0 0 8px rgba(255, 64, 129, 0.6)",
          },
        },
      },
    },

    // Enhanced form components
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            transition: "all 0.3s ease",
            '&:hover': {
              transform: "translateY(-2px)",
              boxShadow: "0 4px 20px rgba(0, 229, 255, 0.2)",
            },
          },
        },
      },
    },

    // Enhanced dialog components
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20,
          background: "rgba(26, 26, 26, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 229, 255, 0.2)",
        },
      },
    },
  },
});

export default theme;
