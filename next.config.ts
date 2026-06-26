import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
