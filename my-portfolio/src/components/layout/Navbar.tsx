import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { motion } from "framer-motion";
import TouchGestures from "../common/TouchGestures";


const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  


  useEffect(() => {
    // Handle scroll to update current section
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };





  const drawer = (
    <TouchGestures
      onSwipeLeft={() => setDrawerOpen(false)}
      onSwipeRight={() => setDrawerOpen(false)}
    >
      <Box
        onClick={toggleDrawer(false)}
        sx={{ 
          width: { xs: "100vw", sm: 280 },
          height: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
        role="presentation"
      >
        {/* Mobile Header */}
        <Box sx={{ 
          p: 3, 
          textAlign: "center", 
          borderBottom: "1px solid rgba(0, 229, 255, 0.2)",
          background: "linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))"
        }}>
          <Avatar
            sx={{
              background: "linear-gradient(45deg, #00e5ff, #20c997)",
              width: 60,
              height: 60,
              fontSize: "1.5rem",
              fontWeight: "bold",
              mx: "auto",
              mb: 2
            }}
          >
            AT
          </Avatar>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: "bold",
              background: "linear-gradient(45deg, #00e5ff, #20c997)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontSize: { xs: "1.1rem", sm: "1.25rem" }
            }}
          >
            Aean Gabrielle Tayawa
          </Typography>
        </Box>

        {/* Navigation Items */}
        <List sx={{ flexGrow: 1, pt: 2 }}>
          {navItems.map(({ label, href }) => {
            const section = href.substring(1);
            const isActive = currentSection === section;
            
            return (
              <ListItem key={label} disablePadding>
                <ListItemButton 
                  component="a" 
                  href={href}
                  sx={{
                    py: 2,
                    px: 3,
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    background: isActive ? "linear-gradient(45deg, rgba(0, 229, 255, 0.2), rgba(32, 201, 151, 0.2))" : "transparent",
                    borderRight: isActive ? "3px solid #00e5ff" : "none",
                    "&:hover": {
                      background: "linear-gradient(45deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
                      borderRight: "3px solid #00e5ff"
                    }
                  }}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>



        {/* Social Links in Mobile Menu */}
        <Box sx={{ p: 3, borderTop: "1px solid rgba(0, 229, 255, 0.2)" }}>
          <Typography variant="subtitle2" sx={{ 
            mb: 2, 
            textAlign: "center", 
            color: "text.secondary",
            fontSize: "0.9rem"
          }}>
            Connect with me
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <IconButton
              component="a"
              href="https://github.com/tayawaaean"
              target="_blank"
              rel="noopener"
              size="large"
              sx={{
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.05)",
                "&:hover": { 
                  color: "#00e5ff",
                  background: "rgba(0, 229, 255, 0.1)",
                  transform: "scale(1.1)"
                }
              }}
            >
              <GitHub />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/in/aean-gabrielle-tayawa-710b8b201/"
              target="_blank"
              rel="noopener"
              size="large"
              sx={{
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.05)",
                "&:hover": { 
                  color: "#0A66C2",
                  background: "rgba(10, 102, 194, 0.1)",
                  transform: "scale(1.1)"
                }
              }}
            >
              <LinkedIn />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </TouchGestures>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{
          background: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 229, 255, 0.2)",
          boxShadow: "0 4px 30px rgba(0, 229, 255, 0.1)",
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          {/* Logo/Name Section */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Avatar
                sx={{
                  background: "linear-gradient(45deg, #00e5ff, #20c997)",
                  mr: 2,
                  width: { xs: 36, md: 40 },
                  height: { xs: 36, md: 40 },
                  fontSize: { xs: "1rem", md: "1.2rem" },
                  fontWeight: "bold"
                }}
              >
                AT
              </Avatar>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: "bold",
                  background: "linear-gradient(45deg, #00e5ff, #20c997)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.25rem" },
                  display: { xs: "none", sm: "block" }
                }}
              >
                Aean Gabrielle Tayawa
              </Typography>
            </motion.div>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {navItems.map(({ label, href }, index) => {
                const section = href.substring(1);
                const isActive = currentSection === section;
                
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  >
                    <Button
                      href={href}
                      sx={{
                        textTransform: "none",
                        color: isActive ? "#00e5ff" : "white",
                        fontWeight: 500,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        background: isActive ? "linear-gradient(45deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))" : "transparent",
                        "&:hover": {
                          background: "linear-gradient(45deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
                          transform: "translateY(-2px)",
                          borderBottom: "2px solid #00e5ff"
                        }
                      }}
                    >
                      {label}
                    </Button>
                  </motion.div>
                );
              })}
              

              
              {/* Social Links in Desktop */}
              <Box sx={{ ml: 2, display: "flex", gap: 1 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <IconButton
                    component="a"
                    href="https://github.com/tayawaaean"
                    target="_blank"
                    rel="noopener"
                    size="small"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": { 
                        color: "#00e5ff",
                        transform: "scale(1.1)"
                      }
                    }}
                  >
                    <GitHub fontSize="small" />
                  </IconButton>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/aean-gabrielle-tayawa-710b8b201/"
                    target="_blank"
                    rel="noopener"
                    size="small"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      "&:hover": { 
                        color: "#0A66C2",
                        transform: "scale(1.1)"
                      }
                    }}
                  >
                    <LinkedIn fontSize="small" />
                  </IconButton>
                </motion.div>
              </Box>
            </Box>
          )}

          {/* Mobile Menu */}
          {isMobile && (
            <>
              <IconButton
                color="inherit"
                edge="end"
                onClick={toggleDrawer(true)}
                aria-label="open navigation menu"
                sx={{
                  background: "rgba(0, 229, 255, 0.1)",
                  minWidth: "44px",
                  minHeight: "44px",
                  "&:hover": {
                    background: "rgba(0, 229, 255, 0.2)",
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    background: "linear-gradient(135deg, rgba(10, 10, 10, 0.95), rgba(0, 229, 255, 0.05))",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(0, 229, 255, 0.1)",
                    width: { xs: "100vw", sm: 280 }
                  }
                }}
                ModalProps={{
                  keepMounted: true, // Better mobile performance
                }}
              >
                {drawer}
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
