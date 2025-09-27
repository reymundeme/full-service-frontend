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

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Allow Strapi admin to embed your frontend in an iframe
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://precious-dinosaur-99506b8ce1.strapiapp.com",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://precious-dinosaur-99506b8ce1.strapiapp.com",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
