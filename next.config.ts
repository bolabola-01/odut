import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  // Cloudflare-only helpers are type-checked by the Sites build. Vercel's
  // native Next.js build does not need those files to render this site.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
