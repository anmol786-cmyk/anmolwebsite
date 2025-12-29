import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Anmol Sweets WordPress domain (more specific - wp-content uploads)
      {
        protocol: "https",
        hostname: "anmolsweets.se",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      // Anmol Sweets - allow all paths (fallback)
      {
        protocol: "https",
        hostname: "anmolsweets.se",
        port: "",
        pathname: "/**",
      },
      // Backend WordPress domain (primary) - specific to uploads
      {
        protocol: "https",
        hostname: "backend.royalbr.se",
        port: "",
        pathname: "/wp-content/uploads/**",
      },
      // Backend WordPress domain - allow all paths (fallback)
      {
        protocol: "https",
        hostname: "backend.royalbr.se",
        port: "",
        pathname: "/**",
      },
      // Frontend domain (for any local images)
      {
        protocol: "https",
        hostname: "royalbr.se",
        port: "",
        pathname: "/**",
      },
      // Wildcard for any other subdomains
      {
        protocol: "https",
        hostname: "*.royalbr.se",
        port: "",
        pathname: "/**",
      },
    ],
    // Image formats - AVIF first (best compression), then WebP, then original
    formats: ['image/avif', 'image/webp'],
    // Allow all sizes for WooCommerce product images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Default quality (75 is good balance between size and quality)
    // For production: high quality, optimized formats
    // For development: unoptimized for faster builds
    unoptimized: process.env.NODE_ENV === 'development',
    // Minimum cache time for optimized images (1 year = 31536000 seconds)
    // Improved from 60 seconds for better performance and reduced bandwidth
    minimumCacheTTL: 31536000,
  },
  // Enable production optimizations
  poweredByHeader: false,
  compress: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "https://backend.royalbr.se/wp-admin",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Main sitemap index (UNDERSCORE!)
      {
        source: '/sitemap_index.xml',
        destination: '/api/sitemap_index.xml',
      },
      // Individual sitemaps (match Rank Math naming)
      {
        source: '/post-sitemap.xml',
        destination: '/api/post-sitemap.xml',
      },
      {
        source: '/page-sitemap.xml',
        destination: '/api/page-sitemap.xml',
      },
      {
        source: '/product-sitemap.xml',
        destination: '/api/product-sitemap.xml',
      },
      {
        source: '/category-sitemap.xml',
        destination: '/api/category-sitemap.xml',
      },
      {
        source: '/product_brand-sitemap.xml',
        destination: '/api/product_brand-sitemap.xml',
      },
      {
        source: '/product_cat-sitemap.xml',
        destination: '/api/product_cat-sitemap.xml',
      },
      {
        source: '/product_tag-sitemap.xml',
        destination: '/api/product_tag-sitemap.xml',
      },
      {
        source: '/pa_mix-options-sitemap.xml',
        destination: '/api/pa_mix-options-sitemap.xml',
      },
    ];
  },
};

export default nextConfig;
