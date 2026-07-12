import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  experimental: {
    // Inline the (small, Tailwind-atomic) CSS into the <head> as a <style> tag
    // instead of a render-blocking <link>. Removes the CSS network round-trip,
    // improving FCP/LCP for first-time visitors and crawlers.
    inlineCss: true,
  },
};

export default nextConfig;
