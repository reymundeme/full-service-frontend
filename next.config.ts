// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "precious-dinosaur-99506b8ce1.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;
