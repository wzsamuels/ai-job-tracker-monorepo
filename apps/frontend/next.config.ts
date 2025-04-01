import { i } from "framer-motion/client";
import type { NextConfig } from "next";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
        eslint: {
          ignoreDuringBuilds: true
        }
      },
    ];
  },
};

export default nextConfig;
