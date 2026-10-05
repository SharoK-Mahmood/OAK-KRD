import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@oak-krd/database", "@oak-krd/shared"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
  // Hide the Next.js “N” floating button in the bottom-left during development
  devIndicators: false,
  // Keep visited pages in the client router cache longer (faster tab/language switches)
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};

export default withNextIntl(nextConfig);
