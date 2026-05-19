import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Bonnes pratiques de production.
  poweredByHeader: false,
  reactStrictMode: true,
  // Fixe la racine du projet (plusieurs lockfiles présents sur la machine).
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    // Sources d'images distantes autorisées (photothèque à venir).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
