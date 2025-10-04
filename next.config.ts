import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent dev-time double-mounting and effect re-invocation that can
  // look like "auto-reload" for WebGL/RAF loops
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  // Disable Lightning CSS to avoid native binary requirement on Vercel
  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
