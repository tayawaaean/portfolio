import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Card,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { GitHub, LinkedIn, Email } from "@mui/icons-material";
import { motion } from "framer-motion";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current!,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          setLoading(false);
          formRef.current?.reset();
        },
        (error) => {
          console.error(error);
          setStatus("Failed to send message. Try again.");
          setLoading(false);
        }
      );
  };

  return (
    <Box id="contact" sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 0 } }}>
      <Typography
        variant={isSm ? "h5" : "h4"}
        gutterBottom
        sx={{ textAlign: "center", mb: { xs: 4, md: 6 }, fontWeight: "bold" }}
      >
        Contact Me
      </Typography>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Card
          sx={{
            maxWidth: { xs: "100%", sm: 500 },
            mx: "auto",
            border: "2px solid",
            borderImage: "linear-gradient(45deg, #00e5ff, #ff4081) 1",
            backgroundColor: "background.paper",
            p: { xs: 2, sm: 3 },
          }}
        >
          <CardContent>
            <Stack
              component="form"
              ref={formRef}
              onSubmit={sendEmail}
              spacing={2}
              sx={{ width: "100%" }}
            >
              <TextField label="Name" name="name" fullWidth required />
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
              />
              <TextField
                label="Message"
                name="message"
                multiline
                rows={4}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                disabled={loading}
                sx={{ mt: 1 }}
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
              {status && (
                <Typography
                  variant="body2"
                  color={
                    status.includes("success")
                      ? "success.main"
                      : "error.main"
                  }
                  sx={{ mt: 1, textAlign: "center" }}
                >
                  {status}
                </Typography>
              )}
            </Stack>

            {/* Social Links */}
            <Stack
              direction={isSm ? "row" : "row"}
              spacing={3}
              justifyContent="center"
              sx={{ mt: 4, flexWrap: "wrap" }}
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
              <IconButton
                component="a"
                href="mailto:tayawaaean@gmail.com"
                sx={{
                  color: "white",
                  "&:hover": { color: "#ff4081" },
                  fontSize: { xs: 30, md: 36 },
                }}
              >
                <Email fontSize="inherit" />
              </IconButton>
            </Stack>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
