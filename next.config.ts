import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Fix for webpack module loading in Next.js 15
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };
    
    // Optimize webpack configuration
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };
    
    return config;
  },
  experimental: {
    // Enable experimental features for better stability
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  // Improve performance
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
