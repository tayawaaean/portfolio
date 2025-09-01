import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { Send, Email, Phone, LocationOn } from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';


interface FormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  budget: string;
  timeline: string;
}

const contactMethods = [
  {
    icon: <Email />,
    label: "Email",
    value: "tayawaaa@gmail.com",
    description: "Send me an email anytime"
  },
  {
    icon: <Phone />,
    label: "Phone",
    value: "+63 995 201 7559",
    description: "Available for urgent inquiries"
  },
  {
    icon: <LocationOn />,
    label: "Location",
    value: "Philippines",
    description: "Open to remote and local projects"
  }
];

const projectCategories = [
  "Web Development",
  "Mobile App Development",
  "IoT Solutions",
  "Data Analytics",
  "Consulting",
  "Portfolio Template",
  "Other"
];

export default function EnhancedContact() {

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    budget: '',
    timeline: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Log form data for debugging (remove in production)
      console.log('Contact form submitted:', formData);

      setSnackbar({
        open: true,
        message: 'Thank you for your message! I\'ll get back to you soon at tayawaaa@gmail.com or call you at +63 995 201 7559.',
        severity: 'success'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
        budget: '',
        timeline: ''
      });
    } catch (error) {
      console.error('Contact form error:', error);
      setSnackbar({
        open: true,
        message: 'Please contact me directly at tayawaaa@gmail.com or +63 995 201 7559.',
        severity: 'success'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box id="contact" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6 } }}>
      <AnimatedSection animation="fadeUp">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #00e5ff, #20c997)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Let's Work Together
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "text.secondary",
            maxWidth: 600,
            mx: "auto"
          }}
        >
          Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life. I'll get back to you at tayawaaa@gmail.com or +63 995 201 7559.
        </Typography>


      </AnimatedSection>

      <Box sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: 4,
        maxWidth: 1200,
        mx: "auto"
      }}>
        {/* Contact Information */}
        <AnimatedSection animation="slideLeft" delay={0.2}>
          <Box>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Get In Touch
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(0, 229, 255, 0.1)",
                      "&:hover": {
                        borderColor: "rgba(0, 229, 255, 0.3)",
                        transform: "translateY(-2px)",
                        transition: "all 0.3s ease"
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{
                          color: "#00e5ff",
                          display: "flex",
                          alignItems: "center"
                        }}>
                          {method.icon}
                        </Box>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {method.label}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {method.value}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {method.description}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>

            {/* Quick Stats */}
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                Why Work With Me?
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip label="10+ Years Experience" color="primary" variant="outlined" />
                <Chip label="100% Project Success" color="secondary" variant="outlined" />
                <Chip label="24/7 Support" color="success" variant="outlined" />
                <Chip label="Agile Development" color="warning" variant="outlined" />
              </Box>
            </Box>
          </Box>
        </AnimatedSection>

        {/* Contact Form */}
        <AnimatedSection animation="slideRight" delay={0.3}>
          <Card
            sx={{
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
              border: "1px solid rgba(0, 229, 255, 0.2)",
              borderRadius: 4
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3 }}>
                  <TextField
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                    required
                    fullWidth
                  />
                </Box>

                <TextField
                  label="Subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  error={!!errors.subject}
                  helperText={errors.subject}
                  required
                  fullWidth
                  sx={{ mb: 3 }}
                />

                <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.category}>
                  <InputLabel>Project Category</InputLabel>
                  <Select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    label="Project Category"
                  >
                    {projectCategories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.category && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                      {errors.category}
                    </Typography>
                  )}
                </FormControl>

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mb: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel>Budget Range</InputLabel>
                    <Select
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      label="Budget Range"
                    >
                      <MenuItem value="under-5k">Under $5,000</MenuItem>
                      <MenuItem value="5k-15k">$5,000 - $15,000</MenuItem>
                      <MenuItem value="15k-50k">$15,000 - $50,000</MenuItem>
                      <MenuItem value="over-50k">Over $50,000</MenuItem>
                      <MenuItem value="discuss">Let's Discuss</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Timeline</InputLabel>
                    <Select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange('timeline', e.target.value)}
                      label="Timeline"
                    >
                      <MenuItem value="asap">ASAP</MenuItem>
                      <MenuItem value="1-month">1 Month</MenuItem>
                      <MenuItem value="2-3-months">2-3 Months</MenuItem>
                      <MenuItem value="3-6-months">3-6 Months</MenuItem>
                      <MenuItem value="flexible">Flexible</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <TextField
                  label="Message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  error={!!errors.message}
                  helperText={errors.message}
                  required
                  fullWidth
                  sx={{ mb: 3 }}
                  placeholder="Tell me about your project, goals, and any specific requirements..."
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    background: "linear-gradient(45deg, #00e5ff, #20c997)",
                    fontWeight: "bold",
                    textTransform: "none",
                    py: 1.5,
                    fontSize: "1rem",
                    "&:hover": {
                      background: "linear-gradient(45deg, #20c997, #00e5ff)"
                    },
                    "&:disabled": {
                      opacity: 0.6
                    }
                  }}
                  startIcon={<Send />}
                >
                  {isSubmitting ? "Submitting..." : "Submit Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
