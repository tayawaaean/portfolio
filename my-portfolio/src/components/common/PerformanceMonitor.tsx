import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { TrendingUp, Person, Visibility, Schedule } from '@mui/icons-material';

interface PerformanceMetrics {
  loadTime: number;
  totalProjects: number;
  totalImages: number;
  bundleSize: number;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate performance tracking (replace with real analytics)
    const loadTime = performance.now();
    const totalProjects = 9; // Update this dynamically
    const totalImages = 48; // Update this dynamically
    const bundleSize = 2048; // In KB, update with actual bundle size

    setMetrics({
      loadTime: Math.round(loadTime),
      totalProjects,
      totalImages,
      bundleSize
    });
  }, []);

  if (!metrics || !isVisible) return null;

  const getLoadTimeColor = (time: number) => {
    if (time < 1000) return 'success';
    if (time < 2000) return 'warning';
    return 'error';
  };

  const getBundleSizeColor = (size: number) => {
    if (size < 1000) return 'success';
    if (size < 2000) return 'warning';
    return 'error';
  };

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        p: 2,
        minWidth: 280,
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 229, 255, 0.2)',
        zIndex: 1000,
        cursor: 'pointer'
      }}
      onClick={() => setIsVisible(false)}
    >
      <Typography variant="h6" sx={{ mb: 2, color: '#00e5ff' }}>
        Performance Monitor
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Schedule sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
        <Typography variant="body2" sx={{ flex: 1 }}>
          Load Time
        </Typography>
        <Chip
          label={`${metrics.loadTime}ms`}
          color={getLoadTimeColor(metrics.loadTime)}
          size="small"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Visibility sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
        <Typography variant="body2" sx={{ flex: 1 }}>
          Bundle Size
        </Typography>
        <Chip
          label={`${(metrics.bundleSize / 1024).toFixed(1)}MB`}
          color={getBundleSizeColor(metrics.bundleSize)}
          size="small"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <TrendingUp sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
        <Typography variant="body2" sx={{ flex: 1 }}>
          Projects
        </Typography>
        <Chip
          label={metrics.totalProjects}
          color="primary"
          size="small"
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Person sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
        <Typography variant="body2" sx={{ flex: 1 }}>
          Images
        </Typography>
        <Chip
          label={metrics.totalImages}
          color="secondary"
          size="small"
        />
      </Box>
    </Paper>
  );
}
