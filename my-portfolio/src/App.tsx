import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme/theme";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import EnhancedContact from "./components/sections/EnhancedContact";
import PerformanceMonitor from "./components/common/PerformanceMonitor";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PerformanceMonitor />
      <Navbar />
      <Hero />
      <Container maxWidth="lg">
        <About />
        <Experience />
        <Projects />
        <EnhancedContact />
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
