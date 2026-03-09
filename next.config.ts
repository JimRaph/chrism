import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
  allowedDevOrigins: ["*.ngrok-free.app"],
  experimental: {
    // @ts-ignore - Property exists at runtime but may be missing from types
    
  },
};

export default nextConfig as NextConfig;