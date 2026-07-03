// Absolute site URL, resolved in this order:
//   1. NEXT_PUBLIC_SITE_URL  (set this to your custom domain in production)
//   2. Vercel's production URL (auto-set when deployed on Vercel)
//   3. localhost (dev)
const fromEnv =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "");

export const SITE_URL = (fromEnv || "http://localhost:3000").replace(/\/$/, "");

export const SITE_NAME = "Neha Thakkar";
