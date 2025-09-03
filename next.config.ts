import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: "standalone",

  // Environment variables configuration
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1",
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
