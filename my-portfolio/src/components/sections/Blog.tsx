import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import { Close, ArrowForward, CalendarToday } from '@mui/icons-material';
import { motion } from 'framer-motion';
import AnimatedSection from '../common/AnimatedSection';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building Scalable IoT Solutions with React and MQTT",
    excerpt: "Learn how to create real-time IoT dashboards that can handle thousands of connected devices while maintaining optimal performance.",
    content: `# Building Scalable IoT Solutions with React and MQTT

## Introduction

The Internet of Things (IoT) has revolutionized how we collect and analyze data from physical devices. However, building scalable IoT solutions requires careful consideration of real-time data handling, performance optimization, and user experience.

## Key Challenges

### 1. Real-time Data Management
IoT applications generate massive amounts of data that need to be processed and displayed in real-time. Traditional polling methods are inefficient and can overwhelm both the server and client.

### 2. Performance Optimization
With potentially thousands of connected devices, your application must handle high-frequency updates without compromising user experience.

### 3. Scalability
Your solution should be able to grow with your IoT ecosystem, supporting more devices and more complex data relationships.

## Solution: MQTT + React

### MQTT Protocol
MQTT (Message Queuing Telemetry Transport) is a lightweight messaging protocol perfect for IoT applications. It uses a publish/subscribe model that efficiently handles real-time data transmission.

### React Integration
By combining MQTT with React's component-based architecture and state management, we can create responsive dashboards that update in real-time.

## Implementation

\`\`\`javascript
// MQTT Connection Setup
import mqtt from 'mqtt';

const client = mqtt.connect('ws://your-mqtt-broker:8080');

client.on('connect', () => {
  client.subscribe('iot/devices/#');
});

client.on('message', (topic, message) => {
  const data = JSON.parse(message.toString());
  // Update React state
  updateDeviceData(data);
});
\`\`\`

## Best Practices

1. **Connection Management**: Implement reconnection logic and error handling
2. **Data Filtering**: Only subscribe to relevant topics
3. **State Optimization**: Use React.memo and useMemo for performance
4. **Offline Support**: Implement local caching for offline scenarios

## Conclusion

Building scalable IoT solutions requires a combination of efficient protocols, optimized React patterns, and careful architecture planning. The result is a robust system that can handle real-world IoT challenges.`,
    image: "/blog/iot-scalability.jpg",
    category: "Technical",
    tags: ["IoT", "React", "MQTT", "Performance", "Scalability"],
    date: "2024-01-15",
    readTime: "8 min read",
    featured: true
  },
  {
    id: 2,
    title: "The Future of Renewable Energy Monitoring",
    excerpt: "Exploring emerging technologies and trends that will shape the future of renewable energy monitoring systems.",
    content: `# The Future of Renewable Energy Monitoring

## Current State

Renewable energy monitoring has evolved from basic data collection to sophisticated analytics platforms. However, the industry is on the cusp of major transformation.

## Emerging Technologies

### 1. AI-Powered Analytics
Machine learning algorithms can predict equipment failures, optimize energy production, and identify inefficiencies before they become problems.

### 2. Edge Computing
Processing data at the source reduces latency and bandwidth requirements while enabling real-time decision making.

### 3. 5G and Beyond
Ultra-low latency networks will enable more responsive monitoring and control systems.

## Industry Impact

These technologies will enable:
- Predictive maintenance reducing downtime by 50%
- Optimized energy production increasing efficiency by 20%
- Real-time decision making for grid management
- Enhanced safety and compliance monitoring

## Implementation Strategies

Organizations should focus on:
1. Data infrastructure modernization
2. AI/ML integration planning
3. Edge computing adoption
4. 5G network preparation

## Conclusion

The future of renewable energy monitoring is bright, with technology enabling unprecedented levels of efficiency and reliability.`,
    image: "/blog/renewable-future.jpg",
    category: "Industry",
    tags: ["Renewable Energy", "AI", "Edge Computing", "5G"],
    date: "2024-01-10",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "Creating Effective Portfolio Templates for Service Professionals",
    excerpt: "A comprehensive guide to designing portfolio websites that convert visitors into clients for service-based businesses.",
    content: `# Creating Effective Portfolio Templates for Service Professionals

## Understanding Your Audience

Service professionals need portfolios that showcase expertise while building trust and credibility. Your portfolio should answer three key questions:

1. Can you do the work?
2. Have you done similar work before?
3. Can I trust you to deliver?

## Essential Elements

### 1. Clear Value Proposition
Your portfolio should immediately communicate what you do and who you serve.

### 2. Social Proof
Testimonials, case studies, and success metrics build credibility.

### 3. Professional Design
Clean, modern design reflects your attention to detail and professionalism.

### 4. Contact Information
Make it easy for potential clients to get in touch.

## Technical Considerations

### Responsive Design
Your portfolio must work perfectly on all devices.

### Fast Loading
Optimize images and code for quick loading times.

### SEO Optimization
Ensure search engines can find your portfolio.

## Conversion Optimization

Focus on:
- Clear call-to-action buttons
- Professional contact forms
- Social proof placement
- Mobile optimization
- Fast loading speeds

## Conclusion

An effective portfolio template combines technical excellence with marketing savvy to convert visitors into clients.`,
    image: "/blog/portfolio-design.jpg",
    category: "Design",
    tags: ["Portfolio", "Design", "Conversion", "SEO"],
    date: "2024-01-05",
    readTime: "5 min read"
  }
];

const categories = ["All", "Technical", "Industry", "Design"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);

  return (
    <Box id="blog" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, md: 6 } }}>
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
          Insights & Articles
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
          Sharing knowledge and insights from my journey in technology and business
        </Typography>
      </AnimatedSection>

      {/* Featured Post */}
      {featuredPost && (
        <AnimatedSection animation="slideUp" delay={0.2}>
          <Card
            sx={{
              mb: 6,
              background: "linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(32, 201, 151, 0.1))",
              border: "2px solid rgba(0, 229, 255, 0.3)",
              borderRadius: 4,
              overflow: "hidden"
            }}
          >
                      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
            <Box sx={{ flex: { md: 1 } }}>
              <CardMedia
                component="img"
                height="300"
                image={featuredPost.image}
                alt={featuredPost.title}
                sx={{ objectFit: "cover" }}
              />
            </Box>
            <Box sx={{ flex: { md: 1 } }}>
              <CardContent sx={{ p: 4 }}>
                <Chip
                  label="Featured Article"
                  color="primary"
                  sx={{ mb: 2 }}
                />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  {featuredPost.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
                  {featuredPost.excerpt}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                  <Chip
                    label={featuredPost.category}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    label={`${featuredPost.readTime}`}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  />
                </Box>
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => setSelectedPost(featuredPost)}
                  sx={{
                    background: "linear-gradient(45deg, #00e5ff, #20c997)",
                    "&:hover": {
                      background: "linear-gradient(45deg, #20c997, #00e5ff)"
                    }
                  }}
                >
                  Read Article
                </Button>
              </CardContent>
            </Box>
          </Box>
          </Card>
        </AnimatedSection>
      )}

      {/* Category Filter */}
      <AnimatedSection animation="fadeUp" delay={0.3}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 4, flexWrap: "wrap", gap: 1 }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              clickable
              color={selectedCategory === category ? "primary" : "default"}
              variant={selectedCategory === category ? "filled" : "outlined"}
              onClick={() => setSelectedCategory(category)}
              sx={{
                "&:hover": {
                  backgroundColor: selectedCategory === category
                    ? undefined
                    : "rgba(0, 229, 255, 0.1)"
                }
              }}
            />
          ))}
        </Box>
      </AnimatedSection>

      {/* Blog Posts Grid */}
      <AnimatedSection animation="fadeUp" delay={0.4}>
        <Box sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" },
          gap: 4
        }}>
          {filteredPosts.map((post, index) => (
            <Box key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0, 229, 255, 0.2)"
                    }
                  }}
                  onClick={() => setSelectedPost(post)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={post.image}
                    alt={post.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Chip
                        label={post.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={`${post.readTime}`}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
                    </Box>

                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", flex: 1 }}>
                      {post.title}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 2, color: "text.secondary", flex: 1 }}>
                      {post.excerpt}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                      <Typography variant="caption" color="text.secondary">
                        {new Date(post.date).toLocaleDateString()}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                      {post.tags.slice(0, 3).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: "0.7rem" }}
                        />
                      ))}
                    </Box>

                    <Button
                      variant="text"
                      endIcon={<ArrowForward />}
                      sx={{
                        alignSelf: "flex-start",
                        mt: "auto",
                        color: "#00e5ff",
                        "&:hover": {
                          backgroundColor: "rgba(0, 229, 255, 0.1)"
                        }
                      }}
                    >
                      Read More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          ))}
        </Box>
      </AnimatedSection>

      {/* Article Modal */}
      <Dialog
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        {selectedPost && (
          <>
            <DialogTitle sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 1
            }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
                  {selectedPost.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Chip
                    label={selectedPost.category}
                    size="small"
                    color="primary"
                  />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(selectedPost.date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedPost.readTime}
                  </Typography>
                </Box>
              </Box>
              <IconButton onClick={() => setSelectedPost(null)}>
                <Close />
              </IconButton>
            </DialogTitle>

            <DialogContent sx={{ pt: 0 }}>
              <Box sx={{ mb: 3 }}>
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {selectedPost.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>

              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {selectedPost.content.split('\n').map((paragraph, index) => (
                  <span key={index}>
                    {paragraph}
                    <br /><br />
                  </span>
                ))}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
