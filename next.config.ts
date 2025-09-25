import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  turbopack: {
    // Explicitly set the project root to silence Turbopack root inference warnings
    root: __dirname,
  },
} as unknown as NextConfig;

export default nextConfig;
