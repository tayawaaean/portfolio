/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF-first lets browsers pick the smallest format, then WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Cache optimized variants at the edge for a year.
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
