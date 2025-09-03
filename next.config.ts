import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Environment variables configuration
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://51.21.202.114/api/v1",
  },

  // Configure for production deployment
  trailingSlash: false,

  // Optional: Enable experimental features
  experimental: {
    // Enable if you want to use app directory features
    // appDir: true,
  },
};

export default nextConfig;
