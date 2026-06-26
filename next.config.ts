import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zjt0ykmg8htzcihb.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
