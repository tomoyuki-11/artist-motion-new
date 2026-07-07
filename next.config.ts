import type { NextConfig } from "next";
import path from "path";

const adminApiUrl = new URL(
  process.env.NEXT_PUBLIC_ADMIN_API_URL || "http://localhost:3002"
);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: adminApiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: adminApiUrl.hostname,
        port: adminApiUrl.port,
      },
    ],
  },
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/services/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
