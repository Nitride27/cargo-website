import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder stock photography (content/images.ts) is Unsplash-hosted
    // until CargoFlow supplies licensed assets — one-file swap later.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
