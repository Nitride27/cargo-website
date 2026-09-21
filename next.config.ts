import type { NextConfig } from "next";

// GitHub Pages (Nitride27/cargo-website → nitride27.github.io/cargo-website)
// is a static host: when GITHUB_PAGES=true the build switches to a full
// static export under the repo subpath. Localhost and Vercel are
// unaffected (plain Next.js build, optimized images, no base path).
const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGhPages
    ? {
        output: "export",
        basePath: "/cargo-website",
        assetPrefix: "/cargo-website/",
        images: { unoptimized: true },
      }
    : {
        images: {
          // Placeholder stock photography (content/images.ts) is
          // Unsplash-hosted until CargoFlow supplies licensed assets.
          remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
        },
      }),
};

export default nextConfig;
