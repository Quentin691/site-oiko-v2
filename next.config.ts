import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ubiflow.net",
      },
      {
        protocol: "https",
        hostname: "images.ubiflow.net",
      },
    ],
  },
};

export default nextConfig;
