import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent dev-time double-mounting and effect re-invocation that can
  // look like "auto-reload" for WebGL/RAF loops
  reactStrictMode: false,
  };

export default nextConfig;
