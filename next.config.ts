import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "upload.wikimedia.org" },
      { hostname: "cdn11.bigcommerce.com" },
      { hostname: "sigma.octopart.com" },
      { hostname: "stm32-base.org" },
      { hostname: "www.tinyosshop.com" },
      { hostname: "docs.sunfounder.com" },
      { hostname: "roboticsdna.in" },
      { hostname: "cdn-learn.adafruit.com" },
      { hostname: "cdn.sparkfun.com" },
      { hostname: "ewall.com.pk" },
    ],
  },
};

export default nextConfig;
