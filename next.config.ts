import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ucarecdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kpesdznybcvfkzdjenso.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
